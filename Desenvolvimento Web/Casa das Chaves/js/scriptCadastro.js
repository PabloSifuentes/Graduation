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

/**
 * ============================================
 * CADASTRO - TROCA ENTRE PESSOA FÍSICA E EMPRESA
 * ============================================
 * 
 * Funcionamento:
 * - Ao clicar em "Pessoa Física" ou "Empresa", o seletor desliza
 * - O grupo de campos correspondente é exibido com animação fade
 * - A classe 'ativo' controla a visibilidade e o estilo do seletor
 */

document.addEventListener('DOMContentLoaded', function() {

    // Elementos do seletor
    const btnPf = document.getElementById('btnPf');
    const btnPj = document.getElementById('btnPj');
    const seletorBg = document.getElementById('seletorBg');

    // Grupos de campos
    const grupoPf = document.getElementById('grupoPf');
    const grupoPj = document.getElementById('grupoPj');

    // Estado atual: 'pf' ou 'pj'
    let tipoAtivo = 'pf';

    /**
     * Alterna entre Pessoa Física e Empresa
     * @param {string} tipo - 'pf' ou 'pj'
     */
    function alternarTipo(tipo) {
        if (tipo === tipoAtivo) return; // já está ativo

        // Atualiza estado
        tipoAtivo = tipo;

        // --- 1. Move o indicador (seletor-bg) ---
        if (tipo === 'pf') {
            // Move para a esquerda (posição inicial)
            seletorBg.style.transform = 'translateX(0)';
        } else {
            // Move para a direita (largura do botão + espaçamento)
            // Como são 2 botões iguais, desloca 100% da largura do wrapper - margem
            const wrapperWidth = seletorBg.parentElement.offsetWidth;
            const bgWidth = seletorBg.offsetWidth;
            // Desloca exatamente a largura de um botão (metade do wrapper - padding)
            const deslocamento = wrapperWidth / 2 - 4;
            seletorBg.style.transform = `translateX(${deslocamento}px)`;
        }

        // --- 2. Alterna classe 'ativo' nos botões ---
        btnPf.classList.toggle('ativo', tipo === 'pf');
        btnPj.classList.toggle('ativo', tipo === 'pj');

        // --- 3. Alterna visibilidade dos grupos de campos ---
        // Remove 'ativo' de ambos
        grupoPf.classList.remove('ativo');
        grupoPj.classList.remove('ativo');

        // Força reflow para reiniciar a animação
        void grupoPf.offsetWidth;

        // Adiciona 'ativo' no grupo correspondente
        if (tipo === 'pf') {
            grupoPf.classList.add('ativo');
        } else {
            grupoPj.classList.add('ativo');
        }
    }

    // --- Eventos dos botões ---
    btnPf.addEventListener('click', function() {
        alternarTipo('pf');
    });

    btnPj.addEventListener('click', function() {
        alternarTipo('pj');
    });

    // --- Inicialização: garante que PF esteja visível e seletor na posição correta ---
    // Define posição inicial do seletor (esquerda)
    seletorBg.style.transform = 'translateX(0)';
    grupoPf.classList.add('ativo');
    grupoPj.classList.remove('ativo');
    btnPf.classList.add('ativo');
    btnPj.classList.remove('ativo');
    tipoAtivo = 'pf';

    // Ajusta a posição do seletor após o layout (para evitar erro de cálculo)
    window.addEventListener('load', function() {
        // Pequeno delay para garantir que o layout esteja pronto
        setTimeout(() => {
            if (tipoAtivo === 'pj') {
                const wrapperWidth = seletorBg.parentElement.offsetWidth;
                const deslocamento = wrapperWidth / 2 - 4;
                seletorBg.style.transform = `translateX(${deslocamento}px)`;
            } else {
                seletorBg.style.transform = 'translateX(0)';
            }
        }, 50);
    });

    // Recalcula ao redimensionar a tela (para manter o seletor na posição correta)
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (tipoAtivo === 'pj') {
                const wrapperWidth = seletorBg.parentElement.offsetWidth;
                const deslocamento = wrapperWidth / 2 - 4;
                seletorBg.style.transform = `translateX(${deslocamento}px)`;
            } else {
                seletorBg.style.transform = 'translateX(0)';
            }
        }, 100);
    });

});