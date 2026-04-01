/**
 * script.js - Funcionalidades da página principal Casa das Chaves
 * Gerencia carrinho de compras (simulado), contador e interações.
 */

// Aguarda o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', function() {

    // ====================== GERENCIAMENTO DO CARRINHO ======================
    // Chave para armazenar os itens no localStorage
    const STORAGE_KEY = 'casaDasChavesCarrinho';

    // Elemento do contador no header
    const contadorElemento = document.getElementById('contadorCarrinho');

    /**
     * Obtém o carrinho atual do localStorage
     * @returns {Array} Lista de itens no carrinho
     */
    function obterCarrinho() {
        const carrinhoSalvo = localStorage.getItem(STORAGE_KEY);
        return carrinhoSalvo ? JSON.parse(carrinhoSalvo) : [];
    }

    /**
     * Salva o carrinho no localStorage e atualiza o contador
     * @param {Array} carrinho Lista de itens a ser salva
     */
    function salvarCarrinho(carrinho) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(carrinho));
        atualizarContador();
    }

    /**
     * Atualiza o contador visual do carrinho baseado na quantidade de itens
     */
    function atualizarContador() {
        const carrinho = obterCarrinho();
        const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
        if (contadorElemento) {
            contadorElemento.textContent = totalItens;
            // Pequena animação no contador
            contadorElemento.style.transform = 'scale(1.2)';
            setTimeout(() => {
                contadorElemento.style.transform = 'scale(1)';
            }, 200);
        }
    }

    /**
     * Adiciona um produto ao carrinho
     * @param {string} nome Nome do produto
     * @param {number} preco Preço do produto
     * @param {number} quantidade Quantidade a adicionar (padrão 1)
     */
    function adicionarAoCarrinho(nome, preco, quantidade = 1) {
        const carrinho = obterCarrinho();

        // Verifica se o produto já existe no carrinho
        const itemExistente = carrinho.find(item => item.nome === nome);

        if (itemExistente) {
            // Se existir, incrementa a quantidade
            itemExistente.quantidade += quantidade;
        } else {
            // Se não existir, adiciona novo item
            carrinho.push({
                id: Date.now(), // ID simples para referência
                nome: nome,
                preco: preco,
                quantidade: quantidade
            });
        }

        salvarCarrinho(carrinho);

        // Feedback visual ao usuário
        mostrarMensagemTemporaria(`"${nome}" adicionado ao carrinho!`, 'sucesso');
    }

    /**
     * Mostra uma mensagem temporária para feedback do usuário
     * @param {string} mensagem Texto da mensagem
     * @param {string} tipo Tipo da mensagem ('sucesso', 'erro', 'info')
     */
    function mostrarMensagemTemporaria(mensagem, tipo = 'info') {
        // Verifica se já existe um elemento de mensagem
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

            // Adiciona a animação keyframes se não existir
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

        // Define as cores baseado no tipo
        const cores = {
            sucesso: '#48bb78',
            erro: '#f56565',
            info: '#4299e1'
        };

        mensagemDiv.style.backgroundColor = cores[tipo] || cores.info;
        mensagemDiv.textContent = mensagem;

        // Remove a mensagem após a animação
        setTimeout(() => {
            if (mensagemDiv && mensagemDiv.parentNode) {
                mensagemDiv.remove();
            }
        }, 3000);
    }

    // ====================== CONFIGURAÇÃO DOS BOTÕES ======================
    // Seleciona todos os botões de adicionar ao carrinho
    const botoesAdicionar = document.querySelectorAll('.btn-adicionar');

    botoesAdicionar.forEach(botao => {
        botao.addEventListener('click', function(event) {
            event.preventDefault();

            // Obtém os dados do produto do próprio botão ou do card pai
            const nomeProduto = this.getAttribute('data-nome');
            const precoTexto = this.getAttribute('data-preco');

            if (nomeProduto && precoTexto) {
                const preco = parseFloat(precoTexto);
                if (!isNaN(preco)) {
                    adicionarAoCarrinho(nomeProduto, preco, 1);
                } else {
                    console.error('Preço inválido para o produto:', nomeProduto);
                }
            } else {
                // Fallback: tenta encontrar as informações no card pai
                const card = this.closest('.card-produto');
                if (card) {
                    const nome = card.querySelector('h3')?.textContent || 'Produto';
                    const precoTextoAlt = card.querySelector('.preco')?.textContent || '';
                    const preco = parseFloat(precoTextoAlt.replace('R$', '').replace(',', '.').trim());

                    if (!isNaN(preco)) {
                        adicionarAoCarrinho(nome, preco, 1);
                    }
                }
            }
        });
    });

    // ====================== INICIALIZAÇÃO ======================
    // Atualiza o contador ao carregar a página
    atualizarContador();

    // ====================== FUNÇÃO PARA FUTURA INTEGRAÇÃO ======================
    /**
     * Função que poderá ser usada futuramente para buscar dados do usuário
     * e exibir nome personalizado na página
     */
    function exibirNomeUsuario(nome) {
        const heroTitle = document.querySelector('.container-hero h1');
        if (heroTitle && nome) {
            heroTitle.innerHTML = `Bem-vindo, ${nome}!`;
        }
    }

    // Exemplo de como poderia ser usado futuramente:
    // O backend pode injetar via Thymeleaf o nome do usuário em um data attribute
    // const nomeUsuario = document.body.getAttribute('data-usuario-nome');
    // if (nomeUsuario) exibirNomeUsuario(nomeUsuario);

    // Pequeno log no console para indicar que o script foi carregado
    console.log('Script da Casa das Chaves carregado com sucesso!');
});

