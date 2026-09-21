/* ==========================================================================
   SpecAI — logs.js
   O backend expõe logs por card (GET /log/card/{cardId}), então esta página
   permite selecionar um card e ver seu histórico de requisições.
   ========================================================================== */

(async function () {
  const select = document.getElementById('logsCardSelect');
  const body = document.getElementById('logsTableBody');
  if (!select || !body) return;

  function renderTable(logs) {
    if (!logs || !logs.length) {
      body.innerHTML = `<tr><td colspan="3" style="text-align:center; color: var(--text-muted); padding: 30px;">Nenhum log registrado para este card.</td></tr>`;
      return;
    }
    body.innerHTML = logs.slice().reverse().map(log => {
      const s = (log.status || '').toUpperCase();
      const cls = s.includes('ERRO') ? 'pill-error' : s.includes('SUCESSO') || s.includes('APROVA') ? 'pill-success' : 'pill-pending';
      return `
      <tr>
        <td class="dt-time">${SpecAI.formatDate(log.dataRequisicao)}</td>
        <td><span class="pill ${cls}">${SpecAI.escapeHtml(log.status)}</span></td>
        <td>${SpecAI.escapeHtml(log.mensagemErro)}</td>
      </tr>`;
    }).join('');
  }

  async function loadForSelected() {
    const cardId = select.value;
    if (!cardId) { renderTable([]); return; }
    body.innerHTML = `<tr><td colspan="3" style="text-align:center; color: var(--text-muted); padding: 30px;">Carregando...</td></tr>`;
    const logs = await fetchLogsForCard(cardId);
    renderTable(logs);
  }

  await loadCards();
  select.innerHTML = allCards.length
    ? allCards.map(c => `<option value="${c.id}">${SpecAI.escapeHtml(c.tituloOriginal)}</option>`).join('')
    : `<option value="">Nenhum card cadastrado</option>`;

  select.addEventListener('change', loadForSelected);
  if (allCards.length) loadForSelected();
})();
