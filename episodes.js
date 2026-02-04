// Episodes page functionality
let allEpisodes = [];
let favorites = JSON.parse(localStorage.getItem('favoriteEpisodes')) || [];

// Load episodes from JSON file
async function loadEpisodes() {
    try {
        const response = await fetch('episodes-data.json');
        allEpisodes = await response.json();
        displayEpisodes(allEpisodes);
        setupFilters();
        populateSeasons(); // Populate season dropdown
        setupRandomButton();
    } catch (error) {
        console.error('Error loading episodes:', error);
        document.getElementById('episode-list').innerHTML = `
            <p style="text-align: center; color: var(--burgundy); padding: 2rem;">
                Error loading episodes. Please make sure episodes-data.json is in the same directory.
            </p>
        `;
    }
}

// Setup random episode button
function setupRandomButton() {
    const randomBtn = document.getElementById('random-episode-btn');
    if (randomBtn) {
        randomBtn.addEventListener('click', showRandomEpisode);
    }
}

// Show random episode
function showRandomEpisode() {
    const showFilter = document.getElementById('show-filter');
    const selectedShow = showFilter ? showFilter.value : 'all';
    
    let pool = allEpisodes;
    if (selectedShow !== 'all') {
        pool = allEpisodes.filter(ep => ep.show === selectedShow);
    }
    
    if (pool.length === 0) {
        alert('No episodes available!');
        return;
    }
    
    const randomEpisode = pool[Math.floor(Math.random() * pool.length)];
    
    // Display only the random episode with special styling
    displayEpisodes([randomEpisode], true);
    
    // Scroll to the episode
    document.getElementById('episode-list').scrollIntoView({ behavior: 'smooth' });
}

// Populate season dropdown based on selected show
function populateSeasons() {
    const showFilter = document.getElementById('show-filter');
    const seasonFilter = document.getElementById('season-filter');
    const selectedShow = showFilter ? showFilter.value : 'all';
    
    // Get unique seasons for the selected show
    let seasons = new Set();
    
    if (selectedShow === 'all') {
        // Get all seasons from all shows
        allEpisodes.forEach(ep => seasons.add(ep.season));
    } else {
        // Get seasons only from selected show
        allEpisodes
            .filter(ep => ep.show === selectedShow)
            .forEach(ep => seasons.add(ep.season));
    }
    
    // Sort seasons numerically
    const sortedSeasons = Array.from(seasons).sort((a, b) => a - b);
    
    // Populate dropdown
    seasonFilter.innerHTML = '<option value="all">All Seasons</option>';
    sortedSeasons.forEach(season => {
        const option = document.createElement('option');
        option.value = season;
        option.textContent = `Season ${season}`;
        seasonFilter.appendChild(option);
    });
}

// Display episodes
function displayEpisodes(episodes, isRandom = false) {
    const episodeList = document.getElementById('episode-list');
    
    if (episodes.length === 0) {
        episodeList.innerHTML = `
            <p style="text-align: center; font-size: 1.2rem; padding: 2rem;">
                No episodes found matching your criteria.
            </p>
        `;
        return;
    }
    
    if (isRandom) {
        episodeList.innerHTML = `
            <div style="background: var(--gold); padding: 1rem; margin-bottom: 1rem; text-align: center; border-radius: 4px;">
                <strong>🎲 Random Episode Suggestion!</strong>
                <button onclick="filterEpisodes()" style="margin-left: 1rem; padding: 0.5rem 1rem; background: var(--charcoal); color: var(--cream); border: none; cursor: pointer; border-radius: 4px;">Show All Episodes</button>
            </div>
        `;
    } else {
        episodeList.innerHTML = '';
    }
    
    episodeList.innerHTML += episodes.map(episode => {
        const episodeId = `${episode.show}-s${episode.season}e${episode.episode}`;
        const isFavorite = favorites.includes(episodeId);
        
        return `
        <div class="episode-card ${isRandom ? 'random-highlight' : ''}" data-show="${episode.show}">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                <h3 class="episode-title">${episode.title}</h3>
                <div style="display: flex; gap: 0.5rem; align-items: center;">
                    ${episode.rating ? `<span class="rating-badge">⭐ ${episode.rating}/10</span>` : ''}
                    <button class="favorite-btn ${isFavorite ? 'is-favorite' : ''}" 
                            onclick="toggleFavorite('${episodeId}')" 
                            title="${isFavorite ? 'Remove from favorites' : 'Add to favorites'}">
                        ${isFavorite ? '❤️' : '🤍'}
                    </button>
                </div>
            </div>
            <div class="episode-meta">
                ${episode.showName} • Season ${episode.season}, Episode ${episode.episode} • ${episode.year}
            </div>
            <p class="episode-description">${episode.description}</p>
            <div class="episode-links">
                ${episode.links?.imdb ? `<a href="${episode.links.imdb}" target="_blank" rel="noopener">IMDb</a>` : ''}
                ${episode.links?.wiki ? `<a href="${episode.links.wiki}" target="_blank" rel="noopener">Wikipedia</a>` : ''}
                <!-- Streaming links hidden - uncomment when ready to monetize
                ${episode.links?.streaming ? `
                    <a href="${episode.links.streaming.url}" 
                       target="_blank" 
                       rel="noopener${episode.links.streaming.affiliate ? ' nofollow sponsored' : ''}" 
                       class="watch-link">
                       Watch on ${episode.links.streaming.platform} →
                    </a>
                ` : ''}
                -->
            </div>
        </div>
    `}).join('');
}

