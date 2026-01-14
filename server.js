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
        const ytdlp = spawn('yt-dlp', [
            '--dump-json',
            '--no-download',
            '--no-warnings',
            '--extractor-args', 'youtube:lang=pt',
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

// Search YouTube using yt-dlp
async function searchYouTube(query, limit = 100) {
    return new Promise((resolve, reject) => {
        const searchQuery = `ytsearch${limit}:${query}`;

        console.log(`[SEARCH] Searching YouTube for: "${query}" (limit: ${limit})`);

        const ytdlp = spawn('yt-dlp', [
            '--dump-json',
            '--flat-playlist',
            '--no-download',
            '--no-warnings',
            '--ignore-errors',
            '--extractor-args', 'youtube:lang=pt',
            searchQuery
        ]);

        let stdout = '';
        let stderr = '';

        // Timeout after 90 seconds
        const timeout = setTimeout(() => {
            ytdlp.kill('SIGTERM');
            reject(new Error('Search timeout - took too long'));
        }, 90000);

        ytdlp.stdout.on('data', (data) => {
            stdout += data.toString();
        });

        ytdlp.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        ytdlp.on('close', (code) => {
            clearTimeout(timeout);

            if (code !== 0 && stdout.length === 0) {
                reject(new Error(stderr || 'Search failed'));
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
                            url: info.url || `https://www.youtube.com/watch?v=${info.id}`,
                            title: info.title || 'Unknown Title',
                            channel: info.channel || info.uploader || 'Unknown',
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

                console.log(`[SEARCH] Found ${videos.length} videos for "${query}"`);
                resolve(videos);
            } catch (error) {
                reject(new Error('Failed to parse search results'));
            }
        });

        ytdlp.on('error', (err) => {
            clearTimeout(timeout);
            reject(err);
        });
    });
}

// YouTube search endpoint
app.post('/api/search', async (req, res) => {
    const { query, limit = 100, channelOnly = false } = req.body;

    try {
        let results;

        if (channelOnly && query) {
            // Search within channel by keyword
            results = await searchChannelByKeyword(query.trim(), limit);
        } else if (query) {
            // General YouTube search
            results = await searchYouTube(query.trim(), Math.min(limit, 100));
        } else {
            return res.status(400).json({ error: 'Search query is required' });
        }

        res.json({
            query: query ? query.trim() : 'all',
            count: results.length,
            videos: results
        });
    } catch (error) {
        console.error('[SEARCH] Error:', error.message);
        res.status(500).json({ error: error.message || 'Search failed' });
    }
});

// List all videos from channel
app.post('/api/channel-videos', async (req, res) => {
    const { limit = 100 } = req.body;

    try {
        const results = await getChannelContent('videos', limit);
        res.json({
            query: 'nextleveldj1',
            count: results.length,
            contentType: 'videos',
            videos: results
        });
    } catch (error) {
        console.error('[CHANNEL] Error:', error.message);
        res.status(500).json({ error: error.message || 'Failed to get channel videos' });
    }
});

// List all shorts from channel
app.post('/api/channel-shorts', async (req, res) => {
    const { limit = 100 } = req.body;

    try {
        const results = await getChannelContent('shorts', limit);
        res.json({
            query: 'nextleveldj1',
            count: results.length,
            contentType: 'shorts',
            videos: results
        });
    } catch (error) {
        console.error('[CHANNEL] Error:', error.message);
        res.status(500).json({ error: error.message || 'Failed to get channel shorts' });
    }
});

// List all lives/streams from channel
app.post('/api/channel-lives', async (req, res) => {
    const { limit = 100 } = req.body;

    try {
        const results = await getChannelContent('lives', limit);
        res.json({
            query: 'nextleveldj1',
            count: results.length,
            contentType: 'lives',
            videos: results
        });
    } catch (error) {
        console.error('[CHANNEL] Error:', error.message);
        res.status(500).json({ error: error.message || 'Failed to get channel lives' });
    }
});

// Get content from nextleveldj1 channel by type (videos, shorts, streams)
async function getChannelContent(contentType = 'videos', limit = 100) {
    return new Promise((resolve, reject) => {
        const typeMap = {
            'videos': 'videos',
            'shorts': 'shorts',
            'lives': 'streams'
        };
        const urlType = typeMap[contentType] || 'videos';
        const channelUrl = `https://www.youtube.com/@nextleveldj1/${urlType}`;

        console.log(`[CHANNEL] Fetching ${contentType} from nextleveldj1 (limit: ${limit})`);

        const ytdlp = spawn('yt-dlp', [
            '--dump-json',
            '--no-download',
            '--no-warnings',
            '--ignore-errors',
            '--extractor-args', 'youtube:lang=pt',
            '--playlist-end', String(limit),
            channelUrl
        ]);

        let stdout = '';
        let stderr = '';

        const timeout = setTimeout(() => {
            ytdlp.kill('SIGTERM');
            reject(new Error('Channel fetch timeout'));
        }, 300000); // 5 minutes for full metadata fetch

        ytdlp.stdout.on('data', (data) => {
            stdout += data.toString();
        });

        ytdlp.stderr.on('data', (data) => {
            stderr += data.toString();
        });

        ytdlp.on('close', (code) => {
            clearTimeout(timeout);

            if (code !== 0 && stdout.length === 0) {
                reject(new Error(stderr || 'Failed to fetch channel'));
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
                            url: info.url || `https://www.youtube.com/watch?v=${info.id}`,
                            title: info.title || 'Unknown Title',
                            channel: info.channel || info.uploader || 'nextleveldj1',
                            duration: info.duration || 0,
                            views: info.view_count || 0,
                            thumbnail: info.thumbnail || info.thumbnails?.[0]?.url || '',
                            uploadDate: info.upload_date || '',
                            platform: 'youtube',
                            contentType: contentType
                        });
                    } catch (parseError) {
                        // Skip invalid lines
                    }
                }

                console.log(`[CHANNEL] Found ${videos.length} ${contentType} from nextleveldj1`);
                resolve(videos);
            } catch (error) {
                reject(new Error('Failed to parse channel content'));
            }
        });

        ytdlp.on('error', (err) => {
            clearTimeout(timeout);
            reject(err);
        });
    });
}

