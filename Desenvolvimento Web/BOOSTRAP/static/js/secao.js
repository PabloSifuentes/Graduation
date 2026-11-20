// Conteúdo de cada seção da Página pessoal. Preencha os campos vazios quando quiser.
const dados = {
    hobbies: {
        titulo: "Moto",
        subtitulo: "Pêndulo (hanging off)",
        imagem: "https://www.pkmracing.com.br/crisoft/fotos/0112a55criacaodesitescrisoft.jpg",
        texto: [
            "O piloto desloca o corpo (quadril e tronco) para a parte interna da curva, permitindo que a moto fique menos inclinada para o mesmo raio de curva, aumentando a aderência.",
            "A prática é adquirida conforme o tempo de pilotagem nas próprias estradas de Blumenau."
        ]
    },
    viagens: {
        titulo: "Brasil",
        subtitulo: "Pico da Malwee",
        imagem: "https://i.pinimg.com/736x/a9/3a/42/a93a42551ca5c71c82b29f24daac8a86.jpg",
        texto: ["Aproveitar uma ampla área verde a 550 metros de altitude com entrada gratuita e excelente infraestrutura."]
    },
    escola: {
        titulo: "Escolas que estudei",
        lista: [
            "Senai: Técnico Superior em Análise e Desenvolvimento de Sistemas (jul 2023 – jul 2025)",
            "E.E.B. João Widermann: Ensino Médio (concluído em dez 2022)"
        ]
    },
    familia: {
        titulo: "Minha família",
        imagem: "https://img.magnific.com/fotos-gratis/silhuetas-de-membros-da-familia-de-tiro-completo-ao-ar-livre_23-2150039658.jpg?semt=ais_hybrid&w=740&q=80",
        texto: []
    },
    conquistas: { titulo: "Minhas conquistas", texto: [] },
    prateleira: { titulo: "Minha prateleira", texto: [] },
    softskills: {
        titulo: "Soft skills",
        lista: [
            "Agilidade e facilidade de adaptação",
            "Foco em organização e atenção a detalhes",
            "Trabalho em equipe e postura calma",
            "Interesse contínuo em aprendizado"
        ]
    }
};

const chave = new URLSearchParams(location.search).get("s");
const d = dados[chave] || dados.hobbies;

document.title = `${d.titulo} | Página pessoal`;
document.getElementById("titulo").textContent = d.titulo;

const sub = document.getElementById("subtitulo");
if (d.subtitulo) sub.textContent = d.subtitulo; else sub.remove();

const img = document.getElementById("imagem");
if (d.imagem) {
    img.src = d.imagem;
    img.alt = d.titulo;
    img.classList.remove("d-none");
}

const conteudo = document.getElementById("conteudo");
(d.texto || []).forEach(t => {
    const p = document.createElement("p");
    p.textContent = t;
    conteudo.append(p);
});

if (d.lista) {
    const ul = document.createElement("ul");
    ul.className = "list-group list-group-flush text-start";
    d.lista.forEach(t => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = t;
        ul.append(li);
    });
    conteudo.append(ul);
}

if (!conteudo.hasChildNodes()) {
    conteudo.innerHTML = '<p class="text-muted">Conteúdo em breve.</p>';
}
