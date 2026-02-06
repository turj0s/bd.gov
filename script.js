const searchInput = document.getElementById('site-search');
const searchButton = document.getElementById('search-btn');
const searchableItems = Array.from(document.querySelectorAll('.searchable'));
const emptyState = document.getElementById('search-empty');

function normalize(value) {
  return value.toLowerCase().trim();
}

function applySearch() {
  const query = normalize(searchInput.value);
  let visibleCount = 0;

  searchableItems.forEach((item) => {
    const text = normalize(item.textContent || '');
    const keywords = normalize(item.getAttribute('data-keywords') || '');
    const matched = !query || text.includes(query) || keywords.includes(query);

    item.classList.toggle('is-hidden', !matched);

    if (matched) {
      visibleCount += 1;
    }
  });

  if (emptyState) {
    emptyState.hidden = visibleCount !== 0;
  }
}

searchButton?.addEventListener('click', applySearch);
searchInput?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    applySearch();
  }
});

searchInput?.addEventListener('input', () => {
  if (!searchInput.value.trim()) {
    applySearch();
  }
});
