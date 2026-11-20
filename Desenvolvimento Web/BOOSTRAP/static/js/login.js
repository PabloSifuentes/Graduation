document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');

    const mostrarCadastro = () => container.classList.add('right-panel-active');
    const mostrarLogin = () => container.classList.remove('right-panel-active');

    document.getElementById('signUp').addEventListener('click', mostrarCadastro);
    document.getElementById('signIn').addEventListener('click', mostrarLogin);

    // Botões de alternar que aparecem só no celular
    document.querySelectorAll('[data-alternar]').forEach(botao => {
        botao.addEventListener('click', () => {
            botao.dataset.alternar === 'cadastro' ? mostrarCadastro() : mostrarLogin();
        });
    });

    // Simulação de login (substituir por autenticação real)
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        window.location.href = 'index.html';
    });

    // Simulação de cadastro (substituir por envio real ao back-end)
    document.getElementById('cadastroForm').addEventListener('submit', (e) => {
        e.preventDefault();
        e.target.reset();
        mostrarLogin();
    });
});