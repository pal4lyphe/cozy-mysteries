// Favorites page functionality
let allEpisodes = [];
let favorites = JSON.parse(localStorage.getItem('favoriteEpisodes')) || [];

// Load episodes and display favorites
async function loadFavorites() {
    try {
        const response = await fetch('episodes-data.json');
        allEpisodes = await response.json();
        displayFavorites();
    } catch (error) {
        console.error('Error loading episodes:', error);
        document.getElementById('favorite-episodes-list').innerHTML = `
            <p style="text-align: center; color: var(--burgundy); padding: 2rem;">
                Error loading episodes data.
            </p>
        `;
    }
}

// Display favorite episodes
function displayFavorites() {
    const favoritesListEl = document.getElementById('favorite-episodes-list');
    const emptyState = document.getElementById('empty-favorites');
    const statsEl = document.getElementById('favorites-stats');
    
    if (favorites.length === 0) {
        favoritesListEl.style.display = 'none';
        emptyState.style.display = 'block';
        statsEl.style.display = 'none';
        return;
    }
    
    // Get all favorite episodes
    const favoriteEpisodes = allEpisodes.filter(episode => {
        const episodeId = `${episode.show}-s${episode.season}e${episode.episode}`;
        return favorites.includes(episodeId);
    });
    
    // Show stats
    const showCounts = {};
    favoriteEpisodes.forEach(ep => {
        showCounts[ep.showName] = (showCounts[ep.showName] || 0) + 1;
    });
    
    statsEl.innerHTML = `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number">${favoriteEpisodes.length}</div>
                <div class="stat-label">Total Favorites</div>
            </div>
            ${Object.entries(showCounts).map(([show, count]) => `
                <div class="stat-card">
                    <div class="stat-number">${count}</div>
                    <div class="stat-label">${show}</div>
                </div>
            `).join('')}
        </div>
    `;
    
    // Display episodes
    favoritesListEl.innerHTML = favoriteEpisodes.map(episode => {
        const episodeId = `${episode.show}-s${episode.season}e${episode.episode}`;
        
        return `
        <div class="episode-card" data-show="${episode.show}">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                <h3 class="episode-title">${episode.title}</h3>
                <div style="display: flex; gap: 0.5rem; align-items: center;">
                    ${episode.rating ? `<span class="rating-badge">⭐ ${episode.rating}/10</span>` : ''}
                    <button class="favorite-btn is-favorite" 
                            onclick="removeFavorite('${episodeId}')" 
                            title="Remove from favorites">
                        ❤️
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
            </div>
        </div>
    `}).join('');
}

// Remove from favorites
function removeFavorite(episodeId) {
    const index = favorites.indexOf(episodeId);
    if (index > -1) {
        favorites.splice(index, 1);
        localStorage.setItem('favoriteEpisodes', JSON.stringify(favorites));
        displayFavorites();
    }
}

// Load on page load
document.addEventListener('DOMContentLoaded', loadFavorites);
