# Casa das Chaves — site institucional

Site estático (HTML, CSS e JavaScript puros) da Casa das Chaves, chaveiro em Blumenau desde 2001.
Funciona em qualquer hospedagem tradicional: basta enviar os arquivos por FTP. Não há build, framework ou dependência para instalar.

## Estrutura

```text
/
├── index.html                 Página inicial
├── login.html, cadastro.html  Redirecionam para pages/ (mantêm links antigos funcionando)
├── pages/
│   ├── sobre.html             ├── fechaduras.html
│   ├── servicos.html          ├── controles.html
│   ├── chaveiro-24h.html      ├── cutelaria.html
│   ├── chaves-codificadas.html├── contato.html
│   ├── automotivo.html        ├── faq.html
│   ├── login.html             ├── cadastro.html
│   ├── privacidade.html       └── termos.html
├── css/
│   ├── reset.css        Reset moderno
│   ├── variables.css    Tokens: cores, fontes, raios, espaçamentos, movimento
│   ├── global.css       Base, tipografia, botões, ícones, divisor de "segredo de chave"
│   ├── navbar.css       Navbar transparente, submenu, gaveta mobile, botão flutuante
│   ├── hero.css         Hero da home e cabeçalho das páginas internas
│   ├── sections.css     Seções (números, sobre, automotivo, 24h, FAQ, mapa…)
│   ├── cards.css        Cards de serviço, listas utilitárias, contato
│   ├── forms.css        Formulários, accordion, login e cadastro
│   ├── footer.css       Rodapé
│   ├── animations.css   Keyframes, revelação ao rolar, prefers-reduced-motion
│   └── responsive.css   Breakpoints (1180, 1024, 768, 480, 390, 360)
├── js/
│   ├── config.js        Dados da empresa e pontos de integração do login/cadastro
│   ├── navbar.js        Navbar sólida ao rolar
│   ├── menu.js          Submenu de serviços e gaveta mobile (foco preso, Esc fecha)
│   ├── animations.js    IntersectionObserver, contadores e parallax leve
│   ├── faq.js           Accordion acessível
│   ├── main.js          Ano do rodapé e formulário de contato → WhatsApp
│   └── auth.js          Interface de login/cadastro (validação, máscaras, envio)
└── assets/
    ├── images/          Imagens em AVIF + WebP e ilustração SVG da chave automotiva
    ├── icons/           sprite.svg (fonte dos ícones) e favicons
    ├── logos/           Logo da Casa das Chaves
    └── fonts/           Reservado para fontes locais (ver abaixo)
```

## Onde editar

| O que mudar | Onde |
|---|---|
| Cores, fontes, raios, larguras | `css/variables.css` |
| Telefone, WhatsApp, mensagem padrão, Instagram | `js/config.js` **e** o texto das páginas (os dados também estão no HTML para SEO e para funcionar sem JS) |
| Endpoints de login e cadastro | `js/config.js` → `auth` |

## Login e cadastro — integração

As páginas antigas chamavam `js/scriptLogin.js` e `js/scriptCadastro.js`, mas **esses arquivos não estavam na pasta**. Por isso não havia lógica de autenticação para preservar. O que foi feito:

- Mantidos os mesmos `id` e `name` dos campos: `email`, `password` (login) e `nomeCompleto`, `cpf`, `telefonePf`, `emailPf`, `password`, `razaoSocial`, `nomeFantasia`, `cnpj`, `telefonePj`, `emailPj`, `senhaPj`, `confirmarSenhaPj`, além de `form-cadastro`, `btnPf`, `btnPj`, `grupoPf`, `grupoPj`, `data-tipo` e a classe `ativo` no seletor.
- **Correção:** o "Confirmar senha" da Pessoa Física repetia `id="password"` e `name="password"`. Agora é `confirmarSenhaPf`.
- O formulário de login ganhou `id="form-login"`.
- `js/auth.js` faz só a interface: mostrar senha, máscaras de CPF/CNPJ/telefone, validação (CPF e CNPJ com dígito verificador, e-mail, telefone, senha com 8+ caracteres e confirmação) e mensagens acessíveis.

Para ligar ao backend, escolha uma opção:

