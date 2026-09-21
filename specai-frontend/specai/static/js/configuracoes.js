/* ==========================================================================
   SpecAI — configuracoes.js
   ========================================================================== */

(function () {
  const copyUrlBtn = document.getElementById('copyApiUrl');
  const copyJsonBtn = document.getElementById('copyJsonExample');

  if (copyUrlBtn) {
    copyUrlBtn.addEventListener('click', () => {
      const text = document.getElementById('apiUrlBlock').textContent.trim();
      SpecAI.copyText(text, 'URL da API copiada');
    });
  }

  if (copyJsonBtn) {
    copyJsonBtn.addEventListener('click', () => {
      const text = document.getElementById('jsonExampleBlock').textContent.trim();
      SpecAI.copyText(text, 'JSON copiado');
    });
  }
})();
