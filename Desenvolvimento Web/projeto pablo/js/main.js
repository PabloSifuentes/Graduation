/* ==========================================================
   Comportamentos gerais: ano no rodapé, formulário de contato
   (envia pelo WhatsApp, como no site anterior) e mapa.
   ========================================================== */
(function () {
  "use strict";

  /* Ano atual no rodapé */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Formulário de contato → WhatsApp ---------- */
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    var status = form.querySelector("[data-form-status]");
    var fields = {
      nome: form.querySelector("#contato-nome"),
      telefone: form.querySelector("#contato-telefone"),
      assunto: form.querySelector("#contato-assunto"),
      mensagem: form.querySelector("#contato-mensagem")
    };

    var messages = {
      nome: "Informe seu nome.",
      telefone: "Informe um telefone com DDD, por exemplo (47) 99999-9999.",
      mensagem: "Escreva uma mensagem com pelo menos 10 caracteres."
    };

    function setError(input, text) {
      var error = document.getElementById(input.id + "-erro");
      input.setAttribute("aria-invalid", text ? "true" : "false");
      if (error) error.textContent = text || "";
    }

    function validate() {
      var ok = true;
      var digits = fields.telefone.value.replace(/\D/g, "");

      if (fields.nome.value.trim().length < 2) { setError(fields.nome, messages.nome); ok = false; }
      else setError(fields.nome, "");

      if (digits.length < 10 || digits.length > 11) { setError(fields.telefone, messages.telefone); ok = false; }
      else setError(fields.telefone, "");

      if (fields.mensagem.value.trim().length < 10) { setError(fields.mensagem, messages.mensagem); ok = false; }
      else setError(fields.mensagem, "");

      return ok;
    }

    // máscara simples de telefone
    fields.telefone.addEventListener("input", function () {
      var d = this.value.replace(/\D/g, "").slice(0, 11);
      var out = d;
      if (d.length > 2) out = "(" + d.slice(0, 2) + ") " + d.slice(2);
      if (d.length > 7) out = "(" + d.slice(0, 2) + ") " + d.slice(2, d.length - 4) + "-" + d.slice(-4);
      this.value = out;
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      status.className = "form-status";
      status.textContent = "";

      if (!validate()) {
        status.classList.add("form-status--error");
        status.textContent = "Revise os campos destacados para continuar.";
        var firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var texto = "Olá! Me chamo " + fields.nome.value.trim() + ".\n" +
        "Telefone: " + fields.telefone.value.trim() + "\n" +
        (fields.assunto && fields.assunto.value ? "Assunto: " + fields.assunto.value + "\n" : "") +
        "Mensagem: " + fields.mensagem.value.trim();

      window.open(window.waLink(texto), "_blank", "noopener");

      status.classList.add("form-status--success");
      status.textContent = "Abrimos o WhatsApp com sua mensagem. Se não abriu, toque em \"Falar no WhatsApp\".";
      form.reset();
    });

    // limpa o erro enquanto a pessoa corrige
    Object.keys(fields).forEach(function (key) {
      var input = fields[key];
      if (!input) return;
      input.addEventListener("blur", function () {
        if (input.getAttribute("aria-invalid") === "true") validate();
      });
    });
  }
})();
