// DOM Elements - Platform Tabs
const platformYoutube = document.getElementById('platformYoutube');
const platformInstagram = document.getElementById('platformInstagram');
const platformTiktok = document.getElementById('platformTiktok');
const youtubePanel = document.getElementById('youtubePanel');
const instagramPanel = document.getElementById('instagramPanel');
const tiktokPanel = document.getElementById('tiktokPanel');

// DOM Elements - URL Mode (YouTube)
const urlInput = document.getElementById('urlInput');
const validateBtn = document.getElementById('validateBtn');
const downloadAllBtn = document.getElementById('downloadAllBtn');
const openFolderBtn = document.getElementById('openFolderBtn');
const qualitySelect = document.getElementById('qualitySelect');
const videoList = document.getElementById('videoList');

// DOM Elements - Instagram
const igUrlInput = document.getElementById('igUrlInput');
const igValidateBtn = document.getElementById('igValidateBtn');
const igDownloadAllBtn = document.getElementById('igDownloadAllBtn');
const igOpenFolderBtn = document.getElementById('igOpenFolderBtn');
const igQualitySelect = document.getElementById('igQualitySelect');
const igVideoList = document.getElementById('igVideoList');
const igModeTabUrl = document.getElementById('igModeTabUrl');
const igModeTabProfile = document.getElementById('igModeTabProfile');
const igUrlModeSection = document.getElementById('igUrlModeSection');
const igProfileModeSection = document.getElementById('igProfileModeSection');
const igLoadProfileBtn = document.getElementById('igLoadProfileBtn');
const igContentTypePosts = document.getElementById('igContentTypePosts');
const igContentTypeReels = document.getElementById('igContentTypeReels');
const igSortBySelect = document.getElementById('igSortBySelect');
const igProfileQualitySelect = document.getElementById('igProfileQualitySelect');
const igSelectTop5Btn = document.getElementById('igSelectTop5Btn');
const igSelectBottom5Btn = document.getElementById('igSelectBottom5Btn');
const igClearSelectionBtn = document.getElementById('igClearSelectionBtn');
const igDownloadSelectedBtn = document.getElementById('igDownloadSelectedBtn');
const igSelectionCount = document.getElementById('igSelectionCount');
const igProfileResults = document.getElementById('igProfileResults');
const igSearchTypeAll = document.getElementById('igSearchTypeAll');
const igSearchTypeKeyword = document.getElementById('igSearchTypeKeyword');
const igKeywordInput = document.getElementById('igKeywordInput');

// DOM Elements - TikTok
const tkUrlInput = document.getElementById('tkUrlInput');
const tkValidateBtn = document.getElementById('tkValidateBtn');
const tkDownloadAllBtn = document.getElementById('tkDownloadAllBtn');
const tkOpenFolderBtn = document.getElementById('tkOpenFolderBtn');
const tkQualitySelect = document.getElementById('tkQualitySelect');
const tkVideoList = document.getElementById('tkVideoList');
const tkModeTabUrl = document.getElementById('tkModeTabUrl');
const tkModeTabProfile = document.getElementById('tkModeTabProfile');
const tkUrlModeSection = document.getElementById('tkUrlModeSection');
const tkProfileModeSection = document.getElementById('tkProfileModeSection');
const tkLoadProfileBtn = document.getElementById('tkLoadProfileBtn');
const tkSortBySelect = document.getElementById('tkSortBySelect');
const tkProfileQualitySelect = document.getElementById('tkProfileQualitySelect');
const tkSelectTop5Btn = document.getElementById('tkSelectTop5Btn');
const tkSelectBottom5Btn = document.getElementById('tkSelectBottom5Btn');
const tkClearSelectionBtn = document.getElementById('tkClearSelectionBtn');
const tkDownloadSelectedBtn = document.getElementById('tkDownloadSelectedBtn');
const tkSelectionCount = document.getElementById('tkSelectionCount');
const tkProfileResults = document.getElementById('tkProfileResults');
const tkSearchTypeAll = document.getElementById('tkSearchTypeAll');
const tkSearchTypeKeyword = document.getElementById('tkSearchTypeKeyword');
const tkKeywordInput = document.getElementById('tkKeywordInput');

// DOM Elements - TikTok Filters
const tkFiltersToggle = document.getElementById('tkFiltersToggle');
const tkFiltersPanel = document.getElementById('tkFiltersPanel');
const tkFilterCountBadge = document.getElementById('tkFilterCountBadge');
const tkFilterViewsMin = document.getElementById('tkFilterViewsMin');
const tkFilterViewsMax = document.getElementById('tkFilterViewsMax');
const tkFilterDurationMin = document.getElementById('tkFilterDurationMin');
const tkFilterDurationMax = document.getElementById('tkFilterDurationMax');
const tkFilterDateStart = document.getElementById('tkFilterDateStart');
const tkFilterDateEnd = document.getElementById('tkFilterDateEnd');
const tkApplyFiltersBtn = document.getElementById('tkApplyFiltersBtn');
const tkClearFiltersBtn = document.getElementById('tkClearFiltersBtn');

// DOM Elements - Quick Filters (YouTube)
const quickFilterMonth = document.getElementById('quickFilterMonth');
const quickFilterYear = document.getElementById('quickFilterYear');
const applyMonthYearFilter = document.getElementById('applyMonthYearFilter');

// DOM Elements - Search Mode (YouTube)
const modeTabUrl = document.getElementById('modeTabUrl');
const modeTabSearch = document.getElementById('modeTabSearch');
const urlModeSection = document.getElementById('urlModeSection');
const searchModeSection = document.getElementById('searchModeSection');
const searchTypeAll = document.getElementById('searchTypeAll');
const searchTypeKeyword = document.getElementById('searchTypeKeyword');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchQualitySelect = document.getElementById('searchQualitySelect');
const sortBySelect = document.getElementById('sortBySelect');
const selectTop5Btn = document.getElementById('selectTop5Btn');
const selectBottom5Btn = document.getElementById('selectBottom5Btn');
const clearSelectionBtn = document.getElementById('clearSelectionBtn');
const downloadSelectedBtn = document.getElementById('downloadSelectedBtn');
const selectionCount = document.getElementById('selectionCount');
const searchResultsContainer = document.getElementById('searchResults');

// DOM Elements - Content Type Tabs
const contentTypeVideos = document.getElementById('contentTypeVideos');
const contentTypeShorts = document.getElementById('contentTypeShorts');
const contentTypeLives = document.getElementById('contentTypeLives');

// DOM Elements - Filters (Collapsible)
const filtersToggle = document.getElementById('filtersToggle');
const filtersPanel = document.getElementById('filtersPanel');
const filterCountBadge = document.getElementById('filterCountBadge');
const filterViewsMin = document.getElementById('filterViewsMin');
const filterViewsMax = document.getElementById('filterViewsMax');
const filterDurationMin = document.getElementById('filterDurationMin');
const filterDurationMax = document.getElementById('filterDurationMax');
const filterDateStart = document.getElementById('filterDateStart');
const filterDateEnd = document.getElementById('filterDateEnd');
const applyFiltersBtn = document.getElementById('applyFiltersBtn');
const clearFiltersBtn = document.getElementById('clearFiltersBtn');

// DOM Elements - Shared
const statusMessage = document.getElementById('statusMessage');
const overallProgress = document.getElementById('overallProgress');
const overallProgressBar = document.getElementById('overallProgressBar');
const overallProgressText = document.getElementById('overallProgressText');
const toastContainer = document.getElementById('toastContainer');

// State - Platform
let currentPlatform = 'youtube'; // 'youtube' | 'instagram' | 'tiktok'

// State - URL Mode (YouTube)
let validatedVideos = [];
let videoPrefixes = {};

// State - Instagram
let igValidatedVideos = [];
let igVideoPrefixes = {};
let igCurrentMode = 'url'; // 'url' | 'profile'
let igContentType = 'posts'; // 'posts' | 'reels'
let igProfileResults_data = [];
let igUnfilteredResults = [];
let igSelectedVideos = new Set();
let igCurrentSortField = 'views';
let igCurrentSortOrder = 'desc';
let igTop5Ids = new Set();
let igBottom5Ids = new Set();
let igSearchType = 'all'; // 'all' | 'keyword'
let igKeyword = '';

// Fixed Instagram username
const INSTAGRAM_USERNAME = 'nextleveldj1';

// State - TikTok
let tkValidatedVideos = [];
let tkVideoPrefixes = {};
let tkCurrentMode = 'url'; // 'url' | 'profile'
let tkProfileResults_data = [];
let tkUnfilteredResults = [];
let tkSelectedVideos = new Set();
let tkCurrentSortField = 'views';
let tkCurrentSortOrder = 'desc';
let tkTop5Ids = new Set();
let tkBottom5Ids = new Set();
let tkSearchType = 'all'; // 'all' | 'keyword'
let tkKeyword = '';

// State - Search Mode (YouTube)
let searchResults = [];
let unfilteredResults = []; // Original results before filtering
let selectedVideos = new Set();
let currentMode = 'search';
let searchType = 'all'; // 'all' or 'keyword'
let contentType = 'shorts'; // 'videos' | 'shorts' | 'lives'
let currentSortField = 'views';
let currentSortOrder = 'desc';
let top5Ids = new Set();
let bottom5Ids = new Set();

// State - Filters
let filters = {
    viewsMin: null,
    viewsMax: null,
    durationMin: null,
    durationMax: null,
    dateStart: null,
    dateEnd: null
};

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

// ==================== MODE SWITCHING ====================

function switchMode(mode) {
    currentMode = mode;

    if (mode === 'url') {
        modeTabUrl.classList.add('active');
        modeTabSearch.classList.remove('active');
        urlModeSection.classList.remove('hidden');
        searchModeSection.classList.add('hidden');
    } else {
        modeTabUrl.classList.remove('active');
        modeTabSearch.classList.add('active');
        urlModeSection.classList.add('hidden');
        searchModeSection.classList.remove('hidden');
    }

    // Update ARIA
    updateModeTabsAria(mode);

    hideStatus();
    overallProgress.classList.add('hidden');
}

// ==================== PLATFORM SWITCHING ====================

function switchPlatform(platform) {
    currentPlatform = platform;

    // Update platform tabs
    platformYoutube.classList.toggle('active', platform === 'youtube');
    platformInstagram.classList.toggle('active', platform === 'instagram');
    platformTiktok.classList.toggle('active', platform === 'tiktok');

    // Update platform panels
    youtubePanel.classList.toggle('hidden', platform !== 'youtube');
    instagramPanel.classList.toggle('hidden', platform !== 'instagram');
    tiktokPanel.classList.toggle('hidden', platform !== 'tiktok');

    // Update ARIA
    platformYoutube.setAttribute('aria-selected', platform === 'youtube');
    platformInstagram.setAttribute('aria-selected', platform === 'instagram');
    platformTiktok.setAttribute('aria-selected', platform === 'tiktok');

    hideStatus();
    overallProgress.classList.add('hidden');
}

// ==================== INSTAGRAM MODE SWITCHING ====================

function switchInstagramMode(mode) {
    igCurrentMode = mode;

    if (mode === 'url') {
        igModeTabUrl.classList.add('active');
        igModeTabProfile.classList.remove('active');
        igUrlModeSection.classList.remove('hidden');
        igProfileModeSection.classList.add('hidden');
    } else {
        igModeTabUrl.classList.remove('active');
        igModeTabProfile.classList.add('active');
        igUrlModeSection.classList.add('hidden');
        igProfileModeSection.classList.remove('hidden');
    }

    // Update ARIA
    igModeTabUrl.setAttribute('aria-selected', mode === 'url');
    igModeTabProfile.setAttribute('aria-selected', mode === 'profile');

    hideStatus();
    overallProgress.classList.add('hidden');
}

