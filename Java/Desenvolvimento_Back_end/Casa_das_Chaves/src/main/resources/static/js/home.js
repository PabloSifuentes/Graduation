/**
 * =====================================================
 * SLIDER / CARROSSEL AUTOMÁTICO - CASA DAS CHAVES
 * =====================================================
 */

class HeroSlider {
    constructor() {
        // Elementos do DOM
        this.slides = document.querySelectorAll('.slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.sliderContainer = document.querySelector('.hero-slider');

        // Configurações
        this.currentSlide = 0;
        this.slideInterval = null;
        this.intervalTime = 6000;
        this.isPlaying = true;
        this.isTransitioning = false;

        // Inicialização
        this.init();
    }

    init() {
        if (this.slides.length === 0) return;
        this.setupEventListeners();
        this.startAutoSlide();
        this.setupHoverPause();
        console.log(`Slider inicializado com ${this.slides.length} slides`);
    }

    setupEventListeners() {
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                if (this.isTransitioning) return;
                this.nextSlide();
                this.resetAutoSlide();
            });
        }

        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                if (this.isTransitioning) return;
                this.prevSlide();
                this.resetAutoSlide();
            });
        }

        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                if (this.isTransitioning) return;
                if (index !== this.currentSlide) {
                    this.goToSlide(index);
                    this.resetAutoSlide();
                }
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                if (this.isTransitioning) return;
                this.prevSlide();
                this.resetAutoSlide();
            } else if (e.key === 'ArrowRight') {
                if (this.isTransitioning) return;
                this.nextSlide();
                this.resetAutoSlide();
            }
        });
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

    showSlide(index) {
        this.isTransitioning = true;

        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });

        this.indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });

        this.slides[index].classList.add('active');

        if (this.indicators[index]) {
            this.indicators[index].classList.add('active');
        }

        this.currentSlide = index;

        setTimeout(() => {
            this.isTransitioning = false;
        }, 800);
    }

    nextSlide() {
        let nextIndex = this.currentSlide + 1;
        if (nextIndex >= this.slides.length) {
            nextIndex = 0;
        }
        this.showSlide(nextIndex);
    }

    prevSlide() {
        let prevIndex = this.currentSlide - 1;
        if (prevIndex < 0) {
            prevIndex = this.slides.length - 1;
        }
        this.showSlide(prevIndex);
    }

    goToSlide(index) {
        if (index >= 0 && index < this.slides.length) {
            this.showSlide(index);
        }
    }

    startAutoSlide() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
        }

        this.slideInterval = setInterval(() => {
            if (this.isPlaying && !this.isTransitioning) {
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

    resetAutoSlide() {
        if (this.isPlaying) {
            this.stopAutoSlide();
            this.startAutoSlide();
        }
    }

    destroy() {
        this.stopAutoSlide();
        this.isPlaying = false;
    }
}

// Aguarda o DOM carregar antes de inicializar
document.addEventListener('DOMContentLoaded', function() {
    const sliderSection = document.querySelector('.hero-slider');
    if (sliderSection) {
        window.heroSlider = new HeroSlider();
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