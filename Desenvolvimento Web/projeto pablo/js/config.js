/* ==========================================================
   Configuração central — Casa das Chaves
   Mantém a mesma ideia do config.js original: dados que mudam
   ficam aqui. (Os textos estáticos das páginas também trazem
   esses dados no HTML, para SEO e para funcionar sem JS.)
   ========================================================== */
window.CONFIG = {
  empresa: {
    nome: "Casa das Chaves",
    telefone: "(47) 99601-1659",
    telefoneLink: "+5547996011659",
    whatsapp: "5547996011659", // apenas números: país + DDD + número
    endereco: "Rua Dois de Setembro, 4405 - Itoupava Norte, Blumenau - SC, 89053-200",
    horario: "Seg a Sex: 8h às 18h | Sáb: 8h às 12h"
  },

  whatsappMensagemPadrao: "Olá! Gostaria de saber mais sobre os serviços da Casa das Chaves.",

  redesSociais: {
    instagram: "https://www.instagram.com/_casadaschaves_/"
  },

  /* ----------------------------------------------------------
     Integração de autenticação
     Os arquivos js/scriptLogin.js e js/scriptCadastro.js citados
     nas páginas antigas não estavam na pasta. Quando o backend
     estiver pronto, preencha os endpoints abaixo OU registre
     seus próprios handlers em window.CasaAuth (veja js/auth.js).
     Enquanto vazios, os formulários validam os dados e avisam
     que o acesso ainda não está disponível — nada é salvo.
     ---------------------------------------------------------- */
  auth: {
    loginEndpoint: "",      // ex.: "/api/auth/login"
    cadastroEndpoint: "",   // ex.: "/api/auth/cadastro"
    redirectAposLogin: "../index.html",
    redirectAposCadastro: "login.html?cadastro=ok"
  }
};

/* Monta um link de WhatsApp com mensagem opcional */
window.waLink = function (mensagem) {
  var texto = mensagem || window.CONFIG.whatsappMensagemPadrao;
  return "https://api.whatsapp.com/send?phone=" + window.CONFIG.empresa.whatsapp +
    "&text=" + encodeURIComponent(texto);
};
