/* ==========================================================
   Login e Cadastro — camada de interface
   ----------------------------------------------------------
   Este arquivo NÃO implementa autenticação. Ele cuida de:
   - mostrar/ocultar senha, máscaras e alternância PF/Empresa;
   - validação no navegador com mensagens acessíveis;
   - entregar os dados ao seu backend.

   Os IDs e names dos campos são os mesmos das páginas
   originais (email, password, nomeCompleto, cpf, telefonePf,
   emailPf, razaoSocial, nomeFantasia, cnpj, telefonePj,
   emailPj, senhaPj, confirmarSenhaPj, btnPf, btnPj, grupoPf,
   grupoPj, form-cadastro). Única mudança: o "Confirmar senha"
   da Pessoa Física repetia id/name "password"; agora é
   "confirmarSenhaPf".

   Como integrar (escolha um):
   1) Preencha CONFIG.auth.loginEndpoint / cadastroEndpoint
      em js/config.js — o envio é um POST JSON.
   2) Ou defina, em um script carregado ANTES deste:
        window.CasaAuth = {
          login: function (dados) { return fetch(...) },   // Promise
          cadastro: function (dados) { return fetch(...) } // Promise
        };
      A Promise deve resolver em { ok: true, mensagem?, redirect? }
      ou rejeitar / resolver com { ok: false, mensagem }.

   Nenhuma senha é salva no navegador (localStorage/cookies).
   ========================================================== */
