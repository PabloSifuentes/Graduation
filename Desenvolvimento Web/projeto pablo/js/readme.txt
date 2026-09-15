# Casa das Chaves - Institucional

Site profissional, moderno e ultra veloz desenvolvido sem frameworks.

## 📂 Estrutura de Diretórios
- `index.html`: Arquivo principal (Ponto de entrada).
- `css/`: Folhas de estilo (style.css, responsive.css, animations.css).
- `js/`: Scripts vitais.
  - `config.js`: Centraliza Informações que mudam com frequência (Whatsapp, Tel, Maps, Redes).
  - `products.js`: Banco de dados estático dos produtos, simulando uma requisição.
  - `main.js`: Lógicas visuais, navegação, modal e filtros.
- `assets/images/`: Imagens do projeto.

## 🛠 Como editar as Informações Principais?
Edite o arquivo `js/config.js` para alterar telefone, localização do mapa, nome, redes sociais e WhatsApp. As alterações irão refletir automaticamente em **todo o layout**.

## 📦 Como adicionar Produtos?
Edite a constante no arquivo `js/products.js` e adicione objetos seguindo o formato:
```javascript
{
    id: 99,
    nome: "Novo Produto",
    categoria: "Chaves", // Deve bater com os filtros definidos no HTML
    descricao: "Breve descrição",
    imagem: "url/ou/caminho/da/imagem.jpg"
}