/**
 * =====================================================
 * SLIDER / CARROSSEL AUTOMÁTICO - CASA DAS CHAVES
 * =====================================================
 * Funcionalidades:
 * - Transição automática a cada 6 segundos
 * - Botões de navegação (anterior/próximo)
 * - Indicadores clicáveis (bolinhas)
 * - Transição suave com fade
 * - Pausa automática ao passar o mouse
 * - Reinício automático do timer
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
        this.intervalTime = 6000; // 6 segundos
        this.isPlaying = true;
        this.isTransitioning = false;

        // Inicialização
        this.init();
    }

    /**
     * Inicializa o slider
     */
    init() {
        // Verifica se há slides
        if (this.slides.length === 0) return;

        // Configura eventos
        this.setupEventListeners();

        // Inicia o slider automático
        this.startAutoSlide();

        // Pausa ao passar o mouse no container
        this.setupHoverPause();

        // Log de inicialização
        console.log(`Slider inicializado com ${this.slides.length} slides`);
    }

    /**
     * Configura todos os event listeners
     */
    setupEventListeners() {
        // Botão próximo
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                if (this.isTransitioning) return;
                this.nextSlide();
                this.resetAutoSlide();
            });
        }

        // Botão anterior
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                if (this.isTransitioning) return;
                this.prevSlide();
                this.resetAutoSlide();
            });
        }

        // Indicadores (bolinhas)
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                if (this.isTransitioning) return;
                if (index !== this.currentSlide) {
                    this.goToSlide(index);
                    this.resetAutoSlide();
                }
            });
        });

        // Teclado (setas esquerda/direita)
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

    /**
     * Configura pausa ao passar o mouse
     */
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

    /**
     * Mostra um slide específico
     * @param {number} index - Índice do slide a ser mostrado
     */
    showSlide(index) {
        // Previne múltiplas transições simultâneas
        this.isTransitioning = true;

        // Remove classe active de todos os slides
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Remove classe active de todos os indicadores
        this.indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });

        // Adiciona classe active ao slide atual
        this.slides[index].classList.add('active');

        // Adiciona classe active ao indicador atual
        if (this.indicators[index]) {
            this.indicators[index].classList.add('active');
        }

        // Atualiza slide atual
        this.currentSlide = index;

        // Libera para próxima transição após a animação
        setTimeout(() => {
            this.isTransitioning = false;
        }, 800);
    }

    /**
     * Avança para o próximo slide
     */
    nextSlide() {
        let nextIndex = this.currentSlide + 1;

        // Se for o último slide, volta para o primeiro
        if (nextIndex >= this.slides.length) {
            nextIndex = 0;
        }

        this.showSlide(nextIndex);
    }

    /**
     * Volta para o slide anterior
     */
    prevSlide() {
        let prevIndex = this.currentSlide - 1;

        // Se for o primeiro slide, vai para o último
        if (prevIndex < 0) {
            prevIndex = this.slides.length - 1;
        }

        this.showSlide(prevIndex);
    }

    /**
     * Vai para um slide específico
     * @param {number} index - Índice do slide
     */
    goToSlide(index) {
        if (index >= 0 && index < this.slides.length) {
            this.showSlide(index);
        }
    }

    /**
     * Inicia o slider automático
     */
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

    /**
     * Para o slider automático
     */
    stopAutoSlide() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }

    /**
     * Reinicia o timer do slider automático
     */
    resetAutoSlide() {
        if (this.isPlaying) {
            this.stopAutoSlide();
            this.startAutoSlide();
        }
    }

    /**
     * Destroi o slider (limpa recursos)
     */
    destroy() {
        this.stopAutoSlide();
        this.isPlaying = false;
        console.log('Slider destruído');
    }
}

