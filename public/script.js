// DOM Elements
const urlInput = document.getElementById('urlInput');
const validateBtn = document.getElementById('validateBtn');
const downloadAllBtn = document.getElementById('downloadAllBtn');
const openFolderBtn = document.getElementById('openFolderBtn');
const qualitySelect = document.getElementById('qualitySelect');
const statusMessage = document.getElementById('statusMessage');
const videoList = document.getElementById('videoList');
const overallProgress = document.getElementById('overallProgress');
const overallProgressBar = document.getElementById('overallProgressBar');
const overallProgressText = document.getElementById('overallProgressText');

// State
let validatedVideos = [];
let videoPrefixes = {};

// Initialize
checkDependencies();

// Check if dependencies are installed
async function checkDependencies() {
    try {
        const [ytdlpRes, ffmpegRes] = await Promise.all([
            fetch('/api/check-ytdlp'),
            fetch('/api/check-ffmpeg')
        ]);

        const ytdlp = await ytdlpRes.json();
        const ffmpeg = await ffmpegRes.json();

        if (!ytdlp.installed) {
            showStatus('yt-dlp nao esta instalado. Execute: brew install yt-dlp', 'error');
            return;
        }

        if (!ffmpeg.installed) {
            showStatus('ffmpeg nao esta instalado. Execute: brew install ffmpeg', 'error');
            return;
        }
    } catch (error) {
        console.error('Error checking dependencies:', error);
    }
}

// Show status message
function showStatus(message, type = 'info') {
    statusMessage.textContent = message;
    statusMessage.className = `status-message ${type}`;
    statusMessage.classList.remove('hidden');

    if (type === 'success' || type === 'error') {
        setTimeout(() => {
            statusMessage.classList.add('hidden');
        }, 5000);
    }
}

// Hide status message
function hideStatus() {
    statusMessage.classList.add('hidden');
}

