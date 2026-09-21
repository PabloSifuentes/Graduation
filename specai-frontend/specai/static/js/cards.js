/* ==========================================================================
   SpecAI — cards.js
   Camada de dados e renderização dos cards, fiel ao backend real:
   - API_BASE = /api/cards
   - LOG_API_BASE = /log (backend de logs)
   - Campos: tituloOriginal, descricaoOriginal, tipo, status
   - card.card_refinado: titulo_refinado, descricao_refinada, estrutura,
     justificativa, pontuacao_qualidade, criterios_aceite[], sugestoes_melhoria[]
   - Status possíveis: PENDENTE, PROCESSANDO, REFINADO, APROVADO, REJEITADO, ERRO

   Os nomes de função abaixo são globais de propósito — mantidos idênticos
   ao script.js original para não quebrar nenhuma integração existente.
   ========================================================================== */

const API_BASE = '/api/cards';
const LOG_API_BASE = 'http://localhost:8080/log';

let allCards = [];
const activePolling = {};
let cardLogs = {};

/* ========== LOGS ========== */

async function addLog(cardId, action, details) {
  if (!cardId) return;
  if (!cardLogs[cardId]) cardLogs[cardId] = [];

  const logEntry = {
    cardId,
    status: action,
    mensagemErro: details,
    dataRequisicao: new Date().toISOString()
  };
  cardLogs[cardId].push(logEntry);
  localStorage.setItem(`cardLogs_${cardId}`, JSON.stringify(cardLogs[cardId]));

  try {
    const response = await fetch(LOG_API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: null,
        cardId: cardId,
        status: action,
        mensagemErro: details,
        dataRequisicao: new Date()
      })
    });
    if (!response.ok) console.error('Erro ao salvar log:', response.status);
  } catch (error) {
    console.error('Erro ao enviar log:', error);
  }
}

async function fetchLogsForCard(cardId) {
  try {
    const response = await fetch(`${LOG_API_BASE}/card/${cardId}`);
    if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
    const logs = await response.json();
    cardLogs[cardId] = logs;
    localStorage.setItem(`cardLogs_${cardId}`, JSON.stringify(logs));
    return logs;
  } catch (error) {
    console.error('Erro ao buscar logs do card', cardId, error);
    if (cardLogs[cardId]) return cardLogs[cardId];
    const stored = localStorage.getItem(`cardLogs_${cardId}`);
    if (stored) {
      try { cardLogs[cardId] = JSON.parse(stored); return cardLogs[cardId]; }
      catch (e) { /* ignora */ }
    }
    return [];
  }
}

function getLogsForCard(cardId) { return cardLogs[cardId] || []; }

/* ========== CARREGAR CARDS ========== */

async function loadCards() {
  SpecAI.showLoading();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    const response = await fetch(API_BASE, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
    allCards = await response.json();
  } catch (error) {
    const msg = error.name === 'AbortError' ? 'Tempo limite excedido.' : error.message;
    showNotification(msg, 'error');
    console.error(error);
  } finally {
    SpecAI.hideLoading();
  }

  const badge = document.getElementById('sidebarCardsBadge');
  if (badge) badge.textContent = allCards.length;

  document.dispatchEvent(new CustomEvent('specai:cards-loaded', { detail: allCards }));
  return allCards;
}

/* ========== CRIAR CARD ========== */

async function createNewCard(event) {
  event.preventDefault();
  const title = document.getElementById('cardTitle').value;
  const description = document.getElementById('cardDescription').value;
  const type = document.getElementById('cardType').value;

  if (!title.trim() || !description.trim() || !type) {
    showNotification('Preencha todos os campos', 'error');
    return;
  }

  const newCard = { tituloOriginal: title, descricaoOriginal: description, tipo: type, status: "PENDENTE" };
  SpecAI.showLoading();
  try {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCard)
    });
    if (!response.ok) throw new Error('Erro ao criar card');
    const createdCard = await response.json();
    addLog(createdCard.id, 'CRIAÇÃO', `Card "${createdCard.tituloOriginal}" criado com status ${createdCard.status}`);
    await loadCards();
    SpecAI.closeModal('newCardModal');
    document.getElementById('newCardForm').reset();
    showNotification('Card criado com sucesso', 'success');
  } catch (error) {
    showNotification('Erro ao criar card: ' + error.message, 'error');
  } finally {
    SpecAI.hideLoading();
  }
}

/* ========== REFINAR CARD (com polling e logs) ========== */

async function refineCard(cardId) {
  if (!cardId) return showNotification('ID inválido', 'error');
  if (activePolling[cardId]) return showNotification('Refinamento já em andamento', 'info');

  addLog(cardId, 'REFINAMENTO_SOLICITADO', 'Usuário solicitou refinamento via IA');
  SpecAI.showLoading();
  try {
    const response = await fetch(`${API_BASE}/${cardId}/refine`, { method: 'POST' });
    if (!response.ok) {
      if (response.status === 404) throw new Error('Card não encontrado');
      throw new Error('Erro ao iniciar refinamento');
    }
    const updatedCard = await response.json();
    updateLocalCard(cardId, updatedCard);
    showNotification('IA processando o requisito...', 'info');

    let attempts = 0;
    const maxAttempts = 12;
    const interval = setInterval(async () => {
      attempts++;
      try {
        const refreshed = await fetch(`${API_BASE}/${cardId}`).then(res => res.json());
        if (refreshed.status === 'REFINADO' || refreshed.status === 'ERRO' || attempts >= maxAttempts) {
          clearInterval(interval);
          delete activePolling[cardId];
          updateLocalCard(cardId, refreshed);

          if (refreshed.status === 'REFINADO') {
            const score = refreshed.card_refinado?.pontuacao_qualidade || '?';
            addLog(cardId, 'REFINAMENTO_SUCESSO', `Refinamento concluído. Score: ${score}`);
            showNotification('Refinamento concluído', 'success');
          } else if (refreshed.status === 'ERRO') {
            addLog(cardId, 'REFINAMENTO_ERRO', 'Ocorreu um erro durante o processamento da IA');
            showNotification('Não foi possível concluir o refinamento', 'error');
          } else {
            addLog(cardId, 'REFINAMENTO_TIMEOUT', 'Tempo limite excedido para o refinamento');
            showNotification('Tempo de processamento esgotado', 'info');
          }
          SpecAI.hideLoading();
        }
      } catch (e) { /* ignora erros de polling */ }
    }, 2000);
    activePolling[cardId] = interval;
  } catch (error) {
    addLog(cardId, 'REFINAMENTO_ERRO', `Falha ao iniciar: ${error.message}`);
    showNotification(error.message, 'error');
    SpecAI.hideLoading();
  }
}

/* ========== APROVAR / REJEITAR ========== */

async function approveCard(cardId) {
  if (!cardId) return;
  SpecAI.showLoading();
  try {
    const response = await fetch(`${API_BASE}/${cardId}/approve`, { method: 'POST' });
    if (!response.ok) throw new Error('Erro ao aprovar');
    const updated = await response.json();
    updateLocalCard(cardId, updated);
    addLog(cardId, 'APROVAÇÃO', 'Card aprovado pelo usuário');
    showNotification('Card aprovado', 'success');
  } catch (error) {
    showNotification('Erro ao aprovar', 'error');
  } finally {
    SpecAI.hideLoading();
  }
}

async function rejectCard(cardId) {
  if (!cardId) return;
  const confirmed = await SpecAI.confirmAction('Tem certeza que deseja rejeitar este card?');
  if (!confirmed) return;
  SpecAI.showLoading();
  try {
    const response = await fetch(`${API_BASE}/${cardId}/reject`, { method: 'POST' });
    if (!response.ok) throw new Error('Erro ao rejeitar');
    const updated = await response.json();
    updateLocalCard(cardId, updated);
    addLog(cardId, 'REJEIÇÃO', 'Card rejeitado pelo usuário');
    showNotification('Card rejeitado', 'info');
  } catch (error) {
    showNotification('Erro ao rejeitar', 'error');
  } finally {
    SpecAI.hideLoading();
  }
}

function updateLocalCard(cardId, updatedCard) {
  const index = allCards.findIndex(c => c.id === cardId);
  if (index !== -1) allCards[index] = updatedCard;
  else allCards.unshift(updatedCard);
  document.dispatchEvent(new CustomEvent('specai:cards-loaded', { detail: allCards }));
}

/* ========== EXCLUIR CARD ========== */

async function deleteCard(cardId) {
  if (!cardId) return;
  const confirmed = await SpecAI.confirmAction('Tem certeza que deseja excluir este card? Essa ação não pode ser desfeita.');
  if (!confirmed) return;

  SpecAI.showLoading();
  try {
    const response = await fetch(`${API_BASE}/${cardId}`, { method: 'DELETE' });
    if (!response.ok) {
      if (response.status === 404) throw new Error('Card não encontrado');
      throw new Error('Erro ao excluir card');
    }
    if (activePolling[cardId]) { clearInterval(activePolling[cardId]); delete activePolling[cardId]; }

    allCards = allCards.filter(c => c.id !== cardId);
    document.dispatchEvent(new CustomEvent('specai:cards-loaded', { detail: allCards }));

    delete cardLogs[cardId];
    localStorage.removeItem(`cardLogs_${cardId}`);

    showNotification('Card excluído com sucesso', 'success');
  } catch (error) {
    showNotification('Erro ao excluir card: ' + error.message, 'error');
  } finally {
    SpecAI.hideLoading();
  }
}

