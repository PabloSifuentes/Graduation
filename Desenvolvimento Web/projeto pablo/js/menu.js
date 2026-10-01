/* ==========================================================
   Menu: submenu de Serviços (desktop) e gaveta lateral (mobile)
   ========================================================== */
(function () {
  "use strict";

  /* ---------- Submenu desktop ---------- */
  var subItems = document.querySelectorAll("[data-submenu]");

  function closeAllSubmenus(except) {
    subItems.forEach(function (item) {
      if (item === except) return;
      item.classList.remove("is-open");
      var btn = item.querySelector("[data-submenu-toggle]");
      if (btn) btn.setAttribute("aria-expanded", "false");
    });
  }

  subItems.forEach(function (item) {
    var btn = item.querySelector("[data-submenu-toggle]");
    if (!btn) return;

    btn.addEventListener("click", function (event) {
      event.stopPropagation();
      var open = !item.classList.contains("is-open");
      closeAllSubmenus(item);
      item.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
    });

    item.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && item.classList.contains("is-open")) {
        closeAllSubmenus();
        btn.focus();
      }
    });

    item.addEventListener("focusout", function (event) {
      if (!item.contains(event.relatedTarget)) {
        item.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  });

  document.addEventListener("click", function () {
    closeAllSubmenus();
  });

  /* ---------- Gaveta mobile ---------- */
  var drawer = document.querySelector("[data-drawer]");
  var openBtn = document.querySelector("[data-drawer-open]");
  if (!drawer || !openBtn) return;

  var closeBtns = document.querySelectorAll("[data-drawer-close]");
  var lastFocus = null;
  var focusableSel = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function openDrawer() {
    lastFocus = document.activeElement;
    drawer.classList.add("is-open");
    openBtn.setAttribute("aria-expanded", "true");
    document.body.classList.add("is-locked");
    var first = drawer.querySelector(focusableSel);
    if (first) first.focus();
    document.addEventListener("keydown", onDocKey);
  }

  function onDocKey(event) {
    if (event.key === "Escape") closeDrawer();
  }

  function closeDrawer() {
    if (!drawer.classList.contains("is-open")) return;
    document.removeEventListener("keydown", onDocKey);
    drawer.classList.remove("is-open");
    openBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("is-locked");
    if (lastFocus) lastFocus.focus();
  }

  openBtn.addEventListener("click", openDrawer);
  closeBtns.forEach(function (btn) {
    btn.addEventListener("click", closeDrawer);
  });

  drawer.addEventListener("keydown", function (event) {
    // mantém o foco dentro da gaveta
    if (event.key === "Tab") {
      var nodes = drawer.querySelectorAll(focusableSel);
      if (!nodes.length) return;
      var first = nodes[0];
      var last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  // fecha ao navegar para âncoras na mesma página
  drawer.querySelectorAll("a[href]").forEach(function (link) {
    link.addEventListener("click", closeDrawer);
  });

  // se a tela crescer com a gaveta aberta, fecha
  var desktop = window.matchMedia("(min-width: 1181px)");
  function onChange(e) {
    if (e.matches && drawer.classList.contains("is-open")) closeDrawer();
  }
  if (desktop.addEventListener) desktop.addEventListener("change", onChange);
})();
