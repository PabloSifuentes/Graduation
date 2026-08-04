// Seleciona os elementos do HTML

const radiosTipoPessoa = document.querySelectorAll('input[name="tipo_pessoa"]');
const camposPf = document.getElementById('campos-pf');
const camposPj = document.getElementById('campos-pj');

// Escuta a mudança de seleção nos botões de rádio
radiosTipoPessoa.forEach(radio => {radio.addEventListener('change', (event) => {
    if (event.target.value === 'pj') {
        camposPf.hidden = true;     // Esconder o campo do CPF
        camposPj.hidden = false;    // Exibe o campo do CNPJ
    } else {
        camposPf.hidden = false;    // Exibe o campo do CPF
        camposPj.hidden = true;     // Esconde o campo do CNPJ
     }
 });
});

// Direcionando cadastro para página de Login

// Captura o formulario pelo ID
const formCadastro = document.getElementById('form-cadastro');

formCadastro.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Cadastro realizado com sucesso!');
    window.location.href = 'login.html';
})