/**
 * Aguarda o DOM carregar antes de inicializar o slider
 */
document.addEventListener('DOMContentLoaded', function() {
    // Verifica se a seção do slider existe na página
    const sliderSection = document.querySelector('.hero-slider');
    if (sliderSection) {
        // Inicializa o slider
        window.heroSlider = new HeroSlider();
    }
});
/**
 * =====================================================
 * SLIDER / CARROSSEL AUTOMÁTICO - CASA DAS CHAVES
 * =====================================================
 * Funcionalidades:
 * - Transição automática a cada 6 segundos
 * - Botões de navegação (anterior/próximo)
 * - Indicadores clicáveis (bolinhas)
 * - Transição suave com fade
 * - Pausa automática ao passar o mouse
 * - Reinício automático do timer
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
        this.intervalTime = 6000; // 6 segundos
        this.isPlaying = true;
        this.isTransitioning = false;

        // Inicialização
        this.init();
    }

    /**
     * Inicializa o slider
     */
    init() {
        // Verifica se há slides
        if (this.slides.length === 0) return;

        // Configura eventos
        this.setupEventListeners();

        // Inicia o slider automático
        this.startAutoSlide();

        // Pausa ao passar o mouse no container
        this.setupHoverPause();

        // Log de inicialização
        console.log(`Slider inicializado com ${this.slides.length} slides`);
    }

    /**
     * Configura todos os event listeners
     */
    setupEventListeners() {
        // Botão próximo
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                if (this.isTransitioning) return;
                this.nextSlide();
                this.resetAutoSlide();
            });
        }

        // Botão anterior
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                if (this.isTransitioning) return;
                this.prevSlide();
                this.resetAutoSlide();
            });
        }

        // Indicadores (bolinhas)
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                if (this.isTransitioning) return;
                if (index !== this.currentSlide) {
                    this.goToSlide(index);
                    this.resetAutoSlide();
                }
            });
        });

        // Teclado (setas esquerda/direita)
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

    /**
     * Configura pausa ao passar o mouse
     */
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

    /**
     * Mostra um slide específico
     * @param {number} index - Índice do slide a ser mostrado
     */
    showSlide(index) {
        // Previne múltiplas transições simultâneas
        this.isTransitioning = true;

        // Remove classe active de todos os slides
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Remove classe active de todos os indicadores
        this.indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });

        // Adiciona classe active ao slide atual
        this.slides[index].classList.add('active');

        // Adiciona classe active ao indicador atual
        if (this.indicators[index]) {
            this.indicators[index].classList.add('active');
        }

        // Atualiza slide atual
        this.currentSlide = index;

        // Libera para próxima transição após a animação
        setTimeout(() => {
            this.isTransitioning = false;
        }, 800);
    }

    /**
     * Avança para o próximo slide
     */
    nextSlide() {
        let nextIndex = this.currentSlide + 1;

        // Se for o último slide, volta para o primeiro
        if (nextIndex >= this.slides.length) {
            nextIndex = 0;
        }

        this.showSlide(nextIndex);
    }

    /**
     * Volta para o slide anterior
     */
    prevSlide() {
        let prevIndex = this.currentSlide - 1;

        // Se for o primeiro slide, vai para o último
        if (prevIndex < 0) {
            prevIndex = this.slides.length - 1;
        }

        this.showSlide(prevIndex);
    }

    /**
     * Vai para um slide específico
     * @param {number} index - Índice do slide
     */
    goToSlide(index) {
        if (index >= 0 && index < this.slides.length) {
            this.showSlide(index);
        }
    }

    /**
     * Inicia o slider automático
     */
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

    /**
     * Para o slider automático
     */
    stopAutoSlide() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }

    /**
     * Reinicia o timer do slider automático
     */
    resetAutoSlide() {
        if (this.isPlaying) {
            this.stopAutoSlide();
            this.startAutoSlide();
        }
    }

    /**
     * Destroi o slider (limpa recursos)
     */
    destroy() {
        this.stopAutoSlide();
        this.isPlaying = false;
        console.log('Slider destruído');
    }
}

/**
 * Aguarda o DOM carregar antes de inicializar o slider
 */
document.addEventListener('DOMContentLoaded', function() {
    // Verifica se a seção do slider existe na página
    const sliderSection = document.querySelector('.hero-slider');
    if (sliderSection) {
        // Inicializa o slider
        window.heroSlider = new HeroSlider();
    }
});