function setInstagramContentType(type) {
    igContentType = type;

    // Update tab buttons
    igContentTypePosts.classList.toggle('active', type === 'posts');
    igContentTypeReels.classList.toggle('active', type === 'reels');

    // Update ARIA
    igContentTypePosts.setAttribute('aria-selected', type === 'posts');
    igContentTypeReels.setAttribute('aria-selected', type === 'reels');

    // Update button text
    const igLoadBtnText = document.getElementById('igLoadBtnText');
    if (igLoadBtnText) {
        igLoadBtnText.textContent = type === 'posts' ? 'Carregar Posts' : 'Carregar Reels';
    }
}

// ==================== TIKTOK MODE SWITCHING ====================

function switchTikTokMode(mode) {
    tkCurrentMode = mode;

    if (mode === 'url') {
        tkModeTabUrl.classList.add('active');
        tkModeTabProfile.classList.remove('active');
        tkUrlModeSection.classList.remove('hidden');
        tkProfileModeSection.classList.add('hidden');
    } else {
        tkModeTabUrl.classList.remove('active');
        tkModeTabProfile.classList.add('active');
        tkUrlModeSection.classList.add('hidden');
        tkProfileModeSection.classList.remove('hidden');
    }

    // Update ARIA
    tkModeTabUrl.setAttribute('aria-selected', mode === 'url');
    tkModeTabProfile.setAttribute('aria-selected', mode === 'profile');

    hideStatus();
    overallProgress.classList.add('hidden');
}

// ==================== SHARED UTILITIES ====================

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

function hideStatus() {
    statusMessage.classList.add('hidden');
}

// ==================== TOAST NOTIFICATIONS ====================

function showToast(message, type = 'info', duration = 4000) {
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;

    const icons = {
        success: '&#10003;',
        error: '&#10007;',
        info: '&#8505;'
    };

    toast.innerHTML = `
        <span class="toast__icon">${icons[type] || icons.info}</span>
        <span class="toast__message">${message}</span>
        <button class="toast__close" aria-label="Fechar">&times;</button>
    `;

    const closeBtn = toast.querySelector('.toast__close');
    closeBtn.addEventListener('click', () => removeToast(toast));

    toastContainer.appendChild(toast);

    // Auto remove
    if (duration > 0) {
        setTimeout(() => removeToast(toast), duration);
    }

    return toast;
}

function removeToast(toast) {
    if (!toast || !toast.parentNode) return;
    toast.classList.add('hiding');
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 300);
}

// ==================== COLLAPSIBLE FILTERS ====================

function toggleFilters() {
    const isExpanded = filtersToggle.getAttribute('aria-expanded') === 'true';

    filtersToggle.setAttribute('aria-expanded', !isExpanded);
    filtersToggle.classList.toggle('expanded', !isExpanded);
    filtersPanel.classList.toggle('expanded', !isExpanded);
    filtersPanel.setAttribute('aria-hidden', isExpanded);
}

function updateFilterBadge() {
    const count = countActiveFilters();
    filterCountBadge.textContent = count;
    filterCountBadge.classList.toggle('hidden', count === 0);
}

function countActiveFilters() {
    let count = 0;
    if (filterViewsMin.value) count++;
    if (filterViewsMax.value) count++;
    if (filterDurationMin.value) count++;
    if (filterDurationMax.value) count++;
    if (filterDateStart.value) count++;
    if (filterDateEnd.value) count++;
    return count;
}

function formatDuration(seconds) {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function formatViews(views) {
    if (!views) return '0';
    if (views >= 1000000) {
        return (views / 1000000).toFixed(1) + 'M';
    } else if (views >= 1000) {
        return (views / 1000).toFixed(1) + 'K';
    }
    return views.toString();
}

function formatDate(dateStr) {
    if (!dateStr || dateStr.length < 8) return '';
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    return `${day}/${month}/${year}`;
}

function updateOverallProgress(completed, total) {
    overallProgressText.textContent = `${completed}/${total}`;
    const percent = total > 0 ? (completed / total) * 100 : 0;
    overallProgressBar.style.width = `${percent}%`;
}

// ==================== URL MODE FUNCTIONS ====================

function getPlatformIcon(platform) {
    switch(platform) {
        case 'youtube': return '&#9658;';
        case 'tiktok': return '&#9834;';
        case 'instagram': return '&#128247;';
        default: return '&#128250;';
    }
}

function getPlatformLabel(platform) {
    switch(platform) {
        case 'youtube': return 'YouTube';
        case 'tiktok': return 'TikTok';
        case 'instagram': return 'Instagram';
        default: return 'Video';
    }
}

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
        const platformIcon = getPlatformIcon(video.platform);
        const platformLabel = getPlatformLabel(video.platform);
        item.innerHTML = `
            <img class="video-thumbnail" src="${video.thumbnail || ''}" alt="" onerror="this.style.display='none'">
            <div class="video-info">
                <div class="video-platform"><span class="platform-icon">${platformIcon}</span> ${platformLabel}</div>
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

function downloadVideo(index, showButtonState = true) {
    return new Promise((resolve, reject) => {
        const video = validatedVideos[index];
        if (!video || !video.valid) {
            resolve(false);
            return;
        }

        const quality = qualitySelect.value;
        const prefix = videoPrefixes[index] || '';

        const params = new URLSearchParams({
            url: video.url,
            quality: quality,
            prefix: prefix,
            title: video.title,
            views: video.views || 0
        });

        const item = document.getElementById(`video-${index}`);
        const btn = item.querySelector('.btn-download');

        if (showButtonState) {
            btn.innerHTML = '<span class="btn-icon">&#8987;</span> Baixando...';
            btn.disabled = true;
        }

        fetch(`/api/download-file?${params.toString()}`)
            .then(response => {
                if (!response.ok) throw new Error('Download failed');
                return response.blob();
            })
            .then(blob => {
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

    downloadAllBtn.disabled = true;
    downloadAllBtn.innerHTML = '<span class="btn-icon">&#8987;</span> Baixando...';
    validateBtn.disabled = true;
    urlInput.disabled = true;
    qualitySelect.disabled = true;

    overallProgress.classList.remove('hidden');
    updateOverallProgress(0, validIndices.length);

    let completedCount = 0;

    for (let i = 0; i < validIndices.length; i++) {
        const index = validIndices[i];
        showStatus(`Baixando video ${i + 1} de ${validIndices.length}...`, 'info');
        await downloadVideo(index, true);
        completedCount++;
        updateOverallProgress(completedCount, validIndices.length);

        if (i < validIndices.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    downloadAllBtn.disabled = false;
    downloadAllBtn.innerHTML = '<span class="btn-icon">&#11015;</span> Baixar Todos';
    validateBtn.disabled = false;
    urlInput.disabled = false;
    qualitySelect.disabled = false;

    showStatus(`${completedCount} download(s) concluido(s)!`, 'success');
}

async function validateUrls() {
    const text = urlInput.value.trim();

    if (!text) {
        showStatus('Cole pelo menos um link (YouTube, TikTok ou Instagram)', 'error');
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

// ==================== SEARCH MODE FUNCTIONS ====================

function setSearchType(type) {
    searchType = type;

    if (type === 'all') {
        if (searchTypeAll) searchTypeAll.classList.add('active');
        if (searchTypeKeyword) searchTypeKeyword.classList.remove('active');
        if (searchInput) {
            searchInput.disabled = true;
            searchInput.setAttribute('aria-disabled', 'true');
            searchInput.value = '';
        }
        if (searchBtn) searchBtn.innerHTML = '<span class="btn-icon">&#128269;</span> Carregar';
    } else {
        if (searchTypeAll) searchTypeAll.classList.remove('active');
        if (searchTypeKeyword) searchTypeKeyword.classList.add('active');
        if (searchInput) {
            searchInput.disabled = false;
            searchInput.setAttribute('aria-disabled', 'false');
            searchInput.focus();
        }
        if (searchBtn) searchBtn.innerHTML = '<span class="btn-icon">&#128269;</span> Buscar';
    }

    // Update ARIA
    updateSearchTypeAria(type);
}

// ==================== CONTENT TYPE FUNCTIONS ====================

function setContentType(type) {
    contentType = type;

    // Update tab buttons
    if (contentTypeVideos) contentTypeVideos.classList.toggle('active', type === 'videos');
    if (contentTypeShorts) contentTypeShorts.classList.toggle('active', type === 'shorts');
    if (contentTypeLives) contentTypeLives.classList.toggle('active', type === 'lives');

    // Update ARIA
    updateContentTypeAria(type);

    // Clear results when switching type
    searchResults = [];
    unfilteredResults = [];
    selectedVideos.clear();
    if (searchResultsContainer) searchResultsContainer.innerHTML = '';
    updateSelectionCount();
    disableSelectionButtons();

    // Show type-specific placeholder
    const typeLabels = {
        'videos': 'videos',
        'shorts': 'shorts',
        'lives': 'transmissoes ao vivo'
    };
    if (searchResultsContainer) searchResultsContainer.innerHTML = `<div class="no-results"><p>Clique em "Carregar" para buscar ${typeLabels[type]} do canal</p></div>`;
}

// ==================== FILTER FUNCTIONS ====================

function parseDurationInput(str) {
    // Convert "mm:ss" or "m:ss" to seconds
    if (!str || str.trim() === '') return null;

    const parts = str.trim().split(':');
    if (parts.length === 2) {
        const mins = parseInt(parts[0]) || 0;
        const secs = parseInt(parts[1]) || 0;
        return mins * 60 + secs;
    } else if (parts.length === 1) {
        // Assume it's minutes only
        return (parseInt(parts[0]) || 0) * 60;
    }
    return null;
}

function parseDateInput(dateStr) {
    // Convert date input (YYYY-MM-DD) to yt-dlp format (YYYYMMDD)
    if (!dateStr) return null;
    return dateStr.replace(/-/g, '');
}

function getFiltersFromInputs() {
    return {
        viewsMin: filterViewsMin.value ? parseInt(filterViewsMin.value) : null,
        viewsMax: filterViewsMax.value ? parseInt(filterViewsMax.value) : null,
        durationMin: parseDurationInput(filterDurationMin.value),
        durationMax: parseDurationInput(filterDurationMax.value),
        dateStart: parseDateInput(filterDateStart.value),
        dateEnd: parseDateInput(filterDateEnd.value)
    };
}

function applyFilters() {
    filters = getFiltersFromInputs();

    if (unfilteredResults.length === 0) {
        showStatus('Carregue os videos primeiro', 'error');
        return;
    }

    // Apply filters to unfiltered results
    searchResults = unfilteredResults.filter(video => {
        // Views filter
        if (filters.viewsMin !== null && (video.views || 0) < filters.viewsMin) return false;
        if (filters.viewsMax !== null && (video.views || 0) > filters.viewsMax) return false;

        // Duration filter
        if (filters.durationMin !== null && (video.duration || 0) < filters.durationMin) return false;
        if (filters.durationMax !== null && (video.duration || 0) > filters.durationMax) return false;

        // Date filter
        if (filters.dateStart !== null && (video.uploadDate || '') < filters.dateStart) return false;
        if (filters.dateEnd !== null && (video.uploadDate || '') > filters.dateEnd) return false;

        return true;
    });

    // Clear selection
    selectedVideos.clear();
    updateSelectionCount();

    // Recalculate TOP/BOTTOM 5 based on filtered results
    calculateTopBottom();

    // Re-sort and render
    sortSearchResults(currentSortField, currentSortOrder);

    // Update buttons state
    if (searchResults.length > 0) {
        enableSelectionButtons();
    } else {
        disableSelectionButtons();
    }

    // Show filter status
    const filteredCount = searchResults.length;
    const totalCount = unfilteredResults.length;
    if (filteredCount < totalCount) {
        showStatus(`Mostrando ${filteredCount} de ${totalCount} videos (filtros aplicados)`, 'info');
    } else {
        showStatus(`${filteredCount} videos`, 'success');
    }
}

function clearFilters() {
    // Clear input fields
    filterViewsMin.value = '';
    filterViewsMax.value = '';
    filterDurationMin.value = '';
    filterDurationMax.value = '';
    filterDateStart.value = '';
    filterDateEnd.value = '';

    // Reset filter state
    filters = {
        viewsMin: null,
        viewsMax: null,
        durationMin: null,
        durationMax: null,
        dateStart: null,
        dateEnd: null
    };

    // Restore unfiltered results
    if (unfilteredResults.length > 0) {
        searchResults = [...unfilteredResults];
        selectedVideos.clear();
        updateSelectionCount();
        calculateTopBottom();
        sortSearchResults(currentSortField, currentSortOrder);
        enableSelectionButtons();
        showStatus(`${searchResults.length} videos`, 'success');
    }
}

async function performSearch() {
    const query = searchInput ? searchInput.value.trim() : '';

    // DEBUG
    console.log('=== DEBUG performSearch ===');
    console.log('contentType:', contentType);
    console.log('searchType:', searchType);
    console.log('query:', query);

    // For keyword search, require a query
    if (searchType === 'keyword' && !query) {
        showStatus('Digite uma palavra-chave para buscar', 'error');
        return;
    }

    if (searchBtn) {
        searchBtn.disabled = true;
        searchBtn.innerHTML = '<span class="btn-icon">&#8987;</span> Carregando...';
    }

    const typeLabels = {
        'videos': 'videos',
        'shorts': 'shorts',
        'lives': 'transmissoes'
    };
    const typeLabel = typeLabels[contentType];

    const loadingMsg = searchType === 'all'
        ? `Carregando ${typeLabel} do canal nextleveldj1...`
        : `Buscando "${query}" nos ${typeLabel} do canal...`;

    console.log('searchResultsContainer:', searchResultsContainer);
    if (!searchResultsContainer) {
        console.error('searchResultsContainer is null!');
        showStatus('Erro: container de resultados nao encontrado', 'error');
        return;
    }
    searchResultsContainer.innerHTML = `<div class="loading">${loadingMsg}<br><small>Isso pode levar ate 2 minutos...</small></div>`;
    selectedVideos.clear();
    updateSelectionCount();
    disableSelectionButtons();

    try {
        let response;
        let endpoint;

        if (searchType === 'all') {
            // List content by type
            const endpoints = {
                'videos': '/api/channel-videos',
                'shorts': '/api/channel-shorts',
                'lives': '/api/channel-lives'
            };
            endpoint = endpoints[contentType];

            response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ limit: 500 })
            });
        } else {
            // Search by keyword - fetch all from selected type and filter locally
            const endpoints = {
                'videos': '/api/channel-videos',
                'shorts': '/api/channel-shorts',
                'lives': '/api/channel-lives'
            };
            endpoint = endpoints[contentType];

            response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ limit: 500 })
            });
        }

        console.log('endpoint used:', endpoint);

        let data = await response.json();

        // Check if response is OK or has error
        if (!response.ok || data.error) {
            throw new Error(data.error || 'Falha ao carregar conteudo');
        }

        // Check if data.videos exists
        if (!data.videos) {
            throw new Error('Resposta invalida do servidor');
        }

        console.log('data.videos.length BEFORE filter:', data.videos.length);

        // If keyword search, filter by title
        if (searchType === 'keyword' && query) {
            const queryLower = query.toLowerCase();
            console.log('Filtering by:', queryLower);
            data.videos = data.videos.filter(v =>
                v.title.toLowerCase().includes(queryLower)
            );
            data.count = data.videos.length;
            console.log('data.videos.length AFTER filter:', data.videos.length);
        }

        // Store both filtered and unfiltered results
        unfilteredResults = data.videos;
        searchResults = [...unfilteredResults];

        if (searchResults.length === 0) {
            const msg = searchType === 'all'
                ? `Nenhum ${typeLabel} encontrado no canal`
                : `Nenhum video encontrado para "${query}"`;
            searchResultsContainer.innerHTML = `<div class="no-results"><p>${msg}</p><p class="hint">Tente outros filtros</p></div>`;
            showStatus('Nenhum resultado encontrado', 'error');
            return;
        }

        // Apply any existing filters
        if (hasActiveFilters()) {
            applyFilters();
        } else {
            // Calculate TOP 5 and BOTTOM 5 by views
            calculateTopBottom();

            // Sort by views (highest first) by default
            sortSearchResults('views', 'desc');

            enableSelectionButtons();
        }

        const successMsg = searchType === 'all'
            ? `${data.count} ${typeLabel} carregados do canal`
            : `${data.count} videos encontrados para "${query}"`;
        showStatus(successMsg, 'success');

    } catch (error) {
        showStatus('Erro: ' + error.message, 'error');
        if (searchResultsContainer) {
            searchResultsContainer.innerHTML = `<div class="no-results"><p>Erro</p><p class="hint">${error.message}</p></div>`;
        }
    } finally {
        if (searchBtn) {
            searchBtn.disabled = false;
            searchBtn.innerHTML = searchType === 'all'
                ? '<span class="btn-icon">&#128269;</span> Carregar'
                : '<span class="btn-icon">&#128269;</span> Buscar';
        }
    }
}

function hasActiveFilters() {
    return filterViewsMin.value || filterViewsMax.value ||
           filterDurationMin.value || filterDurationMax.value ||
           filterDateStart.value || filterDateEnd.value;
}

function calculateTopBottom() {
    // Sort a copy by views to find top/bottom
    const sortedByViews = [...searchResults].sort((a, b) => (b.views || 0) - (a.views || 0));
    top5Ids = new Set(sortedByViews.slice(0, 5).map(v => v.id));
    bottom5Ids = new Set(sortedByViews.slice(-5).map(v => v.id));
}

function sortSearchResults(field, order) {
    currentSortField = field;
    currentSortOrder = order;

    searchResults.sort((a, b) => {
        let valueA, valueB;

        switch(field) {
            case 'views':
                valueA = a.views || 0;
                valueB = b.views || 0;
                break;
            case 'duration':
                valueA = a.duration || 0;
                valueB = b.duration || 0;
                break;
            case 'date':
                valueA = a.uploadDate || '';
                valueB = b.uploadDate || '';
                break;
            default:
                valueA = a.views || 0;
                valueB = b.views || 0;
        }

        if (order === 'asc') {
            return valueA > valueB ? 1 : -1;
        } else {
            return valueA < valueB ? 1 : -1;
        }
    });

    renderSearchResults();
}

function renderSearchResults() {
    console.log('=== renderSearchResults ===');
    console.log('searchResults.length:', searchResults.length);
    console.log('searchResultsContainer:', searchResultsContainer);

    if (!searchResultsContainer) {
        console.error('searchResultsContainer is null!');
        return;
    }

    searchResultsContainer.innerHTML = '';

    if (searchResults.length === 0) {
        console.log('No results to render');
        return;
    }

    searchResults.forEach((video, index) => {
        const item = createSearchResultItem(video, index);
        searchResultsContainer.appendChild(item);
    });

    console.log('Rendered', searchResults.length, 'items');
    updateDownloadSelectedState();
}

function createSearchResultItem(video, index) {
    const item = document.createElement('div');
    item.className = 'search-result-item';
    item.id = `search-${index}`;

    const isTop5 = top5Ids.has(video.id);
    const isBottom5 = bottom5Ids.has(video.id);
    const isSelected = selectedVideos.has(index);

    if (isSelected) {
        item.classList.add('selected');
    }

    // Get ranking position
    let badgeHtml = '';
    if (isTop5) {
        const sortedByViews = [...searchResults].sort((a, b) => (b.views || 0) - (a.views || 0));
        const rank = sortedByViews.findIndex(v => v.id === video.id) + 1;
        badgeHtml = `<span class="badge badge-top">TOP ${rank}</span>`;
    } else if (isBottom5) {
        const sortedByViews = [...searchResults].sort((a, b) => (b.views || 0) - (a.views || 0));
        const rank = searchResults.length - sortedByViews.findIndex(v => v.id === video.id);
        badgeHtml = `<span class="badge badge-bottom">BTM ${rank}</span>`;
    }

    const dateFormatted = formatDate(video.uploadDate);

    item.innerHTML = `
        <input type="checkbox" class="result-checkbox"
               data-index="${index}"
               ${isSelected ? 'checked' : ''}
               onchange="toggleVideoSelection(${index})">
        <img class="result-thumbnail"
             src="${video.thumbnail}"
             alt=""
             onerror="this.style.background='var(--bg-primary)'">
        <div class="result-info">
            <div class="result-title-row">
                ${badgeHtml}
                <span class="result-title" title="${video.title}">${video.title}</span>
            </div>
            <div class="result-meta">
                <span class="result-channel">${video.channel}</span>
                <span class="result-separator">|</span>
                <span class="result-views">${formatViews(video.views)} views</span>
                <span class="result-separator">|</span>
                <span class="result-duration">${formatDuration(video.duration)}</span>
                ${dateFormatted ? `<span class="result-separator">|</span><span class="result-date">${dateFormatted}</span>` : ''}
            </div>
        </div>
    `;

    // Click anywhere to toggle selection (except checkbox)
    item.addEventListener('click', (e) => {
        if (e.target.type !== 'checkbox') {
            toggleVideoSelection(index);
        }
    });

    return item;
}

function toggleVideoSelection(index) {
    if (selectedVideos.has(index)) {
        selectedVideos.delete(index);
    } else {
        selectedVideos.add(index);
    }

    const item = document.getElementById(`search-${index}`);
    const checkbox = item.querySelector('.result-checkbox');

    if (selectedVideos.has(index)) {
        item.classList.add('selected');
        checkbox.checked = true;
    } else {
        item.classList.remove('selected');
        checkbox.checked = false;
    }

    updateSelectionCount();
    updateDownloadSelectedState();
}

function updateSelectionCount() {
    const total = searchResults.length;
    const selected = selectedVideos.size;
    if (selectionCount) {
        if (total > 0) {
            selectionCount.textContent = `${total} videos | ${selected} selecionado(s)`;
        } else {
            selectionCount.textContent = `${selected} selecionado(s)`;
        }
    }
}

function updateDownloadSelectedState() {
    if (downloadSelectedBtn) downloadSelectedBtn.disabled = selectedVideos.size === 0;
    if (clearSelectionBtn) clearSelectionBtn.disabled = selectedVideos.size === 0;
}

function enableSelectionButtons() {
    if (selectTop5Btn) selectTop5Btn.disabled = false;
    if (selectBottom5Btn) selectBottom5Btn.disabled = false;
}

function disableSelectionButtons() {
    if (selectTop5Btn) selectTop5Btn.disabled = true;
    if (selectBottom5Btn) selectBottom5Btn.disabled = true;
    if (clearSelectionBtn) clearSelectionBtn.disabled = true;
    if (downloadSelectedBtn) downloadSelectedBtn.disabled = true;
}

function selectTop5() {
    // Find indices of top 5 videos in current results array
    const sortedByViews = [...searchResults]
        .map((v, i) => ({ ...v, originalIndex: i }))
        .sort((a, b) => (b.views || 0) - (a.views || 0));

    const top5Indices = sortedByViews.slice(0, 5).map(v => v.originalIndex);

    top5Indices.forEach(index => {
        if (!selectedVideos.has(index)) {
            selectedVideos.add(index);
            const item = document.getElementById(`search-${index}`);
            if (item) {
                item.classList.add('selected');
                const checkbox = item.querySelector('.result-checkbox');
                if (checkbox) checkbox.checked = true;
            }
        }
    });

    updateSelectionCount();
    updateDownloadSelectedState();
}

function selectBottom5() {
    // Find indices of bottom 5 videos in current results array
    const sortedByViews = [...searchResults]
        .map((v, i) => ({ ...v, originalIndex: i }))
        .sort((a, b) => (b.views || 0) - (a.views || 0));

    const bottom5Indices = sortedByViews.slice(-5).map(v => v.originalIndex);

    bottom5Indices.forEach(index => {
        if (!selectedVideos.has(index)) {
            selectedVideos.add(index);
            const item = document.getElementById(`search-${index}`);
            if (item) {
                item.classList.add('selected');
                const checkbox = item.querySelector('.result-checkbox');
                if (checkbox) checkbox.checked = true;
            }
        }
    });

    updateSelectionCount();
    updateDownloadSelectedState();
}

function clearSelection() {
    selectedVideos.forEach(index => {
        const item = document.getElementById(`search-${index}`);
        if (item) {
            item.classList.remove('selected');
            const checkbox = item.querySelector('.result-checkbox');
            if (checkbox) checkbox.checked = false;
        }
    });
    selectedVideos.clear();
    updateSelectionCount();
    updateDownloadSelectedState();
}

async function downloadSelectedVideos() {
    if (selectedVideos.size === 0) {
        showStatus('Selecione pelo menos um video', 'error');
        return;
    }

    const indices = Array.from(selectedVideos);

    // Disable controls
    downloadSelectedBtn.disabled = true;
    downloadSelectedBtn.innerHTML = '<span class="btn-icon">&#8987;</span> Baixando...';
    searchBtn.disabled = true;
    selectTop5Btn.disabled = true;
    selectBottom5Btn.disabled = true;
    clearSelectionBtn.disabled = true;
    searchQualitySelect.disabled = true;
    sortBySelect.disabled = true;

    // Show progress
    overallProgress.classList.remove('hidden');
    updateOverallProgress(0, indices.length);

    let completedCount = 0;

    // Download sequentially
    for (let i = 0; i < indices.length; i++) {
        const index = indices[i];
        const video = searchResults[index];

        showStatus(`Baixando video ${i + 1} de ${indices.length}: ${video.title.substring(0, 50)}...`, 'info');

        // Mark item as downloading
        const item = document.getElementById(`search-${index}`);
        item.classList.add('downloading');

        try {
            await downloadSearchVideo(video);
            item.classList.remove('downloading');
            item.classList.add('downloaded');
        } catch (error) {
            console.error('Download failed:', error);
            item.classList.remove('downloading');
            item.classList.add('download-error');
        }

        completedCount++;
        updateOverallProgress(completedCount, indices.length);

        // Delay between downloads
        if (i < indices.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    // Re-enable controls
    downloadSelectedBtn.disabled = false;
    downloadSelectedBtn.innerHTML = '<span class="btn-icon">&#11015;</span> Baixar Selecionados';
    searchBtn.disabled = false;
    selectTop5Btn.disabled = false;
    selectBottom5Btn.disabled = false;
    clearSelectionBtn.disabled = selectedVideos.size === 0;
    searchQualitySelect.disabled = false;
    sortBySelect.disabled = false;

    showStatus(`${completedCount} download(s) concluido(s)!`, 'success');
}

function downloadSearchVideo(video) {
    return new Promise((resolve, reject) => {
        const quality = searchQualitySelect.value;

        const params = new URLSearchParams({
            url: video.url,
            quality: quality,
            prefix: '',
            title: video.title,
            views: video.views || 0
        });

        fetch(`/api/download-file?${params.toString()}`)
            .then(response => {
                if (!response.ok) throw new Error('Download failed');
                return response.blob();
            })
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                const ext = quality === 'audio' ? 'mp3' : 'mp4';
                const viewsFormatted = formatViews(video.views);
                a.download = `${viewsFormatted} - ${video.title}.${ext}`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove();
                resolve(true);
            })
            .catch(error => {
                reject(error);
            });
    });
}

// ==================== EVENT LISTENERS ====================

// Mode switching
if (modeTabUrl) modeTabUrl.addEventListener('click', () => switchMode('url'));
if (modeTabSearch) modeTabSearch.addEventListener('click', () => switchMode('search'));

// URL Mode
if (validateBtn) validateBtn.addEventListener('click', validateUrls);
if (downloadAllBtn) downloadAllBtn.addEventListener('click', downloadAllVideos);
if (openFolderBtn) openFolderBtn.addEventListener('click', openFolder);

if (urlInput) urlInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        e.preventDefault();
        validateUrls();
    }
});

// Search Mode
if (searchTypeAll) searchTypeAll.addEventListener('click', () => setSearchType('all'));
if (searchTypeKeyword) searchTypeKeyword.addEventListener('click', () => setSearchType('keyword'));
if (searchBtn) searchBtn.addEventListener('click', performSearch);
if (selectTop5Btn) selectTop5Btn.addEventListener('click', selectTop5);
if (selectBottom5Btn) selectBottom5Btn.addEventListener('click', selectBottom5);
if (clearSelectionBtn) clearSelectionBtn.addEventListener('click', clearSelection);
if (downloadSelectedBtn) downloadSelectedBtn.addEventListener('click', downloadSelectedVideos);

if (sortBySelect) {
    sortBySelect.addEventListener('change', (e) => {
        const [field, order] = e.target.value.split('-');
        sortSearchResults(field, order);
    });
}

if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        }
    });
}

// Content Type Tabs
if (contentTypeVideos) contentTypeVideos.addEventListener('click', () => setContentType('videos'));
if (contentTypeShorts) contentTypeShorts.addEventListener('click', () => setContentType('shorts'));
if (contentTypeLives) contentTypeLives.addEventListener('click', () => setContentType('lives'));

// Filters - Collapsible Toggle
if (filtersToggle) {
    filtersToggle.addEventListener('click', toggleFilters);
    filtersToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleFilters();
        }
    });
}

// Filters - Apply and Clear
if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener('click', () => {
        applyFilters();
        updateFilterBadge();
    });
}

if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', () => {
        clearFilters();
        updateFilterBadge();
    });
}

// Duration input formatting (auto-add colon)
if (filterDurationMin) filterDurationMin.addEventListener('input', formatDurationInput);
if (filterDurationMax) filterDurationMax.addEventListener('input', formatDurationInput);

function formatDurationInput(e) {
    let value = e.target.value.replace(/[^0-9:]/g, '');

    // If user types 3+ digits without colon, insert it
    if (value.length >= 3 && !value.includes(':')) {
        value = value.slice(0, -2) + ':' + value.slice(-2);
    }

    e.target.value = value;
}

// ==================== ARIA & ACCESSIBILITY ====================

// Update ARIA attributes on mode switch
function updateModeTabsAria(activeMode) {
    modeTabUrl.setAttribute('aria-selected', activeMode === 'url');
    modeTabSearch.setAttribute('aria-selected', activeMode === 'search');
}

// Update content type tabs ARIA
function updateContentTypeAria(activeType) {
    if (contentTypeVideos) contentTypeVideos.setAttribute('aria-selected', activeType === 'videos');
    if (contentTypeShorts) contentTypeShorts.setAttribute('aria-selected', activeType === 'shorts');
    if (contentTypeLives) contentTypeLives.setAttribute('aria-selected', activeType === 'lives');
}

// Update search type buttons ARIA
function updateSearchTypeAria(activeType) {
    if (searchTypeAll) searchTypeAll.setAttribute('aria-pressed', activeType === 'all');
    if (searchTypeKeyword) searchTypeKeyword.setAttribute('aria-pressed', activeType === 'keyword');
}

// ==================== INSTAGRAM FUNCTIONS ====================

function createIgVideoItem(video, index) {
    const item = document.createElement('div');
    item.className = 'video-item';
    item.id = `ig-video-${index}`;
    item.setAttribute('data-platform', 'instagram');

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
                <div class="video-platform"><span class="platform-icon">&#128247;</span> Instagram</div>
                <div class="video-title" title="${video.title}">${video.title}</div>
                <div class="video-channel">${video.channel} ${video.duration ? '- ' + formatDuration(video.duration) : ''}</div>
                <div class="video-views">${viewsFormatted} views</div>
            </div>
            <button class="btn btn-download" onclick="downloadIgVideo(${index})">
                <span class="btn-icon">&#11015;</span> Baixar
            </button>
        `;
    }

    return item;
}

