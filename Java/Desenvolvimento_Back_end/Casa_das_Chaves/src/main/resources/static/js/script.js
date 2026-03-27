// Aguarda o DOM ser completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    
    // Verifica se está na página de cadastro
    const registerForm = document.querySelector('form[th\\:action*="/cadastro"]');
    const confirmSenha = document.getElementById('confirmSenha');
    const senha = document.getElementById('senha');

    // Função para validar a confirmação de senha em tempo real
    function checkPasswordMatch() {
        if (senha && confirmSenha) {
            if (senha.value !== confirmSenha.value) {
                confirmSenha.style.borderColor = '#ff4444';
                confirmSenha.style.backgroundColor = '#fff5f5';
                return false;
            } else {
                confirmSenha.style.borderColor = '#ddd';
                confirmSenha.style.backgroundColor = 'white';
                return true;
            }
        }
        return true;
    }

    // Função para validar o formulário de cadastro
    function validateRegisterForm(event) {
        if (senha && confirmSenha) {
            const password = senha.value;
            const confirmPassword = confirmSenha.value;

            // Verifica se as senhas coincidem
            if (password !== confirmPassword) {
                event.preventDefault();
                alert('❌ As senhas não coincidem! Por favor, verifique.');
                confirmSenha.focus();
                return false;
            }

            // Verifica tamanho mínimo da senha
            if (password.length < 6) {
                event.preventDefault();
                alert('❌ A senha deve ter pelo menos 6 caracteres!');
                senha.focus();
                return false;
            }

            // Verifica se a senha não está vazia
            if (password.trim() === '') {
                event.preventDefault();
                alert('❌ A senha não pode estar vazia!');
                senha.focus();
                return false;
            }
        }
        return true;
    }

    // Adiciona validação em tempo real para confirmação de senha (apenas na página de cadastro)
    if (senha && confirmSenha) {
        senha.addEventListener('keyup', checkPasswordMatch);
        confirmSenha.addEventListener('keyup', checkPasswordMatch);
    }

    // Adiciona validação no envio do formulário de cadastro
    if (registerForm) {
        registerForm.addEventListener('submit', validateRegisterForm);
    }

    // Feedback visual para campos obrigatórios (opcional)
    const inputs = document.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = '#ff4444';
                this.style.backgroundColor = '#fff5f5';
            } else {
                this.style.borderColor = '#ddd';
                this.style.backgroundColor = 'white';
            }
        });

        input.addEventListener('focus', function() {
            this.style.borderColor = '#667eea';
            this.style.backgroundColor = 'white';
        });
    });
});