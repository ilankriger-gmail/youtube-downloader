const express = require('express');
const { spawn, exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

// Use /tmp for cloud environments, local downloads folder otherwise
const DOWNLOADS_DIR = process.env.RAILWAY_ENVIRONMENT
    ? path.join(os.tmpdir(), 'ytdl-downloads')
    : path.join(__dirname, 'downloads');

// Password from environment variable
const PASSWORD = process.env.PASSWORD || 'admin123';

// Download sessions storage
const downloadSessions = {};

// Quality format mappings
const QUALITY_FORMATS = {
    'best': 'bestvideo+bestaudio/best',
    '1080': 'bestvideo[height<=1080]+bestaudio/best[height<=1080]',
    '720': 'bestvideo[height<=720]+bestaudio/best[height<=720]',
    '480': 'bestvideo[height<=480]+bestaudio/best[height<=480]',
    '360': 'bestvideo[height<=360]+bestaudio/best[height<=360]',
    'audio': 'bestaudio'
};

// Ensure downloads directory exists
if (!fs.existsSync(DOWNLOADS_DIR)) {
    fs.mkdirSync(DOWNLOADS_DIR, { recursive: true });
}

app.use(express.json());

// Authentication middleware
const authMiddleware = (req, res, next) => {
    // Skip auth for login endpoint and static files
    if (req.path === '/api/login' || req.path === '/' || req.path.startsWith('/style') || req.path.startsWith('/script')) {
        return next();
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== `Bearer ${PASSWORD}`) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
};

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Apply auth middleware to API routes
app.use('/api', authMiddleware);

// Login endpoint
app.post('/api/login', (req, res) => {
    const { password } = req.body;
    if (password === PASSWORD) {
        res.json({ success: true, token: PASSWORD });
    } else {
        res.status(401).json({ error: 'Senha incorreta' });
    }
});

// Validate YouTube URL
function isValidYouTubeUrl(url) {
    const patterns = [
        /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]+/,
        /^(https?:\/\/)?(www\.)?youtube\.com\/shorts\/[\w-]+/,
        /^(https?:\/\/)?youtu\.be\/[\w-]+/,
        /^(https?:\/\/)?(www\.)?youtube\.com\/embed\/[\w-]+/
    ];
    return patterns.some(pattern => pattern.test(url));
}

// Get video info using yt-dlp
async function getVideoInfo(url) {
    return new Promise((resolve, reject) => {
        const ytdlp = spawn('yt-dlp', [
            '--dump-json',
            '--no-download',
            '--no-warnings',
            url
        ]);

        let stdout = '';
        let stderr = '';

        ytdlp.stdout.on('data', (data) => {
            stdout += data.toString();
        });

        ytdlp.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        ytdlp.on('close', (code) => {
            if (code === 0) {
                try {
                    const info = JSON.parse(stdout);
                    resolve({
                        valid: true,
                        url: url,
                        title: info.title || 'Unknown Title',
                        duration: info.duration || 0,
                        thumbnail: info.thumbnail || '',
                        channel: info.channel || info.uploader || 'Unknown Channel'
                    });
                } catch (e) {
                    reject(new Error('Failed to parse video info'));
                }
            } else {
                reject(new Error(stderr || 'Failed to get video info'));
            }
        });

        ytdlp.on('error', (err) => {
            reject(err);
        });
    });
}

