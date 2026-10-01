document.addEventListener('DOMContentLoaded', () => {
    // 1. POPULAR CONFIGURAÇÕES (CONFIG.js)
    document.querySelectorAll('.config-telefone').forEach(el => el.textContent = CONFIG.empresa.telefone);
    document.querySelectorAll('.config-endereco').forEach(el => el.textContent = CONFIG.empresa.endereco);
    document.querySelectorAll('.config-horario').forEach(el => el.textContent = CONFIG.empresa.horario);
    document.querySelectorAll('.config-whatsapp-text').forEach(el => el.textContent = CONFIG.empresa.telefone);
    
    document.getElementById('link-instagram').href = CONFIG.redesSociais.instagram;
    document.getElementById('link-facebook').href = CONFIG.redesSociais.facebook;
    document.getElementById('map-iframe').src = CONFIG.mapa.url;
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Link do WhatsApp (Direto)
    const whatsAppUrl = `https://wa.me/${CONFIG.empresa.whatsapp}`;
    document.querySelectorAll('.btn-whatsapp-direct').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(whatsAppUrl, '_blank');
        });
    });

    // 2. MENU MOBILE E SCROLL HEADER
    const btnMobile = document.getElementById('btn-mobile');
    const nav = document.getElementById('nav');
    const header = document.getElementById('header');
    
    function toggleMenu() {
        nav.classList.toggle('active');
        const isActive = nav.classList.contains('active');
        btnMobile.setAttribute('aria-expanded', isActive);
        
        // Animando hamburger
        const hamburger = document.getElementById('hamburger');
        if(isActive) {
            hamburger.style.borderTopColor = 'transparent';
            hamburger.style.setProperty('--after-transform', 'rotate(135deg)');
            hamburger.style.setProperty('--before-transform', 'rotate(-135deg)');
        } else {
            hamburger.style.borderTopColor = 'var(--text-primary)';
            hamburger.style.removeProperty('--after-transform');
            hamburger.style.removeProperty('--before-transform');
        }
    }
    
    btnMobile.addEventListener('click', toggleMenu);
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if(window.innerWidth <= 768) toggleMenu();
        });
    });

    // 4. RENDERIZAR PRODUTOS (PRODUCTS.js)
    const productsGrid = document.getElementById('products-grid');
    
    function renderProducts(category = 'Todos') {
        productsGrid.innerHTML = '';
        
        const filtered = category === 'Todos' 
            ? PRODUCTS_DATA 
            : PRODUCTS_DATA.filter(p => p.categoria === category);
            
        filtered.forEach(prod => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${prod.imagem}" alt="${prod.nome}" class="product-img" loading="lazy">
                <div class="product-info">
                    <span class="category-tag">${prod.categoria}</span>
                    <h3>${prod.nome}</h3>
                    <p>${prod.descricao.substring(0, 60)}...</p>
                    <button class="btn btn-secondary w-100 btn-saiba-mais">Ver detalhes</button>
                </div>
            `;
            
            // Evento para abrir modal
            card.addEventListener('click', () => openModal(prod));
            productsGrid.appendChild(card);
        });
    }
    
    renderProducts();

    // Filtros
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProducts(btn.dataset.filter);
        });
    });

    // 5. MODAL DE PRODUTO
    const modal = document.getElementById('product-modal');
    const closeBtn = document.querySelector('.close-modal');
    
    function openModal(produto) {
        document.getElementById('modal-img').src = produto.imagem;
        document.getElementById('modal-title').textContent = produto.nome;
        document.getElementById('modal-category').textContent = produto.categoria;
        document.getElementById('modal-desc').textContent = produto.descricao;
        
        const whatsBtn = document.getElementById('modal-btn');
        whatsBtn.onclick = () => {
            const msg = encodeURIComponent(`Olá! Gostaria de saber mais sobre o produto: ${produto.nome}.`);
            window.open(`https://wa.me/${CONFIG.empresa.whatsapp}?text=${msg}`, '_blank');
        };
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if(e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });

    // 6. SCROLL & ANIMAÇÕES & PROGRESS BAR
    const progressBar = document.getElementById('progress-bar');
    const backToTop = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        // Header
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
        
        // Progress Bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        progressBar.style.width = (winScroll / height) * 100 + "%";
        
        // Back to top
        if (window.scrollY > 500) backToTop.classList.add('visible');
        else backToTop.classList.remove('visible');
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Intersection Observer (Animações de Entrada)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('[data-anime]').forEach(el => observer.observe(el));

    // 7. FORMULÁRIO DE CONTATO
    const form = document.getElementById('contact-form');
    const feedbackMsg = document.getElementById('form-feedback');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const telefone = document.getElementById('telefone').value;
        const mensagem = document.getElementById('mensagem').value;
        
        if(nome && telefone && mensagem) {
            // Sucesso visual
            feedbackMsg.style.color = 'green';
            feedbackMsg.textContent = 'Mensagem pronta para envio!';
            
            // Redireciona para WhatsApp com os dados
            const text = encodeURIComponent(`Olá, me chamo ${nome}. Telefone: ${telefone}. Mensagem: ${mensagem}`);
            window.open(`https://wa.me/${CONFIG.empresa.whatsapp}?text=${text}`, '_blank');
            form.reset();
            
            setTimeout(() => { feedbackMsg.textContent = ''; }, 3000);
        } else {
            feedbackMsg.style.color = 'red';
            feedbackMsg.textContent = 'Preencha todos os campos.';
        }
    });
});