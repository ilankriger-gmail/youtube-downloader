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

// State - Search Mode (YouTube)
let searchResults = [];
let unfilteredResults = []; // Original results before filtering
let selectedVideos = new Set();
let currentMode = 'url';
let searchType = 'all'; // 'all' or 'keyword'
let contentType = 'videos'; // 'videos' | 'shorts' | 'lives'
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
        searchTypeAll.classList.add('active');
        searchTypeKeyword.classList.remove('active');
        searchInput.disabled = true;
        searchInput.setAttribute('aria-disabled', 'true');
        searchInput.value = '';
        searchBtn.innerHTML = '<span class="btn-icon">&#128269;</span> Carregar';
    } else {
        searchTypeAll.classList.remove('active');
        searchTypeKeyword.classList.add('active');
        searchInput.disabled = false;
        searchInput.setAttribute('aria-disabled', 'false');
        searchInput.focus();
        searchBtn.innerHTML = '<span class="btn-icon">&#128269;</span> Buscar';
    }

    // Update ARIA
    updateSearchTypeAria(type);
}

// ==================== CONTENT TYPE FUNCTIONS ====================

function setContentType(type) {
    contentType = type;

    // Update tab buttons
    contentTypeVideos.classList.toggle('active', type === 'videos');
    contentTypeShorts.classList.toggle('active', type === 'shorts');
    contentTypeLives.classList.toggle('active', type === 'lives');

    // Update ARIA
    updateContentTypeAria(type);

    // Clear results when switching type
    searchResults = [];
    unfilteredResults = [];
    selectedVideos.clear();
    searchResultsContainer.innerHTML = '';
    updateSelectionCount();
    disableSelectionButtons();

    // Show type-specific placeholder
    const typeLabels = {
        'videos': 'videos',
        'shorts': 'shorts',
        'lives': 'transmissoes ao vivo'
    };
    searchResultsContainer.innerHTML = `<div class="no-results"><p>Clique em "Carregar" para buscar ${typeLabels[type]} do canal</p></div>`;
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
    const query = searchInput.value.trim();

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

    searchBtn.disabled = true;
    searchBtn.innerHTML = '<span class="btn-icon">&#8987;</span> Carregando...';

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
        searchResultsContainer.innerHTML = `<div class="no-results"><p>Erro</p><p class="hint">${error.message}</p></div>`;
    } finally {
        searchBtn.disabled = false;
        searchBtn.innerHTML = searchType === 'all'
            ? '<span class="btn-icon">&#128269;</span> Carregar'
            : '<span class="btn-icon">&#128269;</span> Buscar';
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
    if (total > 0) {
        selectionCount.textContent = `${total} videos | ${selected} selecionado(s)`;
    } else {
        selectionCount.textContent = `${selected} selecionado(s)`;
    }
}

function updateDownloadSelectedState() {
    downloadSelectedBtn.disabled = selectedVideos.size === 0;
    clearSelectionBtn.disabled = selectedVideos.size === 0;
}

function enableSelectionButtons() {
    selectTop5Btn.disabled = false;
    selectBottom5Btn.disabled = false;
}

function disableSelectionButtons() {
    selectTop5Btn.disabled = true;
    selectBottom5Btn.disabled = true;
    clearSelectionBtn.disabled = true;
    downloadSelectedBtn.disabled = true;
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
modeTabUrl.addEventListener('click', () => switchMode('url'));
modeTabSearch.addEventListener('click', () => switchMode('search'));

// URL Mode
validateBtn.addEventListener('click', validateUrls);
downloadAllBtn.addEventListener('click', downloadAllVideos);
openFolderBtn.addEventListener('click', openFolder);

urlInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        e.preventDefault();
        validateUrls();
    }
});

// Search Mode
searchTypeAll.addEventListener('click', () => setSearchType('all'));
searchTypeKeyword.addEventListener('click', () => setSearchType('keyword'));
searchBtn.addEventListener('click', performSearch);
selectTop5Btn.addEventListener('click', selectTop5);
selectBottom5Btn.addEventListener('click', selectBottom5);
clearSelectionBtn.addEventListener('click', clearSelection);
downloadSelectedBtn.addEventListener('click', downloadSelectedVideos);

sortBySelect.addEventListener('change', (e) => {
    const [field, order] = e.target.value.split('-');
    sortSearchResults(field, order);
});

searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        performSearch();
    }
});

// Content Type Tabs
contentTypeVideos.addEventListener('click', () => setContentType('videos'));
contentTypeShorts.addEventListener('click', () => setContentType('shorts'));
contentTypeLives.addEventListener('click', () => setContentType('lives'));

// Filters - Collapsible Toggle
filtersToggle.addEventListener('click', toggleFilters);
filtersToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFilters();
    }
});

// Filters - Apply and Clear
applyFiltersBtn.addEventListener('click', () => {
    applyFilters();
    updateFilterBadge();
});

clearFiltersBtn.addEventListener('click', () => {
    clearFilters();
    updateFilterBadge();
});

