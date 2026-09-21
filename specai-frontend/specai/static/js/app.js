/* ==========================================================================
   SpecAI — app.js
   Utilitários compartilhados de UI: sidebar, modais, notificações,
   formatação de status e do anel de qualidade.
   A lógica de dados (cards, logs) vive em cards.js, fiel ao backend real.
   ========================================================================== */

const SpecAI = (() => {

  /* ---------------- Notificações (toast) ---------------- */

  function toast(message, type = "info") {
    const stack = document.getElementById("toastStack");
    if (!stack) return;
    const el = document.createElement("div");
    el.className = "toast" + (type === "error" ? " is-error" : "");
    el.textContent = message;
    stack.appendChild(el);
    setTimeout(() => {
      el.style.opacity = "0";
      el.style.transition = "opacity 200ms ease";
      setTimeout(() => el.remove(), 220);
    }, 4000);
  }

  /* ---------------- Sidebar (mobile) ---------------- */

  function initSidebar() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");
    const toggle = document.getElementById("menuToggle");
    if (!sidebar || !toggle) return;

    function open() {
      sidebar.classList.add("is-open");
      overlay && overlay.classList.add("is-visible");
      toggle.setAttribute("aria-expanded", "true");
    }
    function close() {
      sidebar.classList.remove("is-open");
      overlay && overlay.classList.remove("is-visible");
      toggle.setAttribute("aria-expanded", "false");
    }
    toggle.addEventListener("click", () => {
      sidebar.classList.contains("is-open") ? close() : open();
    });
    overlay && overlay.addEventListener("click", close);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

    window.toggleSidebar = () => { sidebar.classList.contains("is-open") ? close() : open(); };
    window.closeSidebar = close;
  }

  /* ---------------- Modais genéricos ---------------- */

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeModalById(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  function initGlobalModalTriggers() {
    const openBtn = document.getElementById("openNewCardBtn");
    if (openBtn) openBtn.addEventListener("click", () => openModal("newCardModal"));

    document.querySelectorAll(".modal").forEach((modal) => {
      modal.addEventListener("click", (e) => { if (e.target === modal) closeModalById(modal.id); });
    });

    const closeNew = document.getElementById("closeNewCardModal");
    if (closeNew) closeNew.addEventListener("click", () => closeModalById("newCardModal"));

    const closeDetails = document.getElementById("closeDetailsModal");
    if (closeDetails) closeDetails.addEventListener("click", () => closeModalById("detailsModal"));

    const closeLogs = document.getElementById("closeLogsModal");
    if (closeLogs) closeLogs.addEventListener("click", () => closeModalById("logsModal"));

    // Compatibilidade com os nomes de função originais (onclick="...")
    window.openNewCardModal = () => openModal("newCardModal");
    window.closeNewCardModal = () => closeModalById("newCardModal");
    window.closeModal = () => closeModalById("detailsModal");
    window.closeLogsModal = () => closeModalById("logsModal");
  }

  /* ---------------- Copiar texto ---------------- */

  function copyText(text, successMessage = "Copiado para a área de transferência") {
    navigator.clipboard.writeText(text)
      .then(() => toast(successMessage))
      .catch(() => toast("Não foi possível copiar", "error"));
  }

  /* ---------------- Confirmação (substitui window.confirm) ---------------- */

  function confirmAction(message) {
    return new Promise((resolve) => {
      const modal = document.createElement("div");
      modal.className = "modal is-open";
      modal.innerHTML = `
        <div class="modal-content" style="max-width:400px;">
          <div class="modal-header">
            <h2>Confirmação</h2>
            <button class="icon-btn" data-close><svg class="icon" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
          </div>
          <div class="modal-body">
            <p style="font-size:13.5px; color: var(--text-secondary); margin-bottom:20px;">${message}</p>
            <div style="display:flex; gap:10px;">
              <button class="btn btn-danger-ghost" data-confirm style="flex:1; justify-content:center;">Sim, confirmar</button>
              <button class="btn btn-ghost" data-cancel style="flex:1; justify-content:center;">Cancelar</button>
            </div>
          </div>
        </div>`;
      document.body.appendChild(modal);
      const finish = (result) => { modal.remove(); resolve(result); };
      modal.querySelector("[data-confirm]").onclick = () => finish(true);
      modal.querySelector("[data-cancel]").onclick = () => finish(false);
      modal.querySelector("[data-close]").onclick = () => finish(false);
      modal.addEventListener("click", (e) => { if (e.target === modal) finish(false); });
    });
  }

  /* ---------------- Loading overlay ---------------- */

  let overlayEl = null;
  function ensureOverlay() {
    if (overlayEl) return overlayEl;
    overlayEl = document.createElement("div");
    overlayEl.id = "loadingOverlay";
    overlayEl.style.cssText = `
      position: fixed; inset: 0; background: rgba(9,30,38,0.45);
      display: none; align-items: center; justify-content: center;
      z-index: 2000; backdrop-filter: blur(2px);`;
    overlayEl.innerHTML = `<div style="width:34px;height:34px;border-radius:50%;
      border:3px solid rgba(228,253,225,0.25); border-top-color:#E4FDE1;
      animation: specai-spin 800ms linear infinite;"></div>`;
    document.body.appendChild(overlayEl);
    const style = document.createElement("style");
    style.textContent = "@keyframes specai-spin { to { transform: rotate(360deg); } }";
    document.head.appendChild(style);
    return overlayEl;
  }
  function showLoading() { ensureOverlay().style.display = "flex"; }
  function hideLoading() { ensureOverlay().style.display = "none"; }

  /* ---------------- Formatação ---------------- */

  function statusPill(status) {
    const map = {
      PENDENTE: { cls: "pill-pending", label: "Pendente" },
      PROCESSANDO: { cls: "pill-alert", label: "Processando" },
      REFINADO: { cls: "pill-success", label: "Refinado" },
      APROVADO: { cls: "pill-success", label: "Aprovado" },
      REJEITADO: { cls: "pill-error", label: "Rejeitado" },
      ERRO: { cls: "pill-error", label: "Erro" }
    };
    const s = map[status] || map.PENDENTE;
    return `<span class="pill ${s.cls}">${s.label}</span>`;
  }

  function qualityRingSvg(score) {
    const r = 13, c = 2 * Math.PI * r;
    const pct = Math.max(0, Math.min(100, score)) / 100;
    const offset = c * (1 - pct);
    const color = score >= 90 ? "var(--status-success)" : score >= 70 ? "var(--color-teal)" : "var(--status-error)";
    return `
      <svg class="quality-ring" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="${r}" fill="none" stroke="var(--color-border-strong)" stroke-width="3.2"></circle>
        <circle cx="16" cy="16" r="${r}" fill="none" stroke="${color}" stroke-width="3.2"
          stroke-dasharray="${c}" stroke-dashoffset="${offset}" stroke-linecap="round"
          transform="rotate(-90 16 16)"></circle>
      </svg>`;
  }

  function formatDate(value) {
    try {
      const d = new Date(value);
      return d.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
    } catch { return value; }
  }

  function escapeHtml(str) {
    if (!str) return "";
    return String(str).replace(/[&<>]/g, (m) => (m === "&" ? "&amp;" : m === "<" ? "&lt;" : "&gt;"));
  }

  document.addEventListener("DOMContentLoaded", () => {
    initSidebar();
    initGlobalModalTriggers();
  });

  return {
    toast, openModal, closeModal: closeModalById, copyText, confirmAction,
    showLoading, hideLoading, statusPill, qualityRingSvg, formatDate, escapeHtml
  };
})();

// Alias global — nome usado no script original do projeto.
function showNotification(msg, type) { SpecAI.toast(msg, type === "error" ? "error" : "info"); }
