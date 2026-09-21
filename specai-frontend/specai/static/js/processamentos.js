/* ==========================================================================
   SpecAI — processamentos.js
   ========================================================================== */

(function () {
  const STEPS = ["Recebido", "Analisando", "Estruturando", "Gerando critérios", "Sugerindo melhorias", "Concluído"];

  function renderPipeline(doneUpTo) {
    const row = document.getElementById('pipelineRow');
    if (!row) return;
    row.innerHTML = STEPS.map((label, i) => {
      const isDone = i <= doneUpTo;
      const connector = i < STEPS.length - 1 ? `<div class="pipeline-connector"></div>` : "";
      return `
        <div class="pipeline-node ${isDone ? "is-done" : ""}">
          <span class="pn-dot">
            ${isDone
              ? `<svg class="icon" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>`
              : `<span>${i + 1}</span>`}
          </span>
          <div class="pn-label">${label}</div>
        </div>${connector}`;
    }).join('');
  }

  function fillTable(cards) {
    const body = document.getElementById('procTableBody');
    if (!body) return;
    const relevant = cards.filter(c => c.status !== 'PENDENTE');
    if (!relevant.length) {
      body.innerHTML = `<tr><td colspan="3" style="text-align:center; color: var(--text-muted); padding: 30px;">Nenhum processamento executado ainda.</td></tr>`;
      return;
    }
    body.innerHTML = relevant.map(c => `
      <tr>
        <td>${SpecAI.escapeHtml(c.tituloOriginal)}</td>
        <td>${c.card_refinado ? `${c.card_refinado.pontuacao_qualidade ?? '—'}/100` : '—'}</td>
        <td>${SpecAI.statusPill(c.status)}</td>
      </tr>`).join('');
  }

  function render() {
    const refined = allCards.filter(c => c.card_refinado);
    const errored = allCards.filter(c => c.status === 'ERRO').length;
    const processing = allCards.filter(c => c.status === 'PROCESSANDO');
    const totalRuns = refined.length + errored;

    document.getElementById('procTotal').textContent = refined.length;
    document.getElementById('procAvgTime').textContent = '—';
    document.getElementById('procSuccess').textContent = totalRuns ? `${Math.round((refined.length / totalRuns) * 100)}%` : '—';
    document.getElementById('procErrors').textContent = errored;

    const currentRunEl = document.getElementById('currentRun');
    if (processing.length) {
      currentRunEl.style.display = '';
      document.getElementById('currentRunTitle').textContent = processing[0].tituloOriginal;
      renderPipeline(2);
    } else {
      currentRunEl.style.display = 'none';
      renderPipeline(allCards.some(c => c.card_refinado) ? STEPS.length - 1 : -1);
    }

    fillTable(allCards);
  }

  document.addEventListener('specai:cards-loaded', render);
  loadCards();
})();