// Format duration
function formatDuration(seconds) {
    if (!seconds) return '';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Format views
function formatViews(views) {
    if (!views) return '0';
    if (views >= 1000000) {
        return (views / 1000000).toFixed(1) + 'M';
    } else if (views >= 1000) {
        return (views / 1000).toFixed(1) + 'K';
    }
    return views.toString();
}

// Create video item HTML
function createVideoItem(video, index) {
    const item = document.createElement('div');
    item.className = 'video-item';
    item.id = `video-${index}`;

    if (!video.valid) {
        item.innerHTML = `
            <div class="video-info" style="flex: 1;">
                <div class="video-title">${video.url}</div>
                <div class="video-channel" style="color: var(--error);">${video.error || 'Link invalido'}</div>
            </div>
            <span class="video-status status-invalid">Invalido</span>
        `;
    } else {
        const viewsFormatted = formatViews(video.views);
        item.innerHTML = `
            <img class="video-thumbnail" src="${video.thumbnail || ''}" alt="" onerror="this.style.display='none'">
            <div class="video-info">
                <div class="video-title" title="${video.title}">${video.title}</div>
                <div class="video-channel">${video.channel} ${video.duration ? '- ' + formatDuration(video.duration) : ''}</div>
                <div class="video-views">${viewsFormatted} views</div>
                <div class="prefix-buttons" data-index="${index}">
                    <button class="prefix-btn prefix-viral" onclick="selectPrefix(${index}, 'Viral')">Viral</button>
                    <button class="prefix-btn prefix-normal selected" onclick="selectPrefix(${index}, 'Normal')">Normal</button>
                </div>
            </div>
            <button class="btn btn-download" onclick="downloadVideo(${index})">
                <span class="btn-icon">&#11015;</span> Baixar
            </button>
        `;
    }

    return item;
}

// Select prefix for a video
function selectPrefix(index, prefix) {
    const container = document.querySelector(`.prefix-buttons[data-index="${index}"]`);
    if (!container) return;

    const buttons = container.querySelectorAll('.prefix-btn');

    if (videoPrefixes[index] === prefix) {
        delete videoPrefixes[index];
        buttons.forEach(btn => btn.classList.remove('selected'));
    } else {
        videoPrefixes[index] = prefix;
        buttons.forEach(btn => {
            btn.classList.remove('selected');
            if (btn.textContent === prefix) {
                btn.classList.add('selected');
            }
        });
    }
}

// Update overall progress bar
function updateOverallProgress(completed, total) {
    overallProgressText.textContent = `${completed}/${total}`;
    const percent = total > 0 ? (completed / total) * 100 : 0;
    overallProgressBar.style.width = `${percent}%`;
}

// Download individual video (returns promise)
function downloadVideo(index, showButtonState = true) {
    return new Promise((resolve, reject) => {
        const video = validatedVideos[index];
        if (!video || !video.valid) {
            resolve(false);
            return;
        }

        const quality = qualitySelect.value;
        const prefix = videoPrefixes[index] || '';

        // Build download URL with views
        const params = new URLSearchParams({
            url: video.url,
            quality: quality,
            prefix: prefix,
            title: video.title,
            views: video.views || 0
        });

        // Update button to show downloading state
        const item = document.getElementById(`video-${index}`);
        const btn = item.querySelector('.btn-download');

        if (showButtonState) {
            btn.innerHTML = '<span class="btn-icon">&#8987;</span> Baixando...';
            btn.disabled = true;
        }

        // Trigger download
        const downloadUrl = `/api/download-file?${params.toString()}`;

        fetch(downloadUrl)
            .then(response => {
                if (!response.ok) throw new Error('Download failed');
                return response.blob();
            })
            .then(blob => {
                // Create download link
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                const ext = quality === 'audio' ? 'mp3' : 'mp4';
                const viewsFormatted = formatViews(video.views);
                let filename;
                if (prefix) {
                    filename = `${prefix} - ${viewsFormatted} - ${video.title}.${ext}`;
                } else {
                    filename = `${viewsFormatted} - ${video.title}.${ext}`;
                }
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove();

                // Update button
                btn.innerHTML = '<span class="btn-icon">&#10003;</span> Concluido';
                btn.classList.add('btn-completed');
                btn.disabled = false;

                resolve(true);
            })
            .catch(error => {
                console.error('Download error:', error);
                btn.innerHTML = '<span class="btn-icon">&#10007;</span> Erro';
                btn.classList.add('btn-error');
                btn.disabled = false;

                resolve(false);
            });
    });
}

// Download all videos sequentially
async function downloadAllVideos() {
    const validIndices = [];
    validatedVideos.forEach((video, index) => {
        if (video.valid) {
            validIndices.push(index);
        }
    });

    if (validIndices.length === 0) {
        showStatus('Nenhum video valido para download', 'error');
        return;
    }

    // Disable controls
    downloadAllBtn.disabled = true;
    downloadAllBtn.innerHTML = '<span class="btn-icon">&#8987;</span> Baixando...';
    validateBtn.disabled = true;
    urlInput.disabled = true;
    qualitySelect.disabled = true;

    // Show progress bar
    overallProgress.classList.remove('hidden');
    updateOverallProgress(0, validIndices.length);

    let completedCount = 0;

    // Download each video sequentially (wait for each to finish)
    for (let i = 0; i < validIndices.length; i++) {
        const index = validIndices[i];

        showStatus(`Baixando video ${i + 1} de ${validIndices.length}...`, 'info');

        // Wait for this download to complete before starting next
        const success = await downloadVideo(index, true);

        completedCount++;
        updateOverallProgress(completedCount, validIndices.length);

        // Small delay between downloads
        if (i < validIndices.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    // Re-enable controls
    downloadAllBtn.disabled = false;
    downloadAllBtn.innerHTML = '<span class="btn-icon">&#11015;</span> Baixar Todos';
    validateBtn.disabled = false;
    urlInput.disabled = false;
    qualitySelect.disabled = false;

    showStatus(`${completedCount} download(s) concluido(s)!`, 'success');
}

// Validate URLs
async function validateUrls() {
    const text = urlInput.value.trim();

    if (!text) {
        showStatus('Cole pelo menos um link do YouTube', 'error');
        return;
    }

    const urls = text.split('\n')
        .map(url => url.trim())
        .filter(url => url.length > 0);

    if (urls.length === 0) {
        showStatus('Nenhum link valido encontrado', 'error');
        return;
    }

    validateBtn.disabled = true;
    validateBtn.innerHTML = '<span class="btn-icon">&#8987;</span> Verificando...';
    videoList.innerHTML = '';
    downloadAllBtn.disabled = true;
    videoPrefixes = {};
    hideStatus();

    try {
        const response = await fetch('/api/validate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ urls })
        });

        const data = await response.json();

        if (data.error) {
            showStatus(data.error, 'error');
            return;
        }

        validatedVideos = data.videos;

        validatedVideos.forEach((video, index) => {
            const item = createVideoItem(video, index);
            videoList.appendChild(item);
            // Set "Normal" as default prefix for valid videos
            if (video.valid) {
                videoPrefixes[index] = 'Normal';
            }
        });

        const validCount = validatedVideos.filter(v => v.valid).length;

        if (validCount === 0) {
            showStatus('Nenhum video valido para download', 'error');
        } else {
            showStatus(`${validCount} video(s) pronto(s) para download`, 'success');
            downloadAllBtn.disabled = false;
        }

    } catch (error) {
        showStatus('Erro ao verificar links: ' + error.message, 'error');
    } finally {
        validateBtn.disabled = false;
        validateBtn.innerHTML = '<span class="btn-icon">&#128269;</span> Verificar Links';
    }
}

// Open downloads folder
async function openFolder() {
    try {
        const response = await fetch('/api/open-folder');
        const data = await response.json();

        if (!data.success) {
            showStatus('Erro ao abrir pasta', 'error');
        }
    } catch (error) {
        showStatus('Erro ao abrir pasta: ' + error.message, 'error');
    }
}

// Event Listeners
validateBtn.addEventListener('click', validateUrls);
downloadAllBtn.addEventListener('click', downloadAllVideos);
openFolderBtn.addEventListener('click', openFolder);

urlInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        e.preventDefault();
        validateUrls();
    }
});
