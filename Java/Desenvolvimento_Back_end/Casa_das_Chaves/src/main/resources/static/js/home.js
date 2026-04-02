/**
 * =====================================================
 * SLIDER / CARROSSEL AUTOMÁTICO - CASA DAS CHAVES
 * VERSÃO MINIMALISTA (SEM BOTÕES DE NAVEGAÇÃO)
 * =====================================================
 */

class HeroSliderMinimal {
    constructor() {
        // Elementos do DOM para o Modelo 4
        this.slides = document.querySelectorAll('.slide-minimal');
        this.sliderContainer = document.querySelector('.hero-slider-minimal');

        // Configurações
        this.currentSlide = 0;
        this.slideInterval = null;
        this.intervalTime = 6000;
        this.isPlaying = true;

        // Inicialização
        this.init();
    }

    init() {
        if (this.slides.length === 0) {
            console.log('Nenhum slide encontrado para o Modelo 4');
            return;
        }
        this.startAutoSlide();
        this.setupHoverPause();
        console.log(`Slider Minimalista inicializado com ${this.slides.length} slides`);
    }

    setupHoverPause() {
        if (!this.sliderContainer) return;

        this.sliderContainer.addEventListener('mouseenter', () => {
            this.stopAutoSlide();
            this.isPlaying = false;
        });

        this.sliderContainer.addEventListener('mouseleave', () => {
            this.startAutoSlide();
            this.isPlaying = true;
        });
    }

    nextSlide() {
        // Remove active do slide atual
        this.slides[this.currentSlide].classList.remove('active');

        // Calcula próximo slide
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;

        // Adiciona active ao próximo slide
        this.slides[this.currentSlide].classList.add('active');
    }

    startAutoSlide() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
        }

        this.slideInterval = setInterval(() => {
            if (this.isPlaying) {
                this.nextSlide();
            }
        }, this.intervalTime);
    }

    stopAutoSlide() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }

    destroy() {
        this.stopAutoSlide();
        this.isPlaying = false;
    }
}

// Aguarda o DOM carregar antes de inicializar
document.addEventListener('DOMContentLoaded', function() {
    const sliderSection = document.querySelector('.hero-slider-minimal');
    if (sliderSection) {
        window.heroSlider = new HeroSliderMinimal();
    }
});

// ====================== GERENCIAMENTO DO CARRINHO ======================
const STORAGE_KEY = 'casaDasChavesCarrinho';
const contadorElemento = document.getElementById('contadorCarrinho');

function obterCarrinho() {
    const carrinhoSalvo = localStorage.getItem(STORAGE_KEY);
    return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
}

function salvarCarrinho(carrinho) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(carrinho));
    atualizarContador();
}

function atualizarContador() {
    const carrinho = obterCarrinho();
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    if (contadorElemento) {
        contadorElemento.textContent = totalItens;
        contadorElemento.style.transform = 'scale(1.2)';
        setTimeout(() => {
            contadorElemento.style.transform = 'scale(1)';
        }, 200);
    }
}

function adicionarAoCarrinho(nome, preco, quantidade = 1) {
    const carrinho = obterCarrinho();
    const itemExistente = carrinho.find(item => item.nome === nome);

    if (itemExistente) {
        itemExistente.quantidade += quantidade;
    } else {
        carrinho.push({
            id: Date.now(),
            nome: nome,
            preco: preco,
            quantidade: quantidade
        });
    }

    salvarCarrinho(carrinho);
    mostrarMensagemTemporaria(`"${nome}" adicionado ao carrinho!`, 'sucesso');
}

function mostrarMensagemTemporaria(mensagem, tipo = 'info') {
    let mensagemDiv = document.getElementById('mensagem-flutuante');

    if (!mensagemDiv) {
        mensagemDiv = document.createElement('div');
        mensagemDiv.id = 'mensagem-flutuante';
        mensagemDiv.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-weight: bold;
            z-index: 9999;
            animation: fadeInOut 3s ease forwards;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        document.body.appendChild(mensagemDiv);

        if (!document.querySelector('#animacao-mensagem')) {
            const style = document.createElement('style');
            style.id = 'animacao-mensagem';
            style.textContent = `
                @keyframes fadeInOut {
                    0% { opacity: 0; transform: translateY(20px); }
                    15% { opacity: 1; transform: translateY(0); }
                    85% { opacity: 1; transform: translateY(0); }
                    100% { opacity: 0; transform: translateY(20px); visibility: hidden; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    const cores = {
        sucesso: '#48bb78',
        erro: '#f56565',
        info: '#4299e1'
    };

    mensagemDiv.style.backgroundColor = cores[tipo] || cores.info;
    mensagemDiv.textContent = mensagem;

    setTimeout(() => {
        if (mensagemDiv && mensagemDiv.parentNode) {
            mensagemDiv.remove();
        }
    }, 3000);
}

// Configuração dos botões de adicionar ao carrinho
document.addEventListener('DOMContentLoaded', function() {
    const botoesAdicionar = document.querySelectorAll('.btn-adicionar');

    botoesAdicionar.forEach(botao => {
        botao.addEventListener('click', function(event) {
            event.preventDefault();

            const nomeProduto = this.getAttribute('data-nome');
            const precoTexto = this.getAttribute('data-preco');

            if (nomeProduto && precoTexto) {
                const preco = parseFloat(precoTexto);
                if (!isNaN(preco)) {
                    adicionarAoCarrinho(nomeProduto, preco, 1);
                }
            }
        });
    });

    atualizarContador();

    const btnLogout = document.querySelector('.btn-logout');
    if (btnLogout) {
        btnLogout.addEventListener('click', function(event) {
            const confirmar = confirm('Deseja realmente sair do sistema?');
            if (!confirmar) {
                event.preventDefault();
            }
        });
    }
});