/* ========== FILTRO (busca) ========== */

function filterCards(query) {
  const grid = document.getElementById('cardsGrid') || document.getElementById('recentCardsGrid');
  if (!grid) return;
  if (!query || !query.trim()) {
    renderCardsGrid(grid, allCards);
    return;
  }
  const q = query.toLowerCase();
  const filtered = allCards.filter(c =>
    (c.tituloOriginal || '').toLowerCase().includes(q) ||
    (c.descricaoOriginal || '').toLowerCase().includes(q)
  );
  renderCardsGrid(grid, filtered);
}

/* ========== RENDERIZAÇÃO ========== */

function typeLabel(tipo) {
  const map = { FEATURE: "Feature", BUG: "Bug", MELHORIA: "Melhoria", REFATORACAO: "Refatoração" };
  return map[tipo] || tipo;
}

function cardTemplate(card) {
  const refined = card.card_refinado || null;
  const score = refined?.pontuacao_qualidade;
  const isRefining = card.status === 'PROCESSANDO';
  const isRefined = ['REFINADO', 'APROVADO', 'REJEITADO'].includes(card.status);
  const refineDisabled = isRefining || isRefined;

  const quality = score != null
    ? `<div class="quality-chip">${SpecAI.qualityRingSvg(score)}<span class="quality-chip-value">${score}<small>/100</small></span></div>`
    : `<span class="quality-chip-value"><small>Aguardando refinamento</small></span>`;

  const approveReject = card.status === 'REFINADO' ? `
      <button class="icon-btn" title="Aprovar" onclick="approveCard(${card.id})">
        <svg class="icon" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>
      </button>
      <button class="icon-btn" title="Rejeitar" onclick="rejectCard(${card.id})">
        <svg class="icon" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>
      </button>` : '';

  return `
    <article class="panel req-card" data-id="${card.id}">
      <div class="req-card-top">
        <span class="req-card-title">${SpecAI.escapeHtml(card.tituloOriginal)}</span>
        <span class="req-type">${typeLabel(card.tipo)}</span>
      </div>
      ${SpecAI.statusPill(card.status)}
      <div class="req-card-foot">
        ${quality}
        <div class="req-actions">
          <button class="icon-btn" title="Visualizar" onclick="openDetails(${card.id})">
            <svg class="icon" viewBox="0 0 24 24"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
          <button class="icon-btn" title="Refinar" onclick="refineCard(${card.id})" ${refineDisabled ? 'disabled style="opacity:.35;pointer-events:none;"' : ''}>
            <svg class="icon" viewBox="0 0 24 24"><path d="M12 3a4 4 0 0 0-4 4v1a3 3 0 0 0-2 2.8V15a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4v-4.2A3 3 0 0 0 16 8V7a4 4 0 0 0-4-4Z"/></svg>
          </button>
          <button class="icon-btn" title="Logs" onclick="openLogsModal(${card.id})">
            <svg class="icon" viewBox="0 0 24 24"><path d="M6 4h9l5 5v11H6z"/><path d="M15 4v5h5M9 13h6M9 17h6"/></svg>
          </button>
          ${approveReject}
          <button class="icon-btn" title="Excluir" onclick="deleteCard(${card.id})">
            <svg class="icon" viewBox="0 0 24 24"><path d="M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m-8 0 1 13a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2l1-13"/></svg>
          </button>
        </div>
      </div>
    </article>`;
}

