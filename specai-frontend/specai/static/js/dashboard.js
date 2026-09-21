/* ==========================================================================
   SpecAI — dashboard.js
   ========================================================================== */

(function () {
  const grid = document.getElementById('recentCardsGrid');

  function render() {
    const total = allCards.length;
    const refined = allCards.filter(c => c.card_refinado);
    const pending = allCards.filter(c => c.status === 'PENDENTE').length;
    const approved = allCards.filter(c => c.status === 'APROVADO').length;

    const avgQuality = refined.length
      ? Math.round(refined.reduce((sum, c) => sum + (c.card_refinado.pontuacao_qualidade || 0), 0) / refined.length)
      : 0;

    document.getElementById('metricTotal').textContent = total;
    document.getElementById('metricRefined').textContent = refined.length;
    document.getElementById('metricPending').textContent = pending;
    document.getElementById('metricQuality').innerHTML = `${avgQuality}<small>/100</small>`;

    document.getElementById('metricTotalDelta').textContent = `${approved} aprovados`;
    document.getElementById('metricRefinedDelta').textContent = total ? `${Math.round((refined.length / total) * 100)}% do total` : '—';
    document.getElementById('metricPendingDelta').textContent = pending ? 'Aguardando processamento' : 'Fila vazia';
    document.getElementById('metricQualityDelta').textContent = refined.length ? 'Baseado nos cards refinados' : 'Sem dados ainda';

    renderCardsGrid(grid, allCards.slice(0, 6));
  }

  document.addEventListener('specai:cards-loaded', render);
  loadCards();
})();
