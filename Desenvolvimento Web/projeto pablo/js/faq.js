/* ==========================================================
   FAQ em accordion acessível (botões reais + aria-expanded)
   ========================================================== */
(function () {
  "use strict";

  document.querySelectorAll("[data-accordion]").forEach(function (accordion) {
    var single = accordion.hasAttribute("data-accordion-single");
    var triggers = accordion.querySelectorAll(".accordion__trigger");

    function setState(trigger, open) {
      var item = trigger.closest(".accordion__item");
      var panel = document.getElementById(trigger.getAttribute("aria-controls"));
      trigger.setAttribute("aria-expanded", String(open));
      if (item) item.classList.toggle("is-open", open);
      if (panel) panel.setAttribute("aria-hidden", String(!open));
    }

    triggers.forEach(function (trigger, index) {
      setState(trigger, trigger.getAttribute("aria-expanded") === "true");

      trigger.addEventListener("click", function () {
        var open = trigger.getAttribute("aria-expanded") !== "true";
        if (single && open) {
          triggers.forEach(function (other) {
            if (other !== trigger) setState(other, false);
          });
        }
        setState(trigger, open);
      });

      // setas para navegar entre perguntas
      trigger.addEventListener("keydown", function (event) {
        var next = null;
        if (event.key === "ArrowDown") next = triggers[index + 1] || triggers[0];
        if (event.key === "ArrowUp") next = triggers[index - 1] || triggers[triggers.length - 1];
        if (event.key === "Home") next = triggers[0];
        if (event.key === "End") next = triggers[triggers.length - 1];
        if (next) {
          event.preventDefault();
          next.focus();
        }
      });
    });
  });
})();
