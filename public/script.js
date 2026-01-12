// DOM Elements - Login
const loginScreen = document.getElementById('loginScreen');
const appScreen = document.getElementById('appScreen');
const passwordInput = document.getElementById('passwordInput');
const loginBtn = document.getElementById('loginBtn');
const loginError = document.getElementById('loginError');

// DOM Elements - App
const urlInput = document.getElementById('urlInput');
const validateBtn = document.getElementById('validateBtn');
const qualitySelect = document.getElementById('qualitySelect');
const statusMessage = document.getElementById('statusMessage');
const videoList = document.getElementById('videoList');

// State
let authToken = localStorage.getItem('authToken') || '';
let validatedVideos = [];
let videoPrefixes = {};

// Check if already logged in
if (authToken) {
    checkAuth();
} else {
    loginScreen.classList.remove('hidden');
}

// Login functions
async function login() {
    const password = passwordInput.value;
    if (!password) return;

    loginBtn.disabled = true;
    loginBtn.textContent = 'Entrando...';
    loginError.classList.add('hidden');

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });

        const data = await response.json();

        if (data.success) {
            authToken = data.token;
            localStorage.setItem('authToken', authToken);
            showApp();
        } else {
            loginError.classList.remove('hidden');
            passwordInput.value = '';
            passwordInput.focus();
        }
    } catch (error) {
        loginError.textContent = 'Erro de conexao';
        loginError.classList.remove('hidden');
    } finally {
        loginBtn.disabled = false;
        loginBtn.textContent = 'Entrar';
    }
}

async function checkAuth() {
    try {
        const response = await fetch('/api/check-ytdlp', {
            headers: { 'Authorization': `Bearer ${authToken}` }
        });

        if (response.ok) {
            showApp();
        } else {
            localStorage.removeItem('authToken');
            authToken = '';
            loginScreen.classList.remove('hidden');
        }
    } catch (error) {
        loginScreen.classList.remove('hidden');
    }
}

function showApp() {
    loginScreen.classList.add('hidden');
    appScreen.classList.remove('hidden');
}

// Event listeners for login
loginBtn.addEventListener('click', login);
passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') login();
});

// Helper function for authenticated requests
async function authFetch(url, options = {}) {
    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${authToken}`
    };
    return fetch(url, { ...options, headers });
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
        item.innerHTML = `
            <img class="video-thumbnail" src="${video.thumbnail || ''}" alt="" onerror="this.style.display='none'">
            <div class="video-info">
                <div class="video-title" title="${video.title}">${video.title}</div>
                <div class="video-channel">${video.channel} ${video.duration ? '- ' + formatDuration(video.duration) : ''}</div>
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

// Download individual video
function downloadVideo(index) {
    const video = validatedVideos[index];
    if (!video || !video.valid) return;

    const quality = qualitySelect.value;
    const prefix = videoPrefixes[index] || '';

    // Build download URL
    const params = new URLSearchParams({
        url: video.url,
        quality: quality,
        prefix: prefix,
        title: video.title
    });

    // Update button to show downloading state
    const item = document.getElementById(`video-${index}`);
    const btn = item.querySelector('.btn-download');
    btn.innerHTML = '<span class="btn-icon">&#8987;</span> Baixando...';
    btn.disabled = true;

    // Create hidden link and trigger download
    const downloadUrl = `/api/download-file?${params.toString()}`;

    // Use fetch to download with auth
    authFetch(downloadUrl)
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
            a.download = prefix ? `${prefix} - ${video.title}.${ext}` : `${video.title}.${ext}`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();

            // Update button
            btn.innerHTML = '<span class="btn-icon">&#10003;</span> Concluido';
            btn.classList.add('btn-completed');

            setTimeout(() => {
                btn.innerHTML = '<span class="btn-icon">&#11015;</span> Baixar';
                btn.disabled = false;
                btn.classList.remove('btn-completed');
            }, 3000);
        })
        .catch(error => {
            console.error('Download error:', error);
            btn.innerHTML = '<span class="btn-icon">&#10007;</span> Erro';
            btn.classList.add('btn-error');

            setTimeout(() => {
                btn.innerHTML = '<span class="btn-icon">&#11015;</span> Baixar';
                btn.disabled = false;
                btn.classList.remove('btn-error');
            }, 3000);
        });
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
    videoPrefixes = {};
    hideStatus();

    try {
        const response = await authFetch('/api/validate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ urls })
        });

        if (response.status === 401) {
            localStorage.removeItem('authToken');
            location.reload();
            return;
        }

        const data = await response.json();

        if (data.error) {
            showStatus(data.error, 'error');
            return;
        }

        validatedVideos = data.videos;

        // Display videos
        validatedVideos.forEach((video, index) => {
            const item = createVideoItem(video, index);
            videoList.appendChild(item);
            if (video.valid) {
                videoPrefixes[index] = 'Normal';
            }
        });

        // Check if there are valid videos
        const validCount = validatedVideos.filter(v => v.valid).length;

        if (validCount === 0) {
            showStatus('Nenhum video valido para download', 'error');
        } else {
            showStatus(`${validCount} video(s) pronto(s) para download`, 'success');
        }

    } catch (error) {
        showStatus('Erro ao verificar links: ' + error.message, 'error');
    } finally {
        validateBtn.disabled = false;
        validateBtn.innerHTML = '<span class="btn-icon">&#128269;</span> Verificar Links';
    }
}

// Event Listeners
validateBtn.addEventListener('click', validateUrls);

urlInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        e.preventDefault();
        validateUrls();
    }
});