1. **Endpoints** — em `js/config.js`:
   ```js
   auth: { loginEndpoint: "/api/auth/login", cadastroEndpoint: "/api/auth/cadastro", ... }
   ```
   O envio é `POST` JSON. A resposta pode trazer `{ ok, mensagem, redirect }`.

2. **Seu próprio script** — carregue antes de `auth.js`:
   ```js
   window.CasaAuth = {
     login: function (dados) { /* retorna Promise → { ok, mensagem?, redirect? } */ },
     cadastro: function (dados) { /* idem */ }
   };
   ```

Payload do cadastro (Pessoa Física): `{ tipo: "pf", nomeCompleto, cpf, telefonePf, emailPf, password }` — CPF e telefone vão só com números; a confirmação de senha não é enviada.
Empresa: `{ tipo: "pj", razaoSocial, nomeFantasia, cnpj, telefonePj, emailPj, senhaPj }`.

Enquanto nenhuma integração estiver configurada, os formulários validam os dados e avisam que o acesso online ainda não está disponível. **Nada é salvo no navegador** e nenhum login é simulado.

### Pontos de segurança para o backend
- A validação no navegador é só conveniência: repita todas as validações no servidor.
- Guarde senhas apenas com hash forte (bcrypt/argon2), nunca em texto.
- Use HTTPS, sessão em cookie `HttpOnly` + `Secure` + `SameSite`, limite de tentativas no login e proteção CSRF se usar cookies.
- Não use `localStorage` para tokens de sessão.

## Formulário de contato

Não há backend: ao enviar, o site valida os campos e abre o WhatsApp com a mensagem pronta (mesmo comportamento do site anterior).

## Fontes

DM Sans (títulos e texto) e Space Grotesk (números e elementos técnicos) são carregadas do Google Fonts com `preconnect` e `display=swap`.
Para hospedar localmente, baixe os arquivos `.woff2` para `assets/fonts/`, crie as regras `@font-face` no topo de `css/variables.css` e remova os `<link>` do Google Fonts das páginas.

## Decisões e observações

- **Uma linha de JS inline** em cada página (`document.documentElement.className = "js"`) evita que o conteúdo "pisque" antes das animações. Sem JS, todo o conteúdo aparece normalmente.
- **Ícones**: cada página traz embutidos apenas os ícones que usa (a fonte é `assets/icons/sprite.svg`). Isso evita depender de Font Awesome e funciona também abrindo o arquivo direto no navegador.
- **Cabeçalho e rodapé** se repetem em cada HTML — é o normal para site estático sem build. Ao alterar um link do menu, altere em todas as páginas (buscar e substituir no editor resolve).
- **Imagens**: as duas fotos que já existiam no projeto foram recoloridas no azul da marca e convertidas para AVIF/WebP. A foto da mão com luva foi recortada para mostrar só a fechadura e a chave.
- **Conteúdo**: nada de preços, marcas atendidas, certificações, número de clientes ou depoimentos inventados. Os números da home são os definidos no briefing (25+, 24H, 4+, 100%).
- **Catálogo de produtos removido**: o `products.js` antigo listava produtos e descrições que não podiam ser confirmados (fechadura biométrica, "compatível com as principais montadoras", fotos de banco de imagem). As páginas de categoria (controles, fechaduras, cutelaria) substituem o catálogo sem inventar itens.
- **Política de privacidade e termos** são modelos iniciais. Revise antes de publicar.
- **Dados de estrutura (Schema.org)**: `Locksmith` (home, sobre, contato), `Service` nas páginas de serviço, `FAQPage` (home, FAQ, chaves codificadas) e `BreadcrumbList`.

## Arquivos antigos

Versões anteriores dos arquivos substituídos estão em `_legado/`. Os arquivos abaixo **não são mais usados** e podem ser apagados quando você quiser:

- `css/style.css`, `css/styleLogin.css`, `css/styleCadastro.css`
- `js/products.js`, `js/readme.txt`
- a pasta `assests/` (as imagens foram otimizadas para `assets/images/`)
- a pasta `_legado/`, depois de conferir

## Testado

Larguras 1920, 1440, 1280, 1024, 768, 480, 390 e 360 px sem rolagem horizontal; navegação por teclado (menu, gaveta, submenu, FAQ com setas), `prefers-reduced-motion`, links internos e imagens sem quebra.