// Wrapper for backward compatibility
async function getChannelVideos(limit = 100) {
    return getChannelContent('videos', limit);
}

// Search within channel by keyword (filters locally)
async function searchChannelByKeyword(keyword, limit = 100) {
    const allVideos = await getChannelVideos(500); // Get more to filter
    const keywordLower = keyword.toLowerCase();

    const filtered = allVideos.filter(video =>
        video.title.toLowerCase().includes(keywordLower)
    );

    console.log(`[CHANNEL] Filtered ${filtered.length} videos matching "${keyword}"`);
    return filtered.slice(0, limit);
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

// Direct download endpoint - downloads video and streams to browser
app.get('/api/download-file', async (req, res) => {
    const { url, quality, prefix, title, views } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    const format = QUALITY_FORMATS[quality] || QUALITY_FORMATS['best'];
    const isAudioOnly = quality === 'audio';

    // Create filename with views
    const safeTitle = sanitizeFilename(title || 'video');
    const viewsFormatted = views ? formatViews(parseInt(views)) : '';
    const ext = isAudioOnly ? 'mp3' : 'mp4';

    let filename;
    if (prefix && viewsFormatted) {
        filename = `${prefix} - ${viewsFormatted} - ${safeTitle}.${ext}`;
    } else if (prefix) {
        filename = `${prefix} - ${safeTitle}.${ext}`;
    } else if (viewsFormatted) {
        filename = `${viewsFormatted} - ${safeTitle}.${ext}`;
    } else {
        filename = `${safeTitle}.${ext}`;
    }

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
