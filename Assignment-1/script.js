// Configuration
const TAGS = ["javascript", "webdev", "css", "react", "beginners", "typescript", "html", "programming"];
const COLORS = ["#FF6B6B", "#4ECDC4", "#FFD93D", "#6A4C93", "#FF8C42"];

let articles = [];
let searchTerm = '';

// Utility functions
const random = arr => arr[Math.floor(Math.random() * arr.length)];
const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

// Main functions
async function loadArticles() {
  showLoading();
  try {
    const url = `https://dev.to/api/articles?per_page=50&page=${Math.floor(Math.random() * 5) + 1}&tag=${random(TAGS)}`;
    const response = await fetch(url);
    const data = await response.json();
    
    articles = shuffle(data);
    displayArticles();
  } catch (error) {
    showError();
  }
}

function displayArticles(posts = articles) {
  const filtered = searchTerm ? filterArticles(posts) : posts.slice(0, 12);
  
  document.getElementById('posts-container').innerHTML = 
    filtered.length ? createArticleCards(filtered) : showNoResults();
}

function filterArticles(posts) {
  const term = searchTerm.toLowerCase();
  return posts.filter(post => 
    post.title.toLowerCase().includes(term) ||
    post.description?.toLowerCase().includes(term) ||
    post.tag_list?.some(tag => tag.toLowerCase().includes(term))
  );
}

function createArticleCards(posts) {
  return posts.map(post => {
    const author = post.user?.name || post.user?.username || 'Unknown';
    const color = random(COLORS);
    const date = post.published_at ? new Date(post.published_at).toLocaleDateString() : '';
    const time = post.reading_time_minutes ? `${post.reading_time_minutes} min read` : '';
    const tags = post.tag_list?.slice(0, 3) || [];
    
    return `
      <div class="post-card">
        <div class="post-header">
          <div class="avatar" style="background-color: ${color}">${author[0]}</div>
          <strong>${author}</strong>
        </div>
        <h3>${post.title}</h3>
        <p>${post.description || ''}</p>
        <div class="post-meta">${[date, time].filter(Boolean).join(' • ')}</div>
        ${tags.length ? `<div class="tags">${tags.map(t => `<span class="tag">#${t}</span>`).join('')}</div>` : ''}
        <div class="post-actions">
          <a href="${post.url}" target="_blank" class="read-link">🔗 Read on DEV.to</a>
          <button class="like-btn">❤️ Like</button>
        </div>
      </div>
    `;
  }).join('');
}

function showLoading() {
  document.getElementById('posts-container').innerHTML = 
    '<div class="loading-spinner">Loading articles…</div>';
}

function showError() {
  document.getElementById('posts-container').innerHTML = 
    `<div class="error-container">
      <p class="error">❌ Error fetching posts!</p>
      <button class="retry-btn" onclick="loadArticles()">🔄 Retry</button>
    </div>`;
}

function showNoResults() {
  return `
    <div class="no-results">
      <h3>🔍 No articles found</h3>
      <p>No articles match your search for "<strong>${searchTerm}</strong>"</p>
      <p>Try different keywords or <button class="retry-btn" onclick="loadArticles()">🔄 Get New Articles</button></p>
    </div>
  `;
}

// Event handlers
document.addEventListener('DOMContentLoaded', () => {
  loadArticles();
  
  document.getElementById('refresh-btn')?.addEventListener('click', loadArticles);
  document.getElementById('search-input')?.addEventListener('input', (e) => {
    searchTerm = e.target.value;
    displayArticles();
  });
  
  // Like button handler
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('like-btn')) {
      e.target.textContent = e.target.textContent.includes("Liked") ? "❤️ Like" : "❤️ Liked";
    }
  });
});