// Toggle favorite
function toggleFavorite(episodeId) {
    const index = favorites.indexOf(episodeId);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(episodeId);
    }
    localStorage.setItem('favoriteEpisodes', JSON.stringify(favorites));
    
    // Re-render to update heart icons
    filterEpisodes();
}

// Setup filters
function setupFilters() {
    const showFilter = document.getElementById('show-filter');
    const seasonFilter = document.getElementById('season-filter');
    const searchInput = document.getElementById('search-episodes');
    const sortSelect = document.getElementById('sort-episodes');
    
    // Check URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const showParam = urlParams.get('show');
    if (showParam && showFilter) {
        showFilter.value = showParam;
        populateSeasons(); // Update seasons for pre-selected show
        filterEpisodes();
    }
    
    if (showFilter) {
        showFilter.addEventListener('change', () => {
            populateSeasons(); // Update season options when show changes
            filterEpisodes();
        });
    }
    
    if (seasonFilter) {
        seasonFilter.addEventListener('change', filterEpisodes);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', filterEpisodes);
    }
    
    if (sortSelect) {
        sortSelect.addEventListener('change', filterEpisodes);
    }
}

// Filter episodes
function filterEpisodes() {
    const showFilter = document.getElementById('show-filter');
    const seasonFilter = document.getElementById('season-filter');
    const searchInput = document.getElementById('search-episodes');
    const sortSelect = document.getElementById('sort-episodes');
    
    const selectedShow = showFilter ? showFilter.value : 'all';
    const selectedSeason = seasonFilter ? seasonFilter.value : 'all';
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const sortBy = sortSelect ? sortSelect.value : 'popularity';
    
    let filtered = allEpisodes;
    
    // Filter by show
    if (selectedShow !== 'all') {
        filtered = filtered.filter(ep => ep.show === selectedShow);
    }
    
    // Filter by season
    if (selectedSeason !== 'all') {
        filtered = filtered.filter(ep => ep.season === parseInt(selectedSeason));
    }
    
    // Filter by search term
    if (searchTerm) {
        filtered = filtered.filter(ep => 
            ep.title.toLowerCase().includes(searchTerm) ||
            ep.description.toLowerCase().includes(searchTerm) ||
            ep.showName.toLowerCase().includes(searchTerm)
        );
    }
    
    // Sort episodes
    filtered = [...filtered].sort((a, b) => {
        switch(sortBy) {
            case 'popularity':
                return (b.popularity || 0) - (a.popularity || 0);
            case 'rating':
                return (b.rating || 0) - (a.rating || 0);
            case 'year-desc':
                return b.year - a.year;
            case 'year-asc':
                return a.year - b.year;
            case 'title':
                return a.title.localeCompare(b.title);
            default:
                return 0;
        }
    });
    
    displayEpisodes(filtered);
}

// Initialize when DOM is ready
if (document.getElementById('episode-list')) {
    loadEpisodes();
}
