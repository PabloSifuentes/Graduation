/* ==========================================================================
   SpecAI — cards-page.js
   Filtros por status e busca na página /cards (usa dados de cards.js).
   ========================================================================== */

(function () {
  const grid = document.getElementById('cardsGrid');
  if (!grid) return;

  let activeFilter = 'TODOS';

  function render() {
    const filtered = activeFilter === 'TODOS' ? allCards : allCards.filter(c => c.status === activeFilter);
    renderCardsGrid(grid, filtered);
  }

  document.querySelectorAll('.filter-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      activeFilter = chip.dataset.filter;
      render();
    });
  });

  const search = document.getElementById('globalSearch');
  if (search) search.addEventListener('input', (e) => filterCards(e.target.value));

  document.addEventListener('specai:cards-loaded', render);
  loadCards();
})();
