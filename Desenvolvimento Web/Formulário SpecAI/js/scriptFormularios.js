// ============================================
// DOUBLE SLIDE LOGIN/CADASTRO - CONTROLE
// ============================================

(function() {
    'use strict';

    // ========== ELEMENTOS DOM ==========
    const card = document.getElementById('card');
    const btnLogin = document.getElementById('btnLogin');
    const btnRegister = document.getElementById('btnRegister');
    const switchLinks = document.querySelectorAll('.switch-link');

    // ========== FUNÇÕES DE NAVEGAÇÃO ==========
    /**
     * Alterna para o estado de Login
     * Remove a classe 'register' do card
     */
    function showLogin() {
        card.classList.remove('register');
    }

    /**
     * Alterna para o estado de Cadastro
     * Adiciona a classe 'register' ao card
     */
    function showRegister() {
        card.classList.add('register');
    }

    /**
     * Alterna entre estados baseado no target
     * @param {string} target - 'login' ou 'register'
     */
    function toggleSlide(target) {
        if (target === 'login') {
            showLogin();
        } else if (target === 'register') {
            showRegister();
        }
    }

    // ========== EVENTOS ==========
    // Botões do Overlay
    btnLogin.addEventListener('click', function(e) {
        e.preventDefault();
        showLogin();
    });

    btnRegister.addEventListener('click', function(e) {
        e.preventDefault();
        showRegister();
    });

    // Links de alternância nos formulários
    switchLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            toggleSlide(target);
        });
    });

    // ========== SUBMISSÃO DOS FORMULÁRIOS ==========
    // Login - apenas prevent default para demonstração
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Aqui você pode adicionar lógica de autenticação
            console.log('Login submetido');
            // Exemplo de feedback visual
            const btn = this.querySelector('.btn-primary');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Entrando...';
            btn.disabled = true;
            
            setTimeout(function() {
                btn.innerHTML = originalText;
                btn.disabled = false;
                alert('Login realizado com sucesso! (Demo)');
            }, 1500);
        });
    }

    // Cadastro - apenas prevent default para demonstração
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação simples de senha
            const senha = this.querySelector('input[type="password"]');
            const confirmar = this.querySelectorAll('input[type="password"]')[1];
            
            if (senha && confirmar && senha.value !== confirmar.value) {
                alert('As senhas não coincidem!');
                return;
            }
            
            console.log('Cadastro submetido');
            const btn = this.querySelector('.btn-primary');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cadastrando...';
            btn.disabled = true;
            
            setTimeout(function() {
                btn.innerHTML = originalText;
                btn.disabled = false;
                alert('Cadastro realizado com sucesso! (Demo)');
                showLogin(); // Redireciona para login após cadastro
            }, 1500);
        });
    }

    // ========== KEYBOARD SHORTCUT ==========
    document.addEventListener('keydown', function(e) {
        // Tecla ESC para resetar para login
        if (e.key === 'Escape') {
            showLogin();
        }
    });

    // ========== INICIALIZAÇÃO ==========
    // Garantir que inicia em Login
    showLogin();

    console.log('Double Slide Login/Cadastro inicializado!');
})();