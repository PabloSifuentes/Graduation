document.addEventListener('DOMContentLoaded', () => {
    const card = document.getElementById('card');
    const btnRegister = document.getElementById('btnRegister');
    const btnLogin = document.getElementById('btnLogin');
    const switchLinks = document.querySelectorAll('a[data-target]');

    // Transição via botões do Overlay
    if (btnRegister) {
        btnRegister.addEventListener('click', () => card.classList.add('active'));
    }

    if (btnLogin) {
        btnLogin.addEventListener('click', () => card.classList.remove('active'));
    }

    // Transição via links "Cadastre-se" e "Faça login"
    switchLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-target');
            if (target === 'register') {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    });
});