// Duration input formatting (auto-add colon)
filterDurationMin.addEventListener('input', formatDurationInput);
filterDurationMax.addEventListener('input', formatDurationInput);

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
    contentTypeVideos.setAttribute('aria-selected', activeType === 'videos');
    contentTypeShorts.setAttribute('aria-selected', activeType === 'shorts');
    contentTypeLives.setAttribute('aria-selected', activeType === 'lives');
}

// Update search type buttons ARIA
function updateSearchTypeAria(activeType) {
    searchTypeAll.setAttribute('aria-pressed', activeType === 'all');
    searchTypeKeyword.setAttribute('aria-pressed', activeType === 'keyword');
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
                <span class="result-views">${formatViews(video.views)} ${video.isVideo ? 'views' : 'likes'}</span>
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

        tkUnfilteredResults = data.videos || [];
        tkProfileResults_data = [...tkUnfilteredResults];

        if (tkProfileResults_data.length === 0) {
            tkProfileResults.innerHTML = `<div class="no-results"><p>Nenhum video encontrado para @${username}</p></div>`;
            showStatus('Nenhum conteudo encontrado', 'error');
            return;
        }

        // Calculate TOP/BOTTOM 5
        calculateTkTopBottom();

        // Sort by views and render
        sortTkResults('views', 'desc');

        enableTkSelectionButtons();
        showStatus(`${tkProfileResults_data.length} videos carregados de @${username}`, 'success');

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
platformYoutube.addEventListener('click', () => switchPlatform('youtube'));
platformInstagram.addEventListener('click', () => switchPlatform('instagram'));
platformTiktok.addEventListener('click', () => switchPlatform('tiktok'));

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
tkModeTabUrl.addEventListener('click', () => switchTikTokMode('url'));
tkModeTabProfile.addEventListener('click', () => switchTikTokMode('profile'));

// TikTok URL Mode
tkValidateBtn.addEventListener('click', validateTkUrls);
tkDownloadAllBtn.addEventListener('click', downloadAllTkVideos);
tkOpenFolderBtn.addEventListener('click', openFolder);

// TikTok Profile Mode
tkLoadProfileBtn.addEventListener('click', loadTkProfile);
tkSelectTop5Btn.addEventListener('click', selectTkTop5);
tkSelectBottom5Btn.addEventListener('click', selectTkBottom5);
tkClearSelectionBtn.addEventListener('click', clearTkSelection);
tkDownloadSelectedBtn.addEventListener('click', downloadTkSelectedVideos);

tkSortBySelect.addEventListener('change', (e) => {
    const [field, order] = e.target.value.split('-');
    sortTkResults(field, order);
});

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

    // If no results loaded yet, just store the preference
    if (igUnfilteredResults.length === 0) {
        return;
    }

    // Apply filter
    if (days === 0) {
        igProfileResults_data = [...igUnfilteredResults];
    } else {
        const cutoffDate = getDateDaysAgo(days);
        igProfileResults_data = igUnfilteredResults.filter(video => {
            const uploadDate = video.uploadDate || '';
            return uploadDate >= cutoffDate;
        });
    }

    // Update display
    igSelectedVideos.clear();
    updateIgSelectionCount();
    calculateIgTopBottom();
    sortIgResults(igCurrentSortField, igCurrentSortOrder);

    if (igProfileResults_data.length > 0) {
        enableIgSelectionButtons();
        showStatus(`${igProfileResults_data.length} posts (ultimos ${days} dias)`, 'success');
    } else {
        disableIgSelectionButtons();
        showStatus('Nenhum post encontrado neste periodo', 'info');
    }
}

// ==================== TIKTOK QUICK FILTERS ====================

function applyTikTokQuickFilter(days) {
    tkQuickFilterDays = days;

    // Update button states
    document.querySelectorAll('.tk-quick-filter').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.days) === days);
    });

    // If no results loaded yet, just store the preference
    if (tkUnfilteredResults.length === 0) {
        return;
    }

    // Apply filter
    if (days === 0) {
        tkProfileResults_data = [...tkUnfilteredResults];
    } else {
        const cutoffDate = getDateDaysAgo(days);
        tkProfileResults_data = tkUnfilteredResults.filter(video => {
            const uploadDate = video.uploadDate || '';
            return uploadDate >= cutoffDate;
        });
    }

    // Update display
    tkSelectedVideos.clear();
    updateTkSelectionCount();
    calculateTkTopBottom();
    sortTkResults(tkCurrentSortField, tkCurrentSortOrder);

    if (tkProfileResults_data.length > 0) {
        enableTkSelectionButtons();
        showStatus(`${tkProfileResults_data.length} videos (ultimos ${days} dias)`, 'success');
    } else {
        disableTkSelectionButtons();
        showStatus('Nenhum video encontrado neste periodo', 'info');
    }
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

// TikTok Quick Filters
document.querySelectorAll('.tk-quick-filter').forEach(btn => {
    btn.addEventListener('click', () => {
        const days = parseInt(btn.dataset.days);
        applyTikTokQuickFilter(days);
    });
});