// Sanitize filename
function sanitizeFilename(filename) {
    return filename.replace(/[/\\?%*:|"<>]/g, '-').substring(0, 200);
}

// Endpoint to validate URLs and get video info
app.post('/api/validate', async (req, res) => {
    const { urls } = req.body;

    if (!urls || !Array.isArray(urls)) {
        return res.status(400).json({ error: 'Invalid request. Expected array of URLs.' });
    }

    const results = [];

    for (const url of urls) {
        const trimmedUrl = url.trim();

        if (!trimmedUrl) {
            continue;
        }

        if (!isValidYouTubeUrl(trimmedUrl)) {
            results.push({
                url: trimmedUrl,
                valid: false,
                error: 'Invalid YouTube URL format'
            });
            continue;
        }

        try {
            const info = await getVideoInfo(trimmedUrl);
            results.push(info);
        } catch (error) {
            results.push({
                url: trimmedUrl,
                valid: false,
                error: error.message || 'Failed to get video info'
            });
        }
    }

    res.json({ videos: results });
});

// Direct download endpoint - downloads video and streams to browser
app.get('/api/download-file', async (req, res) => {
    const { url, quality, prefix, title } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    const format = QUALITY_FORMATS[quality] || QUALITY_FORMATS['best'];
    const isAudioOnly = quality === 'audio';

    // Create filename
    const safeTitle = sanitizeFilename(title || 'video');
    const ext = isAudioOnly ? 'mp3' : 'mp4';
    const filename = prefix ? `${prefix} - ${safeTitle}.${ext}` : `${safeTitle}.${ext}`;

    // Temporary file path
    const tempFile = path.join(DOWNLOADS_DIR, `temp_${Date.now()}_${Math.random().toString(36).substr(2)}.${ext}`);

    // Build yt-dlp arguments
    const args = [
        '-f', format,
        '--no-warnings'
    ];

    if (isAudioOnly) {
        args.push('--extract-audio');
        args.push('--audio-format', 'mp3');
        args.push('--audio-quality', '0');
    } else {
        args.push('--merge-output-format', 'mp4');
    }

    args.push('-o', tempFile);
    args.push(url);

    console.log(`Starting download: ${filename}`);

    const ytdlp = spawn('yt-dlp', args);

    let errorOutput = '';

    ytdlp.stderr.on('data', (data) => {
        errorOutput += data.toString();
    });

    ytdlp.on('close', (code) => {
        if (code !== 0) {
            console.error('Download failed:', errorOutput);
            return res.status(500).json({ error: 'Download failed' });
        }

        // Check if file exists
        if (!fs.existsSync(tempFile)) {
            // yt-dlp might have added extension, try to find the file
            const files = fs.readdirSync(DOWNLOADS_DIR).filter(f => f.startsWith(`temp_${tempFile.split('temp_')[1]?.split('.')[0]}`));
            if (files.length === 0) {
                return res.status(500).json({ error: 'File not found after download' });
            }
        }

        // Stream file to browser
        res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(filename)}"`);
        res.setHeader('Content-Type', isAudioOnly ? 'audio/mpeg' : 'video/mp4');

        const fileStream = fs.createReadStream(tempFile);

        fileStream.on('end', () => {
            // Delete temp file after sending
            fs.unlink(tempFile, (err) => {
                if (err) console.error('Failed to delete temp file:', err);
                else console.log(`Downloaded and cleaned: ${filename}`);
            });
        });

        fileStream.on('error', (err) => {
            console.error('Stream error:', err);
            res.status(500).json({ error: 'Failed to stream file' });
        });

        fileStream.pipe(res);
    });

    ytdlp.on('error', (err) => {
        console.error('yt-dlp error:', err);
        res.status(500).json({ error: err.message });
    });
});

// Check if yt-dlp is installed
app.get('/api/check-ytdlp', (req, res) => {
    exec('yt-dlp --version', (error, stdout) => {
        if (error) {
            res.json({ installed: false });
        } else {
            res.json({ installed: true, version: stdout.trim() });
        }
    });
});

// Check if ffmpeg is installed
app.get('/api/check-ffmpeg', (req, res) => {
    exec('ffmpeg -version', (error, stdout) => {
        if (error) {
            res.json({ installed: false });
        } else {
            const versionMatch = stdout.match(/ffmpeg version (\S+)/);
            res.json({
                installed: true,
                version: versionMatch ? versionMatch[1] : 'unknown'
            });
        }
    });
});

// Health check for Railway
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n========================================`);
    console.log(`  YouTube Downloader Server`);
    console.log(`  Running at: http://localhost:${PORT}`);
    console.log(`  Environment: ${process.env.RAILWAY_ENVIRONMENT || 'local'}`);
    console.log(`========================================\n`);
});
