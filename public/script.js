// DOM Elements - URL Mode
const urlInput = document.getElementById('urlInput');
const validateBtn = document.getElementById('validateBtn');
const downloadAllBtn = document.getElementById('downloadAllBtn');
const openFolderBtn = document.getElementById('openFolderBtn');
const qualitySelect = document.getElementById('qualitySelect');
const videoList = document.getElementById('videoList');

// DOM Elements - Search Mode
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

// State - URL Mode
let validatedVideos = [];
let videoPrefixes = {};

// State - Search Mode
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

    searchResultsContainer.innerHTML = `<div class="loading">${loadingMsg}</div>`;
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
    searchResultsContainer.innerHTML = '';

    if (searchResults.length === 0) {
        return;
    }

    searchResults.forEach((video, index) => {
        const item = createSearchResultItem(video, index);
        searchResultsContainer.appendChild(item);
    });

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
    selectionCount.textContent = `${selectedVideos.size} selecionado(s)`;
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
