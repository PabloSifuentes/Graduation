async function carregarNavbar() {
    const container = document.getElementById("navbar");
    if (!container) return;

    try {
        const resposta = await fetch("components/navbar.html");
        if (!resposta.ok) throw new Error("Erro ao carregar a navbar");

        container.innerHTML = await resposta.text();

        // Marca como ativo o link da página atual (secao.html pertence à Página pessoal)
        let pagina = location.pathname.split("/").pop() || "index.html";
        if (pagina === "secao.html") pagina = "paginaPessoal.html";

        container.querySelectorAll(".nav-link, .dropdown-item").forEach(link => {
            if (link.getAttribute("href") !== pagina) return;
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
            link.closest(".dropdown")?.querySelector(".dropdown-toggle")?.classList.add("active");
        });
    } catch (erro) {
        console.error(erro);
    }
}

carregarNavbar();