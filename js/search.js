function filter(query) {
    const items = document.querySelectorAll('.posts li');
    const clearBtn = document.getElementById('clear-btn');
const noResults = document.getElementById('no-results');
    query = query.toLowerCase().trim();
    let visibleCount = 0;

    clearBtn.style.display = query ? 'block' : 'none';
    items.forEach(function(item) {
        const text = item.textContent.toLowerCase();
        const match = !query || text.includes(query);
        item.style.display = match ? '' : 'none';
        if (match) visibleCount++;
    });

    noResults.style.display = visibleCount === 0 && query ? 'block' : 'none';
}

function clearSearch() {
    const input = document.getElementById('search');
    input.value = '';
    filter('');
    input.focus();
}