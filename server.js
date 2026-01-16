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

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Validate video URL (YouTube, TikTok, Instagram)
function isValidVideoUrl(url) {
    const patterns = [
        // YouTube
        /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]+/,
        /^(https?:\/\/)?(www\.)?youtube\.com\/shorts\/[\w-]+/,
        /^(https?:\/\/)?youtu\.be\/[\w-]+/,
        /^(https?:\/\/)?(www\.)?youtube\.com\/embed\/[\w-]+/,
        // TikTok
        /^(https?:\/\/)?(www\.)?tiktok\.com\/@[\w.-]+\/video\/\d+/,
        /^(https?:\/\/)?(www\.)?tiktok\.com\/t\/[\w]+/,
        /^(https?:\/\/)?vm\.tiktok\.com\/[\w]+/,
        /^(https?:\/\/)?(www\.)?tiktok\.com\/@[\w.-]+/,
        // Instagram
        /^(https?:\/\/)?(www\.)?instagram\.com\/(p|reel|reels|tv)\/[\w-]+/,
        /^(https?:\/\/)?(www\.)?instagram\.com\/stories\/[\w.-]+\/\d+/
    ];
    return patterns.some(pattern => pattern.test(url));
}

// Detect platform from URL
function detectPlatform(url) {
    if (/youtube\.com|youtu\.be/.test(url)) return 'youtube';
    if (/tiktok\.com|vm\.tiktok\.com/.test(url)) return 'tiktok';
    if (/instagram\.com/.test(url)) return 'instagram';
    return 'unknown';
}

// Get video info using yt-dlp
async function getVideoInfo(url) {
    return new Promise((resolve, reject) => {
        const args = [
            '--dump-json',
            '--no-download',
            '--no-warnings',
            '--extractor-args', 'youtube:lang=pt'
        ];

        // Add cookies for TikTok
        if (url.includes('tiktok.com')) {
            args.push('--cookies-from-browser', 'chrome');
        }

        args.push(url);

        const ytdlp = spawn('yt-dlp', args);

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
                    const viewCount = info.view_count || info.views || info.like_count || 0;
                    const platform = detectPlatform(url);
                    console.log(`[${platform.toUpperCase()}] "${info.title}" - Views: ${viewCount}`);
                    resolve({
                        valid: true,
                        url: url,
                        platform: platform,
                        title: info.title || 'Unknown Title',
                        duration: info.duration || 0,
                        thumbnail: info.thumbnail || '',
                        channel: info.channel || info.uploader || info.creator || 'Unknown',
                        views: viewCount
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

// ==================== YOUTUBE SEARCH ====================

// Canal fixo para busca
const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@nextleveldj1';

// List videos from the fixed YouTube channel
async function listChannelVideos(type = 'videos', limit = 100) {
    return new Promise((resolve, reject) => {
        const channelTab = type === 'shorts' ? '/shorts' : '/videos';
        const url = `${YOUTUBE_CHANNEL_URL}${channelTab}`;

        console.log(`[YOUTUBE] Listing ${type} from channel: ${url} (limit: ${limit})`);

        const ytdlp = spawn('yt-dlp', [
            '--dump-json',
            '--flat-playlist',
            '--no-download',
            '--no-warnings',
            '--ignore-errors',
            '--playlist-end', String(limit),
            url
        ]);

        let stdout = '';
        let stderr = '';

        // Timeout after 120 seconds (channel listing can take longer)
        const timeout = setTimeout(() => {
            ytdlp.kill('SIGTERM');
            reject(new Error('Busca expirou - tente novamente'));
        }, 120000);

        ytdlp.stdout.on('data', (data) => {
            stdout += data.toString();
        });

        ytdlp.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        ytdlp.on('close', (code) => {
            clearTimeout(timeout);

            if (code !== 0 && stdout.length === 0) {
                reject(new Error(stderr || 'Busca falhou'));
                return;
            }

            try {
                const lines = stdout.trim().split('\n').filter(line => line.trim());
                const videos = [];

                for (const line of lines) {
                    try {
                        const info = JSON.parse(line);

                        // Filter shorts by duration if type is shorts
                        if (type === 'shorts' && info.duration && info.duration > 60) {
                            continue; // Skip videos longer than 60s when searching shorts
                        }

                        videos.push({
                            id: info.id,
                            url: info.url || `https://www.youtube.com/watch?v=${info.id}`,
                            title: info.title || 'Sem titulo',
                            channel: info.channel || info.uploader || 'nextleveldj1',
                            duration: info.duration || 0,
                            views: info.view_count || 0,
                            thumbnail: info.thumbnail || info.thumbnails?.[0]?.url || '',
                            uploadDate: info.upload_date || '',
                            platform: 'youtube'
                        });
                    } catch (parseError) {
                        // Skip invalid lines
                    }
                }

                console.log(`[YOUTUBE] Found ${videos.length} ${type} from channel`);
                resolve(videos);
            } catch (error) {
                reject(new Error('Erro ao processar resultados'));
            }
        });

        ytdlp.on('error', (err) => {
            clearTimeout(timeout);
            reject(err);
        });
    });
}

// YouTube search endpoint - busca apenas no canal @nextleveldj1
app.post('/api/youtube-search', async (req, res) => {
    const { query, type = 'videos', limit = 100 } = req.body;

    try {
        // Lista videos do canal fixo
        let videos = await listChannelVideos(type, Math.min(limit, 200));

        // Se houver query, filtra os resultados pelo termo
        if (query && query.trim()) {
            const searchTerm = query.trim().toLowerCase();
            videos = videos.filter(v =>
                v.title.toLowerCase().includes(searchTerm)
            );
            console.log(`[YOUTUBE] Filtered to ${videos.length} results for "${searchTerm}"`);
        }

        res.json({
            query: query ? query.trim() : '',
            type: type,
            count: videos.length,
            videos: videos
        });
    } catch (error) {
        console.error('[YOUTUBE] Error:', error.message);
        res.status(500).json({ error: error.message || 'Busca falhou' });
    }
});

// ==================== TIKTOK PROFILE ====================

// Get content from TikTok profile
app.post('/api/tiktok-profile', async (req, res) => {
    const { username, limit = 100 } = req.body;

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    try {
        const results = await getTikTokProfile(username, limit);
        res.json({
            username: username,
            count: results.length,
            videos: results
        });
    } catch (error) {
        console.error('[TIKTOK] Error:', error.message);
        res.status(500).json({ error: error.message || 'Failed to get TikTok profile' });
    }
});

// Get TikTok profile content using yt-dlp
async function getTikTokProfile(username, limit = 100) {
    return new Promise((resolve, reject) => {
        const profileUrl = `https://www.tiktok.com/@${username}`;

        console.log(`[TIKTOK] Fetching videos from @${username} (limit: ${limit})`);

        const ytdlp = spawn('yt-dlp', [
            '--dump-json',
            '--flat-playlist',
            '--no-download',
            '--no-warnings',
            '--ignore-errors',
            '--cookies-from-browser', 'chrome',
            '--playlist-end', String(limit),
            profileUrl
        ]);

        let stdout = '';
        let stderr = '';

        const timeout = setTimeout(() => {
            ytdlp.kill('SIGTERM');
            reject(new Error('TikTok fetch timeout'));
        }, 300000); // 5 minutes

        ytdlp.stdout.on('data', (data) => {
            stdout += data.toString();
        });

        ytdlp.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        ytdlp.on('close', (code) => {
            clearTimeout(timeout);

            if (code !== 0 && stdout.length === 0) {
                // Check if it's a private account
                if (stderr.includes('private') || stderr.includes('unavailable')) {
                    reject(new Error('Conta privada ou indisponivel'));
                } else {
                    reject(new Error(stderr || 'Failed to fetch TikTok profile'));
                }
                return;
            }

            try {
                const lines = stdout.trim().split('\n').filter(line => line.trim());
                const videos = [];

                for (const line of lines) {
                    try {
                        const info = JSON.parse(line);
                        videos.push({
                            id: info.id,
                            url: info.webpage_url || info.url || `https://www.tiktok.com/@${username}/video/${info.id}`,
                            title: info.title || info.description?.substring(0, 100) || 'TikTok Video',
                            channel: info.channel || info.uploader || username,
                            duration: info.duration || 0,
                            views: info.view_count || info.play_count || 0,
                            thumbnail: info.thumbnail || info.thumbnails?.[0]?.url || '',
                            uploadDate: info.upload_date || '',
                            platform: 'tiktok'
                        });
                    } catch (parseError) {
                        // Skip invalid lines
                    }
                }

                console.log(`[TIKTOK] Found ${videos.length} videos from @${username}`);
                resolve(videos);
            } catch (error) {
                reject(new Error('Failed to parse TikTok content'));
            }
        });

        ytdlp.on('error', (err) => {
            clearTimeout(timeout);
            reject(err);
        });
    });
}

// ==================== INSTAGRAM PROFILE ====================

// Path to Python in pipx venv (for instaloader)
const INSTALOADER_PYTHON = path.join(
    process.env.HOME || os.homedir(),
    '.local/pipx/venvs/instaloader/bin/python'
);

// Get content from Instagram profile using instaloader
app.post('/api/instagram-profile', async (req, res) => {
    const { username, contentType = 'posts', limit = 50 } = req.body;

    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    try {
        const results = await getInstagramProfile(username, contentType, limit);
        res.json(results);
    } catch (error) {
        console.error('[INSTAGRAM] Error:', error.message);
        res.status(500).json({ error: error.message || 'Failed to get Instagram profile' });
    }
});

// Get Instagram profile content using instaloader via Python script
async function getInstagramProfile(username, contentType = 'posts', limit = 50) {
    return new Promise((resolve, reject) => {
        const cleanUsername = username.replace('@', '');
        const scriptPath = path.join(__dirname, 'scripts', 'instagram_fetch.py');

        console.log(`[INSTAGRAM] Fetching ${contentType} from @${cleanUsername} (limit: ${limit})`);

        const pythonProcess = spawn(INSTALOADER_PYTHON, [
            scriptPath,
            cleanUsername,
            contentType,
            String(limit)
        ]);

        let stdout = '';
        let stderr = '';

        const timeout = setTimeout(() => {
            pythonProcess.kill('SIGTERM');
            reject(new Error('Instagram fetch timeout'));
        }, 300000); // 5 minutes

        pythonProcess.stdout.on('data', (data) => {
            stdout += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        pythonProcess.on('close', (code) => {
            clearTimeout(timeout);

            // Filter out the 403 warning messages from stderr
            const cleanStderr = stderr
                .split('\n')
                .filter(line => !line.includes('403 Forbidden') && !line.includes('retrying'))
                .join('\n')
                .trim();

            try {
                const result = JSON.parse(stdout);

                if (result.error) {
                    reject(new Error(result.error));
                    return;
                }

                console.log(`[INSTAGRAM] Found ${result.videos?.length || 0} ${contentType} from @${cleanUsername}`);
                resolve(result);
            } catch (parseError) {
                if (cleanStderr) {
                    reject(new Error(cleanStderr));
                } else {
                    reject(new Error('Failed to parse Instagram content'));
                }
            }
        });

        pythonProcess.on('error', (err) => {
            clearTimeout(timeout);
            reject(err);
        });
    });
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

        if (!isValidVideoUrl(trimmedUrl)) {
            results.push({
                url: trimmedUrl,
                valid: false,
                error: 'URL invalida (use YouTube, TikTok ou Instagram)'
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

// Format views number
function formatViews(views) {
    if (views >= 1000000) {
        return (views / 1000000).toFixed(1) + 'M';
    } else if (views >= 1000) {
        return (views / 1000).toFixed(1) + 'K';
    }
    return views.toString();
}

// Detect platform from URL
function getPlatformPrefix(url) {
    if (url.includes('tiktok.com')) return 'TT';
    if (url.includes('instagram.com')) return 'IG';
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'YT';
    return '';
}

// Direct download endpoint - downloads video and streams to browser
app.get('/api/download-file', async (req, res) => {
    const { url, quality, prefix, title, views } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    const format = QUALITY_FORMATS[quality] || QUALITY_FORMATS['best'];
    const isAudioOnly = quality === 'audio';

    // Create filename with views and platform prefix
    const safeTitle = sanitizeFilename(title || 'video');
    const viewsFormatted = views ? formatViews(parseInt(views)) : '';
    const ext = isAudioOnly ? 'mp3' : 'mp4';
    const platformPrefix = getPlatformPrefix(url);

    let filename;
    if (prefix && viewsFormatted) {
        filename = `${platformPrefix} - ${prefix} - ${viewsFormatted} - ${safeTitle}.${ext}`;
    } else if (prefix) {
        filename = `${platformPrefix} - ${prefix} - ${safeTitle}.${ext}`;
    } else if (viewsFormatted) {
        filename = `${platformPrefix} - ${viewsFormatted} - ${safeTitle}.${ext}`;
    } else {
        filename = `${platformPrefix} - ${safeTitle}.${ext}`;
    }

    // Temporary file path
    const tempFile = path.join(DOWNLOADS_DIR, `temp_${Date.now()}_${Math.random().toString(36).substr(2)}.${ext}`);

    // Build yt-dlp arguments
    const args = [
        '-f', format,
        '--no-warnings'
    ];

    // Add cookies for TikTok and Instagram
    if (url.includes('tiktok.com') || url.includes('instagram.com')) {
        args.push('--cookies-from-browser', 'chrome');
    }

    // Force compatible format for Instagram (H.264/AAC)
    if (url.includes('instagram.com') && !isAudioOnly) {
        args.push('--recode-video', 'mp4');
    }

    if (isAudioOnly) {
        args.push('--extract-audio');
        args.push('--audio-format', 'mp3');
        args.push('--audio-quality', '0');
    } else {
        args.push('--merge-output-format', 'mp4');
    }

    args.push('-o', tempFile);
    args.push(url);

    console.log(`Starting download: ${filename} (views param: ${views})`);
    console.log(`Download params - URL: ${url}, Quality: ${quality}, Prefix: ${prefix}, Title: ${title}, Views: ${views}`);

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
    console.log(`  Video Downloader Server`);
    console.log(`  YouTube | TikTok | Instagram`);
    console.log(`  Running at: http://localhost:${PORT}`);
    console.log(`  Environment: ${process.env.RAILWAY_ENVIRONMENT || 'local'}`);
    console.log(`========================================\n`);
});