(function () {
  "use strict";

  var cfg = (window.CONFIG && window.CONFIG.auth) || {};
  var hooks = window.CasaAuth || {};

  /* ---------- Utilitários ---------- */
  function onlyDigits(v) { return (v || "").replace(/\D/g, ""); }

  function isEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test((v || "").trim());
  }

  function isCPF(value) {
    var c = onlyDigits(value);
    if (c.length !== 11 || /^(\d)\1{10}$/.test(c)) return false;
    var sum = 0, rest, i;
    for (i = 0; i < 9; i++) sum += +c[i] * (10 - i);
    rest = (sum * 10) % 11; if (rest === 10) rest = 0;
    if (rest !== +c[9]) return false;
    sum = 0;
    for (i = 0; i < 10; i++) sum += +c[i] * (11 - i);
    rest = (sum * 10) % 11; if (rest === 10) rest = 0;
    return rest === +c[10];
  }

  function isCNPJ(value) {
    var c = onlyDigits(value);
    if (c.length !== 14 || /^(\d)\1{13}$/.test(c)) return false;
    function digit(len) {
      var weights = len === 12 ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
      var sum = 0;
      for (var i = 0; i < len; i++) sum += +c[i] * weights[i];
      var r = sum % 11;
      return r < 2 ? 0 : 11 - r;
    }
    return digit(12) === +c[12] && digit(13) === +c[13];
  }

  function isPhone(v) {
    var d = onlyDigits(v);
    return d.length === 10 || d.length === 11;
  }

  var masks = {
    cpf: function (v) {
      var d = onlyDigits(v).slice(0, 11);
      return d.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    },
    cnpj: function (v) {
      var d = onlyDigits(v).slice(0, 14);
      return d.replace(/^(\d{2})(\d)/, "$1.$2").replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2").replace(/(\d{4})(\d)/, "$1-$2");
    },
    phone: function (v) {
      var d = onlyDigits(v).slice(0, 11);
      if (d.length <= 2) return d.length ? "(" + d : "";
      if (d.length <= 6) return "(" + d.slice(0, 2) + ") " + d.slice(2);
      if (d.length <= 10) return "(" + d.slice(0, 2) + ") " + d.slice(2, 6) + "-" + d.slice(6);
      return "(" + d.slice(0, 2) + ") " + d.slice(2, 7) + "-" + d.slice(7);
    }
  };

  function passwordLevel(v) {
    if (!v) return 0;
    var score = 0;
    if (v.length >= 8) score++;
    if (/[a-z]/.test(v) && /[A-Z]/.test(v)) score++;
    if (/\d/.test(v)) score++;
    if (/[^A-Za-z0-9]/.test(v) || v.length >= 12) score++;
    return Math.max(1, score);
  }

  function setError(input, message) {
    var errorEl = document.getElementById(input.id + "-erro");
    if (message) {
      input.setAttribute("aria-invalid", "true");
      input.classList.remove("is-valid");
    } else {
      input.removeAttribute("aria-invalid");
      if (input.value) input.classList.add("is-valid");
    }
    if (errorEl) errorEl.textContent = message || "";
  }

  function setStatus(el, type, text) {
    if (!el) return;
    el.className = "form-status" + (type ? " form-status--" + type : "");
    el.textContent = text || "";
  }

  function setLoading(btn, loading) {
    if (!btn) return;
    btn.classList.toggle("is-loading", loading);
    btn.disabled = loading;
    btn.setAttribute("aria-busy", String(loading));
  }

  /* Envia para o hook ou endpoint configurado */
  function send(kind, payload) {
    var hook = hooks[kind];
    var endpoint = kind === "login" ? cfg.loginEndpoint : cfg.cadastroEndpoint;

    if (typeof hook === "function") {
      return Promise.resolve(hook(payload));
    }

    if (endpoint) {
      return fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(payload)
      }).then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (data) {
          return {
            ok: res.ok && data.ok !== false,
            mensagem: data.mensagem || data.message,
            redirect: data.redirect
          };
        });
      });
    }

    // Nenhuma integração configurada: não simula login.
    if (window.console) {
      console.info("[Casa das Chaves] Configure CONFIG.auth." + kind + "Endpoint em js/config.js ou defina window.CasaAuth." + kind + ".");
    }
    return Promise.resolve({ ok: false, pendente: true });
  }

  /* ---------- Mostrar / ocultar senha ---------- */
  document.querySelectorAll("[data-password-toggle]").forEach(function (btn) {
    var input = document.getElementById(btn.getAttribute("aria-controls"));
    if (!input) return;
    var use = btn.querySelector("use");

    btn.addEventListener("click", function () {
      var show = input.type === "password";
      input.type = show ? "text" : "password";
      btn.setAttribute("aria-pressed", String(show));
      btn.setAttribute("aria-label", show ? "Ocultar senha" : "Mostrar senha");
      if (use) use.setAttribute("href", show ? "#i-eye-off" : "#i-eye");
    });
  });

  /* ---------- Máscaras ---------- */
  document.querySelectorAll("[data-mask]").forEach(function (input) {
    var fn = masks[input.getAttribute("data-mask")];
    if (!fn) return;
    input.addEventListener("input", function () {
      input.value = fn(input.value);
    });
  });

  /* ---------- Medidor de força ---------- */
  document.querySelectorAll("[data-strength-for]").forEach(function (meter) {
    var input = document.getElementById(meter.getAttribute("data-strength-for"));
    if (!input) return;
    input.addEventListener("input", function () {
      meter.setAttribute("data-level", String(passwordLevel(input.value)));
      if (!input.value) meter.removeAttribute("data-level");
    });
  });

  /* ==========================================================
     LOGIN
     ========================================================== */
  var loginForm = document.getElementById("form-login");
  if (loginForm) {
    var lEmail = document.getElementById("email");
    var lPass = document.getElementById("password");
    var lStatus = loginForm.querySelector("[data-form-status]");
    var lBtn = loginForm.querySelector("[type=submit]");

    if (/[?&]cadastro=ok/.test(window.location.search)) {
      setStatus(lStatus, "success", "Cadastro concluído. Entre com seu e-mail e senha.");
    }

    function validateLogin() {
      var ok = true;
      if (!isEmail(lEmail.value)) { setError(lEmail, "Digite um e-mail válido, como nome@email.com."); ok = false; }
      else setError(lEmail, "");
      if (!lPass.value) { setError(lPass, "Digite sua senha."); ok = false; }
      else setError(lPass, "");
      return ok;
    }

    [lEmail, lPass].forEach(function (input) {
      input.addEventListener("blur", function () {
        if (input.value || input.getAttribute("aria-invalid")) validateLogin();
      });
    });

    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      setStatus(lStatus, "", "");
      if (!validateLogin()) {
        setStatus(lStatus, "error", "Revise os campos destacados para entrar.");
        loginForm.querySelector('[aria-invalid="true"]').focus();
        return;
      }

      setLoading(lBtn, true);
      send("login", { email: lEmail.value.trim(), password: lPass.value })
        .then(function (res) {
          if (res && res.ok) {
            setStatus(lStatus, "success", res.mensagem || "Acesso liberado. Redirecionando…");
            window.setTimeout(function () {
              window.location.href = res.redirect || cfg.redirectAposLogin || "../index.html";
            }, 900);
          } else if (res && res.pendente) {
            setStatus(lStatus, "info", "O acesso à área do cliente ainda não está disponível. Para atendimento, fale com a gente pelo WhatsApp.");
          } else {
            setStatus(lStatus, "error", (res && res.mensagem) || "E-mail ou senha incorretos. Confira os dados e tente de novo.");
          }
        })
        .catch(function () {
          setStatus(lStatus, "error", "Não foi possível conectar ao servidor. Verifique sua internet e tente de novo.");
        })
        .then(function () { setLoading(lBtn, false); });
    });
  }

  /* ==========================================================
     CADASTRO
     ========================================================== */
  var cadForm = document.getElementById("form-cadastro");
  if (cadForm) {
    var seg = document.querySelector("[data-segmented]");
    var btnPf = document.getElementById("btnPf");
    var btnPj = document.getElementById("btnPj");
    var grupoPf = document.getElementById("grupoPf");
    var grupoPj = document.getElementById("grupoPj");
    var cStatus = cadForm.querySelector("[data-form-status]");
    var cBtn = cadForm.querySelector("[type=submit]");
    var tipo = "pf";

    function setTipo(novo) {
      tipo = novo;
      var pf = novo === "pf";
      btnPf.setAttribute("aria-pressed", String(pf));
      btnPj.setAttribute("aria-pressed", String(!pf));
      btnPf.classList.toggle("ativo", pf);
      btnPj.classList.toggle("ativo", !pf);
      if (seg) seg.setAttribute("data-active", novo);
      grupoPf.hidden = !pf;
      grupoPj.hidden = pf;
      // campos do grupo oculto ficam desativados: não validam nem são enviados
      grupoPf.querySelectorAll("input").forEach(function (i) { i.disabled = !pf; });
      grupoPj.querySelectorAll("input").forEach(function (i) { i.disabled = pf; });
      setStatus(cStatus, "", "");
    }

    btnPf.addEventListener("click", function () { setTipo("pf"); });
    btnPj.addEventListener("click", function () { setTipo("pj"); });
    setTipo("pf");

    var rules = {
      nomeCompleto: function (v) { return v.trim().split(/\s+/).length >= 2 ? "" : "Digite seu nome e sobrenome."; },
      cpf: function (v) { return isCPF(v) ? "" : "CPF inválido. Confira os 11 números."; },
      telefonePf: function (v) { return isPhone(v) ? "" : "Informe um telefone com DDD."; },
      emailPf: function (v) { return isEmail(v) ? "" : "Digite um e-mail válido, como nome@email.com."; },
      password: function (v) { return v.length >= 8 ? "" : "A senha precisa ter pelo menos 8 caracteres."; },
      confirmarSenhaPf: function (v) { return v && v === document.getElementById("password").value ? "" : "As senhas não são iguais."; },
      razaoSocial: function (v) { return v.trim().length >= 3 ? "" : "Informe a razão social."; },
      nomeFantasia: function () { return ""; },
      cnpj: function (v) { return isCNPJ(v) ? "" : "CNPJ inválido. Confira os 14 números."; },
      telefonePj: function (v) { return isPhone(v) ? "" : "Informe um telefone com DDD."; },
      emailPj: function (v) { return isEmail(v) ? "" : "Digite um e-mail válido, como contato@empresa.com."; },
      senhaPj: function (v) { return v.length >= 8 ? "" : "A senha precisa ter pelo menos 8 caracteres."; },
      confirmarSenhaPj: function (v) { return v && v === document.getElementById("senhaPj").value ? "" : "As senhas não são iguais."; }
    };

    function validateField(input) {
      var rule = rules[input.id];
      if (!rule || input.disabled) return true;
      var msg = rule(input.value);
      setError(input, msg);
      return !msg;
    }

    cadForm.querySelectorAll("input").forEach(function (input) {
      input.addEventListener("blur", function () {
        if (input.value || input.getAttribute("aria-invalid")) validateField(input);
      });
    });

    cadForm.addEventListener("submit", function (event) {
      event.preventDefault();
      setStatus(cStatus, "", "");

      var group = tipo === "pf" ? grupoPf : grupoPj;
      var inputs = group.querySelectorAll("input");
      var ok = true;
      inputs.forEach(function (input) { if (!validateField(input)) ok = false; });

      if (!ok) {
        setStatus(cStatus, "error", "Revise os campos destacados para concluir o cadastro.");
        var first = group.querySelector('[aria-invalid="true"]');
        if (first) first.focus();
        return;
      }

      var dados = { tipo: tipo };
      inputs.forEach(function (input) {
        if (/^confirmar/.test(input.name)) return; // a confirmação não vai ao servidor
        var v = input.value.trim();
        if (input.getAttribute("data-mask")) v = onlyDigits(v);
        dados[input.name] = input.type === "password" ? input.value : v;
      });

      setLoading(cBtn, true);
      send("cadastro", dados)
        .then(function (res) {
          if (res && res.ok) {
            setStatus(cStatus, "success", res.mensagem || "Cadastro concluído. Redirecionando para o login…");
            window.setTimeout(function () {
              window.location.href = res.redirect || cfg.redirectAposCadastro || "login.html";
            }, 1100);
          } else if (res && res.pendente) {
            setStatus(cStatus, "info", "O cadastro online ainda não está disponível. Seus dados não foram enviados. Para atendimento, fale com a gente pelo WhatsApp.");
          } else {
            setStatus(cStatus, "error", (res && res.mensagem) || "Não foi possível concluir o cadastro. Tente de novo em instantes.");
          }
        })
        .catch(function () {
          setStatus(cStatus, "error", "Não foi possível conectar ao servidor. Verifique sua internet e tente de novo.");
        })
        .then(function () { setLoading(cBtn, false); });
    });
  }
})();