function renderCardsGrid(container, cards) {
  if (!container) return;
  if (!cards || !cards.length) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1/-1;">
        <svg class="icon" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9h10M7 13h6"/></svg>
        <strong>Nenhum requisito encontrado</strong>
        <p>Crie um novo card para começar o refinamento.</p>
      </div>`;
    return;
  }
  container.innerHTML = cards.map(cardTemplate).join('');
}

/* ========== DETALHES ========== */

async function openDetails(cardId) {
  if (!cardId) { showNotification('ID inválido', 'error'); return; }
  try {
    const card = await fetch(`${API_BASE}/${cardId}`).then(res => res.json());
    updateLocalCard(cardId, card);
    const refined = card.card_refinado || null;
    const body = document.getElementById('modalBody');
    if (!body) return;

    let html = `
      <div class="detail-original">
        <div class="do-title">${SpecAI.escapeHtml(card.tituloOriginal)}</div>
        <div class="do-desc">${SpecAI.escapeHtml(card.descricaoOriginal)}</div>
        <div class="do-meta">
          <span class="req-type">${typeLabel(card.tipo)}</span>
          ${SpecAI.statusPill(card.status)}
        </div>
      </div>`;

    if (refined && refined.titulo_refinado) {
      const criterios = (refined.criterios_aceite || []).map(c => `
        <div class="criteria-item"><svg class="icon" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg><span>${SpecAI.escapeHtml(c.descricao)}</span></div>`).join('');
      const sugestoes = (refined.sugestoes_melhoria || []).map(s => `
        <div class="suggestion-item"><div class="sg-title">Melhoria sugerida</div><div class="sg-reason">${SpecAI.escapeHtml(s.descricao)}</div></div>`).join('');

      html += `
        <div class="detail-block" style="margin-top:20px;">
          <h3>Resultado do refinamento</h3>
          <div class="detail-refined">
            <div class="do-title">${SpecAI.escapeHtml(refined.titulo_refinado)}</div>
            <div class="do-desc">${SpecAI.escapeHtml(refined.descricao_refinada)}</div>
          </div>
        </div>

        <div class="quality-score-block">
          ${SpecAI.qualityRingSvg(refined.pontuacao_qualidade || 0)}
          <div class="quality-score-num">${refined.pontuacao_qualidade || 0}<small>/100</small></div>
          <div class="quality-score-note">${SpecAI.escapeHtml(refined.justificativa || '')}</div>
        </div>

        ${refined.estrutura ? `
        <div class="detail-block" style="margin-bottom:20px;">
          <h3>Estrutura técnica</h3>
          <div class="detail-original"><div class="do-desc">${SpecAI.escapeHtml(refined.estrutura)}</div></div>
        </div>` : ''}

        ${criterios ? `
        <div class="detail-block" style="margin-bottom:20px;">
          <h3>Critérios de aceite</h3>
          <div class="criteria-list">${criterios}</div>
        </div>` : ''}

        ${sugestoes ? `
        <div class="detail-block">
          <h3>Sugestões de melhoria</h3>
          <div class="suggestion-list">${sugestoes}</div>
        </div>` : ''}`;

      if (card.status === 'REFINADO') {
        html += `
        <div style="display:flex; gap:10px; margin-top:22px;">
          <button class="btn btn-primary" style="flex:1; justify-content:center;" onclick="approveCard(${card.id})">Aprovar</button>
          <button class="btn btn-danger-ghost" style="flex:1; justify-content:center;" onclick="rejectCard(${card.id})">Rejeitar</button>
        </div>`;
      }
    } else {
      html += `<p style="margin-top:18px; color: var(--text-secondary); font-size: 13.5px;">
        Este card ainda não foi processado pela IA. Utilize a ação <strong>Refinar</strong> para gerar a especificação estruturada.
      </p>`;
    }

    body.innerHTML = html;
    SpecAI.openModal('detailsModal');
  } catch (error) {
    showNotification('Erro ao carregar detalhes', 'error');
  }
}

/* ========== MODAL DE LOGS ========== */

async function openLogsModal(cardId) {
  const body = document.getElementById('logsModalBody');
  if (!body) return;
  SpecAI.openModal('logsModal');
  body.innerHTML = `<p style="color: var(--text-muted); font-size:13.5px;">Carregando logs...</p>`;

  const logs = await fetchLogsForCard(cardId);
  if (!logs || !logs.length) {
    body.innerHTML = `<p style="color: var(--text-muted); font-size:13.5px;">Nenhum log registrado para este card.</p>`;
    return;
  }

  body.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:8px;">
      ${logs.slice().reverse().map(log => `
        <div class="criteria-item" style="align-items:flex-start; flex-direction:column; gap:4px;">
          <div style="display:flex; justify-content:space-between; width:100%; gap:10px;">
            <strong style="font-size:12.5px; color: var(--text-primary);">${SpecAI.escapeHtml(log.status)}</strong>
            <span style="font-size:11.5px; color: var(--text-muted); white-space:nowrap;">${SpecAI.formatDate(log.dataRequisicao)}</span>
          </div>
          <span style="font-size:12.5px; color: var(--text-secondary);">${SpecAI.escapeHtml(log.mensagemErro)}</span>
        </div>`).join('')}
    </div>`;
}

/* ========== FORM DE NOVO CARD ========== */

function bindNewCardForm() {
  const form = document.getElementById('newCardForm');
  if (!form) return;
  form.addEventListener('submit', createNewCard);
}

document.addEventListener('DOMContentLoaded', bindNewCardForm);
