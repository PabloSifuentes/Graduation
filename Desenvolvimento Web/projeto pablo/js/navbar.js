/* ==========================================================
   Navbar: transparente no topo, sólida/translúcida ao rolar
   ========================================================== */
(function () {
  "use strict";

  var header = document.querySelector("[data-header]");
  if (!header) return;

  var threshold = 24;
  var ticking = false;

  function update() {
    header.classList.toggle("is-scrolled", window.scrollY > threshold);
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  update();
})();
