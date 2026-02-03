// Episodes page functionality
let allEpisodes = [];

// Load episodes from JSON file
async function loadEpisodes() {
    try {
        const response = await fetch('episodes-data.json');
        allEpisodes = await response.json();
        displayEpisodes(allEpisodes);
        setupFilters();
    } catch (error) {
        console.error('Error loading episodes:', error);
        document.getElementById('episode-list').innerHTML = `
            <p style="text-align: center; color: var(--burgundy); padding: 2rem;">
                Error loading episodes. Please make sure episodes-data.json is in the same directory.
            </p>
        `;
    }
}

// Display episodes
function displayEpisodes(episodes) {
    const episodeList = document.getElementById('episode-list');
    
    if (episodes.length === 0) {
        episodeList.innerHTML = `
            <p style="text-align: center; font-size: 1.2rem; padding: 2rem;">
                No episodes found matching your criteria.
            </p>
        `;
        return;
    }
    
    episodeList.innerHTML = episodes.map(episode => `
        <div class="episode-card" data-show="${episode.show}">
            <h3 class="episode-title">${episode.title}</h3>
            <div class="episode-meta">
                ${episode.showName} • Season ${episode.season}, Episode ${episode.episode} • ${episode.year}
            </div>
            <p class="episode-description">${episode.description}</p>
            ${episode.links ? `
                <div class="episode-links">
                    ${episode.links.imdb ? `<a href="${episode.links.imdb}" target="_blank">IMDb</a>` : ''}
                    ${episode.links.wiki ? `<a href="${episode.links.wiki}" target="_blank">Wikipedia</a>` : ''}
                    ${episode.links.streaming ? `<a href="${episode.links.streaming}" target="_blank">Watch</a>` : ''}
                </div>
            ` : ''}
        </div>
    `).join('');
}

// Setup filters
function setupFilters() {
    const showFilter = document.getElementById('show-filter');
    const searchInput = document.getElementById('search-episodes');
    
    // Check URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const showParam = urlParams.get('show');
    if (showParam && showFilter) {
        showFilter.value = showParam;
        filterEpisodes();
    }
    
    if (showFilter) {
        showFilter.addEventListener('change', filterEpisodes);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', filterEpisodes);
    }
}

// Filter episodes
function filterEpisodes() {
    const showFilter = document.getElementById('show-filter');
    const searchInput = document.getElementById('search-episodes');
    
    const selectedShow = showFilter ? showFilter.value : 'all';
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    
    let filtered = allEpisodes;
    
    // Filter by show
    if (selectedShow !== 'all') {
        filtered = filtered.filter(ep => ep.show === selectedShow);
    }
    
    // Filter by search term
    if (searchTerm) {
        filtered = filtered.filter(ep => 
            ep.title.toLowerCase().includes(searchTerm) ||
            ep.description.toLowerCase().includes(searchTerm) ||
            ep.showName.toLowerCase().includes(searchTerm)
        );
    }
    
    displayEpisodes(filtered);
}

// Initialize when DOM is ready
if (document.getElementById('episode-list')) {
    loadEpisodes();
}