async function validateIgUrls() {
    const text = igUrlInput.value.trim();

    if (!text) {
        showStatus('Cole pelo menos um link do Instagram', 'error');
        return;
    }

    const urls = text.split('\n')
        .map(url => url.trim())
        .filter(url => url.length > 0);

    if (urls.length === 0) {
        showStatus('Nenhum link valido encontrado', 'error');
        return;
    }

    igValidateBtn.disabled = true;
    igValidateBtn.innerHTML = '<span class="btn-icon">&#8987;</span> Verificando...';
    igVideoList.innerHTML = '';
    igDownloadAllBtn.disabled = true;
    igVideoPrefixes = {};
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

        igValidatedVideos = data.videos;

        igValidatedVideos.forEach((video, index) => {
            const item = createIgVideoItem(video, index);
            igVideoList.appendChild(item);
        });

        const validCount = igValidatedVideos.filter(v => v.valid).length;

        if (validCount === 0) {
            showStatus('Nenhum video valido para download', 'error');
        } else {
            showStatus(`${validCount} video(s) pronto(s) para download`, 'success');
            igDownloadAllBtn.disabled = false;
        }

    } catch (error) {
        showStatus('Erro ao verificar links: ' + error.message, 'error');
    } finally {
        igValidateBtn.disabled = false;
        igValidateBtn.innerHTML = '<span class="btn-icon">&#128269;</span> Verificar Links';
    }
}

function downloadIgVideo(index) {
    return new Promise((resolve, reject) => {
        const video = igValidatedVideos[index];
        if (!video || !video.valid) {
            resolve(false);
            return;
        }

        const quality = igQualitySelect.value;

        const params = new URLSearchParams({
            url: video.url,
            quality: quality,
            prefix: '',
            title: video.title,
            views: video.views || 0
        });

        const item = document.getElementById(`ig-video-${index}`);
        const btn = item.querySelector('.btn-download');

        btn.innerHTML = '<span class="btn-icon">&#8987;</span> Baixando...';
        btn.disabled = true;

        fetch(`/api/download-file?${params.toString()}`)
            .then(response => {
                if (!response.ok) throw new Error('Download failed');
                return response.blob();
            })
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                const ext = quality === 'audio' ? 'mp3' : 'mp4';
                const viewsFormatted = formatViews(video.views);
                a.download = `${viewsFormatted} - ${video.title}.${ext}`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove();

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

async function downloadAllIgVideos() {
    const validIndices = [];
    igValidatedVideos.forEach((video, index) => {
        if (video.valid) {
            validIndices.push(index);
        }
    });

    if (validIndices.length === 0) {
        showStatus('Nenhum video valido para download', 'error');
        return;
    }

    igDownloadAllBtn.disabled = true;
    igDownloadAllBtn.innerHTML = '<span class="btn-icon">&#8987;</span> Baixando...';
    igValidateBtn.disabled = true;
    igUrlInput.disabled = true;
    igQualitySelect.disabled = true;

    overallProgress.classList.remove('hidden');
    updateOverallProgress(0, validIndices.length);

    let completedCount = 0;

    for (let i = 0; i < validIndices.length; i++) {
        const index = validIndices[i];
        showStatus(`Baixando video ${i + 1} de ${validIndices.length}...`, 'info');
        await downloadIgVideo(index);
        completedCount++;
        updateOverallProgress(completedCount, validIndices.length);

        if (i < validIndices.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    igDownloadAllBtn.disabled = false;
    igDownloadAllBtn.innerHTML = '<span class="btn-icon">&#11015;</span> Baixar Todos';
    igValidateBtn.disabled = false;
    igUrlInput.disabled = false;
    igQualitySelect.disabled = false;

    showStatus(`${completedCount} download(s) concluido(s)!`, 'success');
}

// ==================== INSTAGRAM PROFILE FUNCTIONS ====================

async function loadIgProfile() {
    const username = INSTAGRAM_USERNAME;

    igLoadProfileBtn.disabled = true;
    const igLoadBtnText = document.getElementById('igLoadBtnText');
    if (igLoadBtnText) igLoadBtnText.textContent = 'Carregando...';

    const typeLabel = igContentType === 'posts' ? 'posts' : 'reels';
    igProfileResults.innerHTML = `<div class="loading">Carregando ${typeLabel} de @${username}...<br><small>Isso pode levar alguns minutos...</small></div>`;
    igSelectedVideos.clear();
    updateIgSelectionCount();
    disableIgSelectionButtons();

    try {
        const response = await fetch('/api/instagram-profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                contentType: igContentType,
                limit: 50
            })
        });

        const data = await response.json();

        if (!response.ok || data.error) {
            throw new Error(data.error || 'Falha ao carregar perfil');
        }

        igUnfilteredResults = data.videos || [];
        igProfileResults_data = [...igUnfilteredResults];

        if (igProfileResults_data.length === 0) {
            igProfileResults.innerHTML = `<div class="no-results"><p>Nenhum ${typeLabel} encontrado para @${username}</p></div>`;
            showStatus('Nenhum conteudo encontrado', 'error');
            return;
        }

        // Calculate TOP/BOTTOM 5
        calculateIgTopBottom();

        // Sort by views and render
        sortIgResults('views', 'desc');

        enableIgSelectionButtons();
        showStatus(`${igProfileResults_data.length} ${typeLabel} carregados de @${username}`, 'success');

    } catch (error) {
        showStatus('Erro: ' + error.message, 'error');
        igProfileResults.innerHTML = `<div class="no-results"><p>Erro</p><p class="hint">${error.message}</p></div>`;
    } finally {
        igLoadProfileBtn.disabled = false;
        const igLoadBtnText = document.getElementById('igLoadBtnText');
        if (igLoadBtnText) igLoadBtnText.textContent = igContentType === 'posts' ? 'Carregar Posts' : 'Carregar Reels';
    }
}

function calculateIgTopBottom() {
    const sortedByViews = [...igProfileResults_data].sort((a, b) => (b.views || 0) - (a.views || 0));
    igTop5Ids = new Set(sortedByViews.slice(0, 5).map(v => v.id));
    igBottom5Ids = new Set(sortedByViews.slice(-5).map(v => v.id));
}

function sortIgResults(field, order) {
    igCurrentSortField = field;
    igCurrentSortOrder = order;

    igProfileResults_data.sort((a, b) => {
        let valueA, valueB;

        switch(field) {
            case 'views':
                valueA = a.views || 0;
                valueB = b.views || 0;
                break;
            case 'date':
                valueA = a.uploadDate || '';
                valueB = b.uploadDate || '';
                break;
            default:
                valueA = a.views || 0;
                valueB = b.views || 0;
        }

        if (order === 'asc') {
            return valueA > valueB ? 1 : -1;
        } else {
            return valueA < valueB ? 1 : -1;
        }
    });

    renderIgResults();
}

function renderIgResults() {
    igProfileResults.innerHTML = '';

    if (igProfileResults_data.length === 0) return;

    igProfileResults_data.forEach((video, index) => {
        const item = createIgResultItem(video, index);
        igProfileResults.appendChild(item);
    });

    updateIgDownloadSelectedState();
}

function createIgResultItem(video, index) {
    const item = document.createElement('div');
    item.className = 'search-result-item';
    item.id = `ig-search-${index}`;

    const isTop5 = igTop5Ids.has(video.id);
    const isBottom5 = igBottom5Ids.has(video.id);
    const isSelected = igSelectedVideos.has(index);

    if (isSelected) item.classList.add('selected');

    let badgeHtml = '';
    if (isTop5) {
        const sortedByViews = [...igProfileResults_data].sort((a, b) => (b.views || 0) - (a.views || 0));
        const rank = sortedByViews.findIndex(v => v.id === video.id) + 1;
        badgeHtml = `<span class="badge badge-top">TOP ${rank}</span>`;
    } else if (isBottom5) {
        const sortedByViews = [...igProfileResults_data].sort((a, b) => (b.views || 0) - (a.views || 0));
        const rank = igProfileResults_data.length - sortedByViews.findIndex(v => v.id === video.id);
        badgeHtml = `<span class="badge badge-bottom">BTM ${rank}</span>`;
    }

    const dateFormatted = formatDate(video.uploadDate);

    item.innerHTML = `
        <input type="checkbox" class="result-checkbox"
               data-index="${index}"
               ${isSelected ? 'checked' : ''}
               onchange="toggleIgVideoSelection(${index})">
        <img class="result-thumbnail"
             src="${video.thumbnail}"
             alt=""
             onerror="this.style.background='var(--bg-primary)'">
        <div class="result-info">
            <div class="result-title-row">
                ${badgeHtml}
                <span class="result-title" title="${video.title}">${video.title}</span>
            </div>
            <div class="result-meta">
                <span class="result-channel">${video.channel || ''}</span>
                <span class="result-separator">|</span>
                <span class="result-views">${formatViews(video.views)} views</span>
                ${video.duration ? `<span class="result-separator">|</span><span class="result-duration">${formatDuration(video.duration)}</span>` : ''}
                ${dateFormatted ? `<span class="result-separator">|</span><span class="result-date">${dateFormatted}</span>` : ''}
            </div>
        </div>
    `;

    item.addEventListener('click', (e) => {
        if (e.target.type !== 'checkbox') {
            toggleIgVideoSelection(index);
        }
    });

    return item;
}

function toggleIgVideoSelection(index) {
    if (igSelectedVideos.has(index)) {
        igSelectedVideos.delete(index);
    } else {
        igSelectedVideos.add(index);
    }

    const item = document.getElementById(`ig-search-${index}`);
    const checkbox = item.querySelector('.result-checkbox');

    if (igSelectedVideos.has(index)) {
        item.classList.add('selected');
        checkbox.checked = true;
    } else {
        item.classList.remove('selected');
        checkbox.checked = false;
    }

    updateIgSelectionCount();
    updateIgDownloadSelectedState();
}

function updateIgSelectionCount() {
    if (igSelectionCount) {
        igSelectionCount.textContent = `${igSelectedVideos.size} selecionado(s)`;
    }
}

function updateIgDownloadSelectedState() {
    if (igDownloadSelectedBtn) igDownloadSelectedBtn.disabled = igSelectedVideos.size === 0;
    if (igClearSelectionBtn) igClearSelectionBtn.disabled = igSelectedVideos.size === 0;
}

function enableIgSelectionButtons() {
    if (igSelectTop5Btn) igSelectTop5Btn.disabled = false;
    if (igSelectBottom5Btn) igSelectBottom5Btn.disabled = false;
}

function disableIgSelectionButtons() {
    if (igSelectTop5Btn) igSelectTop5Btn.disabled = true;
    if (igSelectBottom5Btn) igSelectBottom5Btn.disabled = true;
    if (igClearSelectionBtn) igClearSelectionBtn.disabled = true;
    if (igDownloadSelectedBtn) igDownloadSelectedBtn.disabled = true;
}

function selectIgTop5() {
    const sortedByViews = [...igProfileResults_data]
        .map((v, i) => ({ ...v, originalIndex: i }))
        .sort((a, b) => (b.views || 0) - (a.views || 0));

    const top5Indices = sortedByViews.slice(0, 5).map(v => v.originalIndex);

    top5Indices.forEach(index => {
        if (!igSelectedVideos.has(index)) {
            igSelectedVideos.add(index);
            const item = document.getElementById(`ig-search-${index}`);
            if (item) {
                item.classList.add('selected');
                const checkbox = item.querySelector('.result-checkbox');
                if (checkbox) checkbox.checked = true;
            }
        }
    });

    updateIgSelectionCount();
    updateIgDownloadSelectedState();
}

function selectIgBottom5() {
    const sortedByViews = [...igProfileResults_data]
        .map((v, i) => ({ ...v, originalIndex: i }))
        .sort((a, b) => (b.views || 0) - (a.views || 0));

    const bottom5Indices = sortedByViews.slice(-5).map(v => v.originalIndex);

    bottom5Indices.forEach(index => {
        if (!igSelectedVideos.has(index)) {
            igSelectedVideos.add(index);
            const item = document.getElementById(`ig-search-${index}`);
            if (item) {
                item.classList.add('selected');
                const checkbox = item.querySelector('.result-checkbox');
                if (checkbox) checkbox.checked = true;
            }
        }
    });

    updateIgSelectionCount();
    updateIgDownloadSelectedState();
}

function clearIgSelection() {
    igSelectedVideos.forEach(index => {
        const item = document.getElementById(`ig-search-${index}`);
        if (item) {
            item.classList.remove('selected');
            const checkbox = item.querySelector('.result-checkbox');
            if (checkbox) checkbox.checked = false;
        }
    });
    igSelectedVideos.clear();
    updateIgSelectionCount();
    updateIgDownloadSelectedState();
}

async function downloadIgSelectedVideos() {
    if (igSelectedVideos.size === 0) {
        showStatus('Selecione pelo menos um video', 'error');
        return;
    }

    const indices = Array.from(igSelectedVideos);

    igDownloadSelectedBtn.disabled = true;
    igDownloadSelectedBtn.innerHTML = '<span class="btn-icon">&#8987;</span> Baixando...';
    igLoadProfileBtn.disabled = true;
    igSelectTop5Btn.disabled = true;
    igSelectBottom5Btn.disabled = true;
    igClearSelectionBtn.disabled = true;

    overallProgress.classList.remove('hidden');
    updateOverallProgress(0, indices.length);

    let completedCount = 0;

    for (let i = 0; i < indices.length; i++) {
        const index = indices[i];
        const video = igProfileResults_data[index];

        showStatus(`Baixando ${i + 1} de ${indices.length}: ${video.title.substring(0, 50)}...`, 'info');

        const item = document.getElementById(`ig-search-${index}`);
        item.classList.add('downloading');

        try {
            await downloadIgProfileVideo(video);
            item.classList.remove('downloading');
            item.classList.add('downloaded');
        } catch (error) {
            console.error('Download failed:', error);
            item.classList.remove('downloading');
            item.classList.add('download-error');
        }

        completedCount++;
        updateOverallProgress(completedCount, indices.length);

        if (i < indices.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    igDownloadSelectedBtn.disabled = false;
    igDownloadSelectedBtn.innerHTML = '<span class="btn-icon">&#11015;</span> Baixar Selecionados';
    igLoadProfileBtn.disabled = false;
    igSelectTop5Btn.disabled = false;
    igSelectBottom5Btn.disabled = false;
    igClearSelectionBtn.disabled = igSelectedVideos.size === 0;

    showStatus(`${completedCount} download(s) concluido(s)!`, 'success');
}

function downloadIgProfileVideo(video) {
    return new Promise((resolve, reject) => {
        const quality = igProfileQualitySelect ? igProfileQualitySelect.value : 'best';

        const params = new URLSearchParams({
            url: video.url,
            quality: quality,
            prefix: '',
            title: video.title || 'Instagram Post',
            views: video.views || 0
        });

        fetch(`/api/download-file?${params.toString()}`)
            .then(response => {
                if (!response.ok) throw new Error('Download failed');
                return response.blob();
            })
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                const ext = quality === 'audio' ? 'mp3' : 'mp4';
                const viewsFormatted = formatViews(video.views);
                a.download = `${viewsFormatted} - ${video.title || 'Instagram Post'}.${ext}`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove();
                resolve(true);
            })
            .catch(error => {
                reject(error);
            });
    });
}

// ==================== TIKTOK FUNCTIONS ====================

function createTkVideoItem(video, index) {
    const item = document.createElement('div');
    item.className = 'video-item';
    item.id = `tk-video-${index}`;
    item.setAttribute('data-platform', 'tiktok');

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
                <div class="video-platform"><span class="platform-icon">&#127926;</span> TikTok</div>
                <div class="video-title" title="${video.title}">${video.title}</div>
                <div class="video-channel">${video.channel} ${video.duration ? '- ' + formatDuration(video.duration) : ''}</div>
                <div class="video-views">${viewsFormatted} views</div>
            </div>
            <button class="btn btn-download" onclick="downloadTkVideo(${index})">
                <span class="btn-icon">&#11015;</span> Baixar
            </button>
        `;
    }

    return item;
}

async function validateTkUrls() {
    const text = tkUrlInput.value.trim();

    if (!text) {
        showStatus('Cole pelo menos um link do TikTok', 'error');
        return;
    }

    const urls = text.split('\n')
        .map(url => url.trim())
        .filter(url => url.length > 0);

    if (urls.length === 0) {
        showStatus('Nenhum link valido encontrado', 'error');
        return;
    }

    tkValidateBtn.disabled = true;
    tkValidateBtn.innerHTML = '<span class="btn-icon">&#8987;</span> Verificando...';
    tkVideoList.innerHTML = '';
    tkDownloadAllBtn.disabled = true;
    tkVideoPrefixes = {};
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

        tkValidatedVideos = data.videos;

        tkValidatedVideos.forEach((video, index) => {
            const item = createTkVideoItem(video, index);
            tkVideoList.appendChild(item);
        });

        const validCount = tkValidatedVideos.filter(v => v.valid).length;

        if (validCount === 0) {
            showStatus('Nenhum video valido para download', 'error');
        } else {
            showStatus(`${validCount} video(s) pronto(s) para download`, 'success');
            tkDownloadAllBtn.disabled = false;
        }

    } catch (error) {
        showStatus('Erro ao verificar links: ' + error.message, 'error');
    } finally {
        tkValidateBtn.disabled = false;
        tkValidateBtn.innerHTML = '<span class="btn-icon">&#128269;</span> Verificar Links';
    }
}

function downloadTkVideo(index) {
    return new Promise((resolve, reject) => {
        const video = tkValidatedVideos[index];
        if (!video || !video.valid) {
            resolve(false);
            return;
        }

        const quality = tkQualitySelect.value;

        const params = new URLSearchParams({
            url: video.url,
            quality: quality,
            prefix: '',
            title: video.title,
            views: video.views || 0
        });

        const item = document.getElementById(`tk-video-${index}`);
        const btn = item.querySelector('.btn-download');

        btn.innerHTML = '<span class="btn-icon">&#8987;</span> Baixando...';
        btn.disabled = true;

        fetch(`/api/download-file?${params.toString()}`)
            .then(response => {
                if (!response.ok) throw new Error('Download failed');
                return response.blob();
            })
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                const ext = quality === 'audio' ? 'mp3' : 'mp4';
                const viewsFormatted = formatViews(video.views);
                a.download = `${viewsFormatted} - ${video.title}.${ext}`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove();

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

async function downloadAllTkVideos() {
    const validIndices = [];
    tkValidatedVideos.forEach((video, index) => {
        if (video.valid) {
            validIndices.push(index);
        }
    });

    if (validIndices.length === 0) {
        showStatus('Nenhum video valido para download', 'error');
        return;
    }

    tkDownloadAllBtn.disabled = true;
    tkDownloadAllBtn.innerHTML = '<span class="btn-icon">&#8987;</span> Baixando...';
    tkValidateBtn.disabled = true;
    tkUrlInput.disabled = true;
    tkQualitySelect.disabled = true;

    overallProgress.classList.remove('hidden');
    updateOverallProgress(0, validIndices.length);

    let completedCount = 0;

    for (let i = 0; i < validIndices.length; i++) {
        const index = validIndices[i];
        showStatus(`Baixando video ${i + 1} de ${validIndices.length}...`, 'info');
        await downloadTkVideo(index);
        completedCount++;
        updateOverallProgress(completedCount, validIndices.length);

        if (i < validIndices.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    tkDownloadAllBtn.disabled = false;
    tkDownloadAllBtn.innerHTML = '<span class="btn-icon">&#11015;</span> Baixar Todos';
    tkValidateBtn.disabled = false;
    tkUrlInput.disabled = false;
    tkQualitySelect.disabled = false;

    showStatus(`${completedCount} download(s) concluido(s)!`, 'success');
}

// TikTok Profile Functions
// Fixed username for TikTok profile
const TIKTOK_USERNAME = 'nextleveldj';

async function loadTkProfile() {
    const username = TIKTOK_USERNAME;

    tkLoadProfileBtn.disabled = true;
    const tkLoadBtnText = document.getElementById('tkLoadBtnText');
    if (tkLoadBtnText) tkLoadBtnText.textContent = 'Carregando...';

    tkProfileResults.innerHTML = `<div class="loading">Carregando videos de @${username}...</div>`;
    tkSelectedVideos.clear();
    updateTkSelectionCount();
    disableTkSelectionButtons();

    try {
        const response = await fetch('/api/tiktok-profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                limit: 100
            })
        });

        const data = await response.json();

        if (!response.ok || data.error) {
            throw new Error(data.error || 'Falha ao carregar perfil');
        }

        // Filter out private/unpublished videos (0 views typically means private or friends-only)
        const allVideos = data.videos || [];
        const publicVideos = allVideos.filter(v => (v.views || 0) > 0);
        const privateCount = allVideos.length - publicVideos.length;

        tkUnfilteredResults = publicVideos;
        tkProfileResults_data = [...tkUnfilteredResults];

        if (tkProfileResults_data.length === 0) {
            let msg = `Nenhum video publico encontrado para @${username}`;
            if (privateCount > 0) {
                msg += ` (${privateCount} videos privados/nao listados foram ocultados)`;
            }
            tkProfileResults.innerHTML = `<div class="no-results"><p>${msg}</p></div>`;
            showStatus('Nenhum conteudo publico encontrado', 'error');
            return;
        }

        // Show info about filtered private videos
        if (privateCount > 0) {
            console.log(`[TikTok] ${privateCount} videos privados/nao listados foram filtrados`);
        }

        // Calculate TOP/BOTTOM 5
        calculateTkTopBottom();

        // Sort by views and render
        sortTkResults('views', 'desc');

        enableTkSelectionButtons();
        let statusMsg = `${tkProfileResults_data.length} videos carregados de @${username}`;
        if (privateCount > 0) {
            statusMsg += ` (${privateCount} privados filtrados)`;
        }
        showStatus(statusMsg, 'success');

    } catch (error) {
        showStatus('Erro: ' + error.message, 'error');
        tkProfileResults.innerHTML = `<div class="no-results"><p>Erro</p><p class="hint">${error.message}</p></div>`;
    } finally {
        tkLoadProfileBtn.disabled = false;
        const tkLoadBtnText = document.getElementById('tkLoadBtnText');
        if (tkLoadBtnText) tkLoadBtnText.textContent = 'Carregar Videos';
    }
}

function calculateTkTopBottom() {
    const sortedByViews = [...tkProfileResults_data].sort((a, b) => (b.views || 0) - (a.views || 0));
    tkTop5Ids = new Set(sortedByViews.slice(0, 5).map(v => v.id));
    tkBottom5Ids = new Set(sortedByViews.slice(-5).map(v => v.id));
}

function sortTkResults(field, order) {
    tkCurrentSortField = field;
    tkCurrentSortOrder = order;

    tkProfileResults_data.sort((a, b) => {
        let valueA, valueB;

        switch(field) {
            case 'views':
                valueA = a.views || 0;
                valueB = b.views || 0;
                break;
            case 'date':
                valueA = a.uploadDate || '';
                valueB = b.uploadDate || '';
                break;
            default:
                valueA = a.views || 0;
                valueB = b.views || 0;
        }

        if (order === 'asc') {
            return valueA > valueB ? 1 : -1;
        } else {
            return valueA < valueB ? 1 : -1;
        }
    });

    renderTkResults();
}

function renderTkResults() {
    tkProfileResults.innerHTML = '';

    if (tkProfileResults_data.length === 0) return;

    tkProfileResults_data.forEach((video, index) => {
        const item = createTkResultItem(video, index);
        tkProfileResults.appendChild(item);
    });

    updateTkDownloadSelectedState();
}

function createTkResultItem(video, index) {
    const item = document.createElement('div');
    item.className = 'search-result-item';
    item.id = `tk-search-${index}`;

    const isTop5 = tkTop5Ids.has(video.id);
    const isBottom5 = tkBottom5Ids.has(video.id);
    const isSelected = tkSelectedVideos.has(index);

    if (isSelected) item.classList.add('selected');

    let badgeHtml = '';
    if (isTop5) {
        const sortedByViews = [...tkProfileResults_data].sort((a, b) => (b.views || 0) - (a.views || 0));
        const rank = sortedByViews.findIndex(v => v.id === video.id) + 1;
        badgeHtml = `<span class="badge badge-top">TOP ${rank}</span>`;
    } else if (isBottom5) {
        const sortedByViews = [...tkProfileResults_data].sort((a, b) => (b.views || 0) - (a.views || 0));
        const rank = tkProfileResults_data.length - sortedByViews.findIndex(v => v.id === video.id);
        badgeHtml = `<span class="badge badge-bottom">BTM ${rank}</span>`;
    }

    const dateFormatted = formatDate(video.uploadDate);

    item.innerHTML = `
        <input type="checkbox" class="result-checkbox"
               data-index="${index}"
               ${isSelected ? 'checked' : ''}
               onchange="toggleTkVideoSelection(${index})">
        <img class="result-thumbnail"
             src="${video.thumbnail}"
             alt=""
             onerror="this.style.background='var(--bg-primary)'">
        <div class="result-info">
            <div class="result-title-row">
                ${badgeHtml}
                <span class="result-title" title="${video.title}">${video.title}</span>
            </div>
            <div class="result-meta">
                <span class="result-channel">${video.channel || ''}</span>
                <span class="result-separator">|</span>
                <span class="result-views">${formatViews(video.views)} views</span>
                ${video.duration ? `<span class="result-separator">|</span><span class="result-duration">${formatDuration(video.duration)}</span>` : ''}
                ${dateFormatted ? `<span class="result-separator">|</span><span class="result-date">${dateFormatted}</span>` : ''}
            </div>
        </div>
    `;

    item.addEventListener('click', (e) => {
        if (e.target.type !== 'checkbox') {
            toggleTkVideoSelection(index);
        }
    });

    return item;
}

function toggleTkVideoSelection(index) {
    if (tkSelectedVideos.has(index)) {
        tkSelectedVideos.delete(index);
    } else {
        tkSelectedVideos.add(index);
    }

    const item = document.getElementById(`tk-search-${index}`);
    const checkbox = item.querySelector('.result-checkbox');

    if (tkSelectedVideos.has(index)) {
        item.classList.add('selected');
        checkbox.checked = true;
    } else {
        item.classList.remove('selected');
        checkbox.checked = false;
    }

    updateTkSelectionCount();
    updateTkDownloadSelectedState();
}

function updateTkSelectionCount() {
    const total = tkProfileResults_data.length;
    const selected = tkSelectedVideos.size;
    if (total > 0) {
        tkSelectionCount.textContent = `${total} videos | ${selected} selecionado(s)`;
    } else {
        tkSelectionCount.textContent = `${selected} selecionado(s)`;
    }
}

function updateTkDownloadSelectedState() {
    tkDownloadSelectedBtn.disabled = tkSelectedVideos.size === 0;
    tkClearSelectionBtn.disabled = tkSelectedVideos.size === 0;
}

function enableTkSelectionButtons() {
    tkSelectTop5Btn.disabled = false;
    tkSelectBottom5Btn.disabled = false;
}

function disableTkSelectionButtons() {
    tkSelectTop5Btn.disabled = true;
    tkSelectBottom5Btn.disabled = true;
    tkClearSelectionBtn.disabled = true;
    tkDownloadSelectedBtn.disabled = true;
}

function selectTkTop5() {
    const sortedByViews = [...tkProfileResults_data]
        .map((v, i) => ({ ...v, originalIndex: i }))
        .sort((a, b) => (b.views || 0) - (a.views || 0));

    const top5Indices = sortedByViews.slice(0, 5).map(v => v.originalIndex);

    top5Indices.forEach(index => {
        if (!tkSelectedVideos.has(index)) {
            tkSelectedVideos.add(index);
            const item = document.getElementById(`tk-search-${index}`);
            if (item) {
                item.classList.add('selected');
                const checkbox = item.querySelector('.result-checkbox');
                if (checkbox) checkbox.checked = true;
            }
        }
    });

    updateTkSelectionCount();
    updateTkDownloadSelectedState();
}

function selectTkBottom5() {
    const sortedByViews = [...tkProfileResults_data]
        .map((v, i) => ({ ...v, originalIndex: i }))
        .sort((a, b) => (b.views || 0) - (a.views || 0));

    const bottom5Indices = sortedByViews.slice(-5).map(v => v.originalIndex);

    bottom5Indices.forEach(index => {
        if (!tkSelectedVideos.has(index)) {
            tkSelectedVideos.add(index);
            const item = document.getElementById(`tk-search-${index}`);
            if (item) {
                item.classList.add('selected');
                const checkbox = item.querySelector('.result-checkbox');
                if (checkbox) checkbox.checked = true;
            }
        }
    });

    updateTkSelectionCount();
    updateTkDownloadSelectedState();
}

function clearTkSelection() {
    tkSelectedVideos.forEach(index => {
        const item = document.getElementById(`tk-search-${index}`);
        if (item) {
            item.classList.remove('selected');
            const checkbox = item.querySelector('.result-checkbox');
            if (checkbox) checkbox.checked = false;
        }
    });
    tkSelectedVideos.clear();
    updateTkSelectionCount();
    updateTkDownloadSelectedState();
}

async function downloadTkSelectedVideos() {
    if (tkSelectedVideos.size === 0) {
        showStatus('Selecione pelo menos um video', 'error');
        return;
    }

    const indices = Array.from(tkSelectedVideos);

    tkDownloadSelectedBtn.disabled = true;
    tkDownloadSelectedBtn.innerHTML = '<span class="btn-icon">&#8987;</span> Baixando...';
    tkLoadProfileBtn.disabled = true;
    tkSelectTop5Btn.disabled = true;
    tkSelectBottom5Btn.disabled = true;
    tkClearSelectionBtn.disabled = true;

    overallProgress.classList.remove('hidden');
    updateOverallProgress(0, indices.length);

    let completedCount = 0;

    for (let i = 0; i < indices.length; i++) {
        const index = indices[i];
        const video = tkProfileResults_data[index];

        showStatus(`Baixando video ${i + 1} de ${indices.length}: ${video.title.substring(0, 50)}...`, 'info');

        const item = document.getElementById(`tk-search-${index}`);
        item.classList.add('downloading');

        try {
            await downloadTkProfileVideo(video);
            item.classList.remove('downloading');
            item.classList.add('downloaded');
        } catch (error) {
            console.error('Download failed:', error);
            item.classList.remove('downloading');
            item.classList.add('download-error');
        }

        completedCount++;
        updateOverallProgress(completedCount, indices.length);

        if (i < indices.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    tkDownloadSelectedBtn.disabled = false;
    tkDownloadSelectedBtn.innerHTML = '<span class="btn-icon">&#11015;</span> Baixar Selecionados';
    tkLoadProfileBtn.disabled = false;
    tkSelectTop5Btn.disabled = false;
    tkSelectBottom5Btn.disabled = false;
    tkClearSelectionBtn.disabled = tkSelectedVideos.size === 0;

    showStatus(`${completedCount} download(s) concluido(s)!`, 'success');
}

function downloadTkProfileVideo(video) {
    return new Promise((resolve, reject) => {
        const quality = tkProfileQualitySelect.value;

        const params = new URLSearchParams({
            url: video.url,
            quality: quality,
            prefix: '',
            title: video.title,
            views: video.views || 0
        });

        fetch(`/api/download-file?${params.toString()}`)
            .then(response => {
                if (!response.ok) throw new Error('Download failed');
                return response.blob();
            })
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                const ext = quality === 'audio' ? 'mp3' : 'mp4';
                const viewsFormatted = formatViews(video.views);
                a.download = `${viewsFormatted} - ${video.title}.${ext}`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove();
                resolve(true);
            })
            .catch(error => {
                reject(error);
            });
    });
}

// ==================== ADDITIONAL EVENT LISTENERS ====================

// Platform Switching
if (platformYoutube) platformYoutube.addEventListener('click', () => switchPlatform('youtube'));
if (platformInstagram) platformInstagram.addEventListener('click', () => switchPlatform('instagram'));
if (platformTiktok) platformTiktok.addEventListener('click', () => switchPlatform('tiktok'));

// Instagram Mode Switching
if (igModeTabUrl) igModeTabUrl.addEventListener('click', () => switchInstagramMode('url'));
if (igModeTabProfile) igModeTabProfile.addEventListener('click', () => switchInstagramMode('profile'));

// Instagram URL Mode
if (igValidateBtn) igValidateBtn.addEventListener('click', validateIgUrls);
if (igDownloadAllBtn) igDownloadAllBtn.addEventListener('click', downloadAllIgVideos);
if (igOpenFolderBtn) igOpenFolderBtn.addEventListener('click', openFolder);

// Instagram Profile Mode
if (igLoadProfileBtn) igLoadProfileBtn.addEventListener('click', loadIgProfile);
if (igContentTypePosts) igContentTypePosts.addEventListener('click', () => setInstagramContentType('posts'));
if (igContentTypeReels) igContentTypeReels.addEventListener('click', () => setInstagramContentType('reels'));
if (igSelectTop5Btn) igSelectTop5Btn.addEventListener('click', selectIgTop5);
if (igSelectBottom5Btn) igSelectBottom5Btn.addEventListener('click', selectIgBottom5);
if (igClearSelectionBtn) igClearSelectionBtn.addEventListener('click', clearIgSelection);
if (igDownloadSelectedBtn) igDownloadSelectedBtn.addEventListener('click', downloadIgSelectedVideos);

if (igSortBySelect) {
    igSortBySelect.addEventListener('change', (e) => {
        const [field, order] = e.target.value.split('-');
        sortIgResults(field, order);
    });
}

// TikTok Mode Switching
if (tkModeTabUrl) tkModeTabUrl.addEventListener('click', () => switchTikTokMode('url'));
if (tkModeTabProfile) tkModeTabProfile.addEventListener('click', () => switchTikTokMode('profile'));

// TikTok URL Mode
if (tkValidateBtn) tkValidateBtn.addEventListener('click', validateTkUrls);
if (tkDownloadAllBtn) tkDownloadAllBtn.addEventListener('click', downloadAllTkVideos);
if (tkOpenFolderBtn) tkOpenFolderBtn.addEventListener('click', openFolder);

// TikTok Profile Mode
if (tkLoadProfileBtn) tkLoadProfileBtn.addEventListener('click', loadTkProfile);
if (tkSelectTop5Btn) tkSelectTop5Btn.addEventListener('click', selectTkTop5);
if (tkSelectBottom5Btn) tkSelectBottom5Btn.addEventListener('click', selectTkBottom5);
if (tkClearSelectionBtn) tkClearSelectionBtn.addEventListener('click', clearTkSelection);
if (tkDownloadSelectedBtn) tkDownloadSelectedBtn.addEventListener('click', downloadTkSelectedVideos);

if (tkSortBySelect) {
    tkSortBySelect.addEventListener('change', (e) => {
        const [field, order] = e.target.value.split('-');
        sortTkResults(field, order);
    });
}

// ==================== QUICK DATE FILTERS ====================

// State for quick filters
let ytQuickFilterDays = 0; // 0 = all
let igQuickFilterDays = 0;
let tkQuickFilterDays = 0;

// Helper: Get date X days ago in YYYYMMDD format
function getDateDaysAgo(days) {
    const date = new Date();
    date.setDate(date.getDate() - days);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}

// Helper: Get first and last day of a month in YYYYMMDD format
function getMonthRange(year, month) {
    const firstDay = `${year}${month}01`;
    const lastDate = new Date(year, parseInt(month), 0);
    const lastDay = `${year}${month}${String(lastDate.getDate()).padStart(2, '0')}`;
    return { start: firstDay, end: lastDay };
}

// ==================== YOUTUBE QUICK FILTERS ====================

function applyYouTubeQuickFilter(days) {
    ytQuickFilterDays = days;

    // Update button states
    document.querySelectorAll('.quick-filter-btn:not(.ig-quick-filter):not(.tk-quick-filter)').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.days) === days);
    });

    // If no results loaded yet, just store the preference
    if (unfilteredResults.length === 0) {
        return;
    }

    // Apply filter
    if (days === 0) {
        // Show all
        searchResults = [...unfilteredResults];
    } else {
        const cutoffDate = getDateDaysAgo(days);
        searchResults = unfilteredResults.filter(video => {
            const uploadDate = video.uploadDate || '';
            return uploadDate >= cutoffDate;
        });
    }

    // Update display
    selectedVideos.clear();
    updateSelectionCount();
    calculateTopBottom();
    sortSearchResults(currentSortField, currentSortOrder);

    if (searchResults.length > 0) {
        enableSelectionButtons();
        showStatus(`${searchResults.length} videos (ultimos ${days} dias)`, 'success');
    } else {
        disableSelectionButtons();
        showStatus('Nenhum video encontrado neste periodo', 'info');
    }
}

function applyYouTubeMonthYearFilter() {
    const month = quickFilterMonth.value;
    const year = quickFilterYear.value;

    if (!month && !year) {
        showToast('Selecione mes ou ano', 'error');
        return;
    }

    if (unfilteredResults.length === 0) {
        showToast('Carregue os videos primeiro', 'error');
        return;
    }

    // Clear quick filter buttons
    document.querySelectorAll('.quick-filter-btn:not(.ig-quick-filter):not(.tk-quick-filter)').forEach(btn => {
        btn.classList.remove('active');
    });

    let filterStart = '';
    let filterEnd = '';

    if (month && year) {
        // Specific month of a year
        const range = getMonthRange(year, month);
        filterStart = range.start;
        filterEnd = range.end;
    } else if (year) {
        // Entire year
        filterStart = `${year}0101`;
        filterEnd = `${year}1231`;
    } else if (month) {
        // Month in current year
        const currentYear = new Date().getFullYear();
        const range = getMonthRange(currentYear, month);
        filterStart = range.start;
        filterEnd = range.end;
    }

    searchResults = unfilteredResults.filter(video => {
        const uploadDate = video.uploadDate || '';
        return uploadDate >= filterStart && uploadDate <= filterEnd;
    });

    // Update display
    selectedVideos.clear();
    updateSelectionCount();
    calculateTopBottom();
    sortSearchResults(currentSortField, currentSortOrder);

    if (searchResults.length > 0) {
        enableSelectionButtons();
        const monthNames = ['', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        const label = month && year ? `${monthNames[parseInt(month)]} ${year}` : (year || monthNames[parseInt(month)]);
        showStatus(`${searchResults.length} videos de ${label}`, 'success');
    } else {
        disableSelectionButtons();
        showStatus('Nenhum video encontrado neste periodo', 'info');
    }
}

// ==================== INSTAGRAM QUICK FILTERS ====================

function applyInstagramQuickFilter(days) {
    igQuickFilterDays = days;

    // Update button states
    document.querySelectorAll('.ig-quick-filter').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.days) === days);
    });

    // Apply all Instagram filters
    applyIgFilters();
}

// Apply all Instagram filters (date + keyword)
function applyIgFilters() {
    // If no results loaded yet, just store the preference
    if (igUnfilteredResults.length === 0) {
        return;
    }

    // Start with all results
    let filtered = [...igUnfilteredResults];

    // Apply date filter
    if (igQuickFilterDays > 0) {
        const cutoffDate = getDateDaysAgo(igQuickFilterDays);
        filtered = filtered.filter(video => {
            const uploadDate = video.uploadDate || '';
            return uploadDate >= cutoffDate;
        });
    }

    // Apply keyword filter (word boundary match)
    if (igSearchType === 'keyword' && igKeyword.trim()) {
        const keyword = igKeyword.trim();
        // Escape special regex characters
        const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\b${escapedKeyword}\\b`, 'i');
        filtered = filtered.filter(video => {
            const title = video.title || '';
            return regex.test(title);
        });
    }

    igProfileResults_data = filtered;

    // Update display
    igSelectedVideos.clear();
    updateIgSelectionCount();
    calculateIgTopBottom();
    sortIgResults(igCurrentSortField, igCurrentSortOrder);

    const contentLabel = igContentType === 'posts' ? 'posts' : 'reels';
    if (igProfileResults_data.length > 0) {
        enableIgSelectionButtons();
        const keywordMsg = igSearchType === 'keyword' && igKeyword.trim() ? ` com "${igKeyword}"` : '';
        const dateMsg = igQuickFilterDays > 0 ? ` (ultimos ${igQuickFilterDays} dias)` : '';
        showStatus(`${igProfileResults_data.length} ${contentLabel}${keywordMsg}${dateMsg}`, 'success');
    } else {
        disableIgSelectionButtons();
        showStatus('Nenhum conteudo encontrado com os filtros aplicados', 'info');
    }
}

// Set Instagram search type
function setIgSearchType(type) {
    igSearchType = type;

    if (type === 'all') {
        if (igSearchTypeAll) igSearchTypeAll.classList.add('active');
        if (igSearchTypeKeyword) igSearchTypeKeyword.classList.remove('active');
        if (igSearchTypeAll) igSearchTypeAll.setAttribute('aria-pressed', 'true');
        if (igSearchTypeKeyword) igSearchTypeKeyword.setAttribute('aria-pressed', 'false');
        if (igKeywordInput) {
            igKeywordInput.disabled = true;
            igKeywordInput.setAttribute('aria-disabled', 'true');
            igKeywordInput.value = '';
        }
        igKeyword = '';
    } else {
        if (igSearchTypeAll) igSearchTypeAll.classList.remove('active');
        if (igSearchTypeKeyword) igSearchTypeKeyword.classList.add('active');
        if (igSearchTypeAll) igSearchTypeAll.setAttribute('aria-pressed', 'false');
        if (igSearchTypeKeyword) igSearchTypeKeyword.setAttribute('aria-pressed', 'true');
        if (igKeywordInput) {
            igKeywordInput.disabled = false;
            igKeywordInput.setAttribute('aria-disabled', 'false');
            igKeywordInput.focus();
        }
    }

    // Re-apply filters
    applyIgFilters();
}

// Handle Instagram keyword input
function handleIgKeywordInput() {
    if (igKeywordInput) igKeyword = igKeywordInput.value;
    applyIgFilters();
}

// ==================== TIKTOK QUICK FILTERS ====================

function applyTikTokQuickFilter(days) {
    tkQuickFilterDays = days;

    // Update button states
    document.querySelectorAll('.tk-quick-filter').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.days) === days);
    });

    // Apply all TikTok filters
    applyTkFilters();
}

// Apply all TikTok filters (date + keyword + advanced)
function applyTkFilters() {
    // If no results loaded yet, just store the preference
    if (tkUnfilteredResults.length === 0) {
        return;
    }

    // Start with all results
    let filtered = [...tkUnfilteredResults];

    // Apply date filter (quick filter)
    if (tkQuickFilterDays > 0) {
        const cutoffDate = getDateDaysAgo(tkQuickFilterDays);
        filtered = filtered.filter(video => {
            const uploadDate = video.uploadDate || '';
            return uploadDate >= cutoffDate;
        });
    }

    // Apply keyword filter (word boundary match)
    if (tkSearchType === 'keyword' && tkKeyword.trim()) {
        const keyword = tkKeyword.trim();
        // Escape special regex characters
        const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\b${escapedKeyword}\\b`, 'i');
        filtered = filtered.filter(video => {
            const title = video.title || '';
            return regex.test(title);
        });
    }

    // Apply advanced filters
    const tkAdvFilters = getTkFiltersFromInputs();

    // Views filter
    if (tkAdvFilters.viewsMin !== null) {
        filtered = filtered.filter(v => (v.views || 0) >= tkAdvFilters.viewsMin);
    }
    if (tkAdvFilters.viewsMax !== null) {
        filtered = filtered.filter(v => (v.views || 0) <= tkAdvFilters.viewsMax);
    }

    // Duration filter
    if (tkAdvFilters.durationMin !== null) {
        filtered = filtered.filter(v => (v.duration || 0) >= tkAdvFilters.durationMin);
    }
    if (tkAdvFilters.durationMax !== null) {
        filtered = filtered.filter(v => (v.duration || 0) <= tkAdvFilters.durationMax);
    }

    // Date range filter
    if (tkAdvFilters.dateStart !== null) {
        filtered = filtered.filter(v => (v.uploadDate || '') >= tkAdvFilters.dateStart);
    }
    if (tkAdvFilters.dateEnd !== null) {
        filtered = filtered.filter(v => (v.uploadDate || '') <= tkAdvFilters.dateEnd);
    }

    tkProfileResults_data = filtered;

    // Update display
    tkSelectedVideos.clear();
    updateTkSelectionCount();
    calculateTkTopBottom();
    sortTkResults(tkCurrentSortField, tkCurrentSortOrder);

    if (tkProfileResults_data.length > 0) {
        enableTkSelectionButtons();
        const keywordMsg = tkSearchType === 'keyword' && tkKeyword.trim() ? ` com "${tkKeyword}"` : '';
        const dateMsg = tkQuickFilterDays > 0 ? ` (ultimos ${tkQuickFilterDays} dias)` : '';
        const filterCount = countTkActiveFilters();
        const advFilterMsg = filterCount > 0 ? ` (${filterCount} filtros)` : '';
        showStatus(`${tkProfileResults_data.length} de ${tkUnfilteredResults.length} videos${keywordMsg}${dateMsg}${advFilterMsg}`, 'success');
    } else {
        disableTkSelectionButtons();
        showStatus('Nenhum video encontrado com os filtros aplicados', 'info');
    }
}

// Get TikTok filters from inputs
function getTkFiltersFromInputs() {
    return {
        viewsMin: tkFilterViewsMin?.value ? parseInt(tkFilterViewsMin.value) : null,
        viewsMax: tkFilterViewsMax?.value ? parseInt(tkFilterViewsMax.value) : null,
        durationMin: parseDurationInput(tkFilterDurationMin?.value),
        durationMax: parseDurationInput(tkFilterDurationMax?.value),
        dateStart: parseDateInput(tkFilterDateStart?.value),
        dateEnd: parseDateInput(tkFilterDateEnd?.value)
    };
}

// Count active TikTok filters
function countTkActiveFilters() {
    let count = 0;
    if (tkFilterViewsMin?.value) count++;
    if (tkFilterViewsMax?.value) count++;
    if (tkFilterDurationMin?.value) count++;
    if (tkFilterDurationMax?.value) count++;
    if (tkFilterDateStart?.value) count++;
    if (tkFilterDateEnd?.value) count++;
    return count;
}

// Update TikTok filter badge
function updateTkFilterBadge() {
    const count = countTkActiveFilters();
    if (tkFilterCountBadge) {
        tkFilterCountBadge.textContent = count;
        tkFilterCountBadge.classList.toggle('hidden', count === 0);
    }
}

// Toggle TikTok filters panel
function toggleTkFilters() {
    if (!tkFiltersToggle || !tkFiltersPanel) return;
    const isExpanded = tkFiltersToggle.getAttribute('aria-expanded') === 'true';
    tkFiltersToggle.setAttribute('aria-expanded', !isExpanded);
    tkFiltersToggle.classList.toggle('expanded', !isExpanded);
    tkFiltersPanel.classList.toggle('expanded', !isExpanded);
    tkFiltersPanel.setAttribute('aria-hidden', isExpanded);
}

// Clear TikTok advanced filters
function clearTkAdvancedFilters() {
    if (tkFilterViewsMin) tkFilterViewsMin.value = '';
    if (tkFilterViewsMax) tkFilterViewsMax.value = '';
    if (tkFilterDurationMin) tkFilterDurationMin.value = '';
    if (tkFilterDurationMax) tkFilterDurationMax.value = '';
    if (tkFilterDateStart) tkFilterDateStart.value = '';
    if (tkFilterDateEnd) tkFilterDateEnd.value = '';
    updateTkFilterBadge();
    applyTkFilters();
}

// Set TikTok search type
function setTkSearchType(type) {
    tkSearchType = type;

    if (type === 'all') {
        if (tkSearchTypeAll) tkSearchTypeAll.classList.add('active');
        if (tkSearchTypeKeyword) tkSearchTypeKeyword.classList.remove('active');
        if (tkSearchTypeAll) tkSearchTypeAll.setAttribute('aria-pressed', 'true');
        if (tkSearchTypeKeyword) tkSearchTypeKeyword.setAttribute('aria-pressed', 'false');
        if (tkKeywordInput) {
            tkKeywordInput.disabled = true;
            tkKeywordInput.setAttribute('aria-disabled', 'true');
            tkKeywordInput.value = '';
        }
        tkKeyword = '';
    } else {
        if (tkSearchTypeAll) tkSearchTypeAll.classList.remove('active');
        if (tkSearchTypeKeyword) tkSearchTypeKeyword.classList.add('active');
        if (tkSearchTypeAll) tkSearchTypeAll.setAttribute('aria-pressed', 'false');
        if (tkSearchTypeKeyword) tkSearchTypeKeyword.setAttribute('aria-pressed', 'true');
        if (tkKeywordInput) {
            tkKeywordInput.disabled = false;
            tkKeywordInput.setAttribute('aria-disabled', 'false');
            tkKeywordInput.focus();
        }
    }

    // Re-apply filters
    applyTkFilters();
}

// Handle TikTok keyword input
function handleTkKeywordInput() {
    if (tkKeywordInput) tkKeyword = tkKeywordInput.value;
    applyTkFilters();
}

// ==================== QUICK FILTER EVENT LISTENERS ====================

// YouTube Quick Filters
document.querySelectorAll('.quick-filter-btn:not(.ig-quick-filter):not(.tk-quick-filter)').forEach(btn => {
    btn.addEventListener('click', () => {
        const days = parseInt(btn.dataset.days);
        applyYouTubeQuickFilter(days);
    });
});

// YouTube Month/Year Filter
if (applyMonthYearFilter) {
    applyMonthYearFilter.addEventListener('click', applyYouTubeMonthYearFilter);
}

// Instagram Quick Filters
document.querySelectorAll('.ig-quick-filter').forEach(btn => {
    btn.addEventListener('click', () => {
        const days = parseInt(btn.dataset.days);
        applyInstagramQuickFilter(days);
    });
});

// Instagram Search Type Buttons
if (igSearchTypeAll) igSearchTypeAll.addEventListener('click', () => setIgSearchType('all'));
if (igSearchTypeKeyword) igSearchTypeKeyword.addEventListener('click', () => setIgSearchType('keyword'));

// Instagram Keyword Input
if (igKeywordInput) {
    igKeywordInput.addEventListener('input', handleIgKeywordInput);
    igKeywordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleIgKeywordInput();
        }
    });
}

// TikTok Quick Filters
document.querySelectorAll('.tk-quick-filter').forEach(btn => {
    btn.addEventListener('click', () => {
        const days = parseInt(btn.dataset.days);
        applyTikTokQuickFilter(days);
    });
});

// TikTok Search Type Buttons
if (tkSearchTypeAll) tkSearchTypeAll.addEventListener('click', () => setTkSearchType('all'));
if (tkSearchTypeKeyword) tkSearchTypeKeyword.addEventListener('click', () => setTkSearchType('keyword'));

// TikTok Keyword Input
if (tkKeywordInput) {
    tkKeywordInput.addEventListener('input', handleTkKeywordInput);
    tkKeywordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleTkKeywordInput();
        }
    });
}

// TikTok Advanced Filters
if (tkFiltersToggle) {
    tkFiltersToggle.addEventListener('click', toggleTkFilters);
    tkFiltersToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleTkFilters();
        }
    });
}

if (tkApplyFiltersBtn) {
    tkApplyFiltersBtn.addEventListener('click', () => {
        applyTkFilters();
        updateTkFilterBadge();
    });
}

if (tkClearFiltersBtn) {
    tkClearFiltersBtn.addEventListener('click', clearTkAdvancedFilters);
}

// TikTok Duration input formatting
if (tkFilterDurationMin) tkFilterDurationMin.addEventListener('input', formatDurationInput);
if (tkFilterDurationMax) tkFilterDurationMax.addEventListener('input', formatDurationInput);
