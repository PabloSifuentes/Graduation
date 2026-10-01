// Dados iniciais dos itens
const initialItems = {
    "new": [
        { id: 1, title: "Cadastro de novo cliente", description: "Preencher formulário de cadastro", priority: "high", date: "Hoje" },
        { id: 2, title: "Orçamento para residencial", description: "Enviar orçamento para cliente", priority: "medium", date: "Hoje" },
        { id: 3, title: "Atualizar catálogo", description: "Adicionar novos serviços", priority: "low", date: "Ontem" }
    ],
    "in-progress": [
        { id: 4, title: "Instalação de fechadura", description: "Residencial - Centro", priority: "high", date: "Em andamento" },
        { id: 5, title: "Manutenção preventiva", description: "Condomínio comercial", priority: "medium", date: "2 dias" },
        { id: 6, title: "Troca de chaves", description: "Cliente João Silva", priority: "low", date: "1 semana" },
        { id: 7, title: "Sistema de segurança", description: "Instalação completa", priority: "high", date: "3 dias" },
        { id: 8, title: "Consultoria comercial", description: "Empresa ABC", priority: "medium", date: "Em andamento" }
    ],
    "review": [
        { id: 9, title: "Proposta comercial", description: "Aguardando aprovação", priority: "medium", date: "A revisar" },
        { id: 10, title: "Contrato de serviço", description: "Verificar cláusulas", priority: "high", date: "Urgente" },
        { id: 11, title: "Relatório financeiro", description: "Conferir números", priority: "low", date: "Esta semana" },
        { id: 12, title: "Pedido de equipamentos", description: "Verificar estoque", priority: "medium", date: "Hoje" }
    ],
    "completed": [
        { id: 13, title: "Serviço residencial", description: "Concluído com sucesso", priority: "medium", date: "Concluído" },
        { id: 14, title: "Orçamento aprovado", description: "Cliente confirmado", priority: "low", date: "Finalizado" }
    ]
};

// Variáveis globais
let items = JSON.parse(JSON.stringify(initialItems)); // Cópia profunda
let nextId = 15;
let draggedItem = null;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeMenu();
    initializeTabs();
    initializeColumns();
    initializeModal();
    initializeDragAndDrop();
    
    // Adicionar evento para o botão de relatório
    document.querySelector('.btn-view-report').addEventListener('click', function() {
        alert('Relatório gerado com sucesso! Em uma aplicação real, isso baixaria um PDF.');
    });
    
    // Adicionar evento para logout
    document.querySelector('.btn-logout').addEventListener('click', function() {
        if (confirm('Tem certeza que deseja sair?')) {
            alert('Saindo do sistema...');
            // Em aplicação real, redirecionaria para login
        }
    });
    
    // Adicionar evento para notificações
    document.querySelector('.name svg').addEventListener('click', function() {
        showNotifications();
    });
});

// Menu
function initializeMenu() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const section = this.getAttribute('data-section');
            const parentLi = this.parentElement;
            
            // Atualizar breadcrumb
            document.getElementById('current-section').textContent = 
                this.querySelector('i').nextSibling.textContent.trim();
            
            // Remover classe active de todos os itens
            document.querySelectorAll('.site-nav ul li').forEach(li => {
                li.classList.remove('active');
            });
            
            // Adicionar classe active ao item clicado
            parentLi.classList.add('active');
            
            // Se for o item de serviços, alternar submenu
            if (section === 'services') {
                const submenu = parentLi.querySelector('.submenu');
                if (submenu) {
                    const isActive = parentLi.classList.contains('active');
                    submenu.style.maxHeight = isActive ? submenu.scrollHeight + 'px' : '0';
                }
            }
            
            // Em uma aplicação real, aqui carregaria o conteúdo da seção
            console.log('Navegando para:', section);
        });
    });
    
    // Submenus
    const submenuItems = document.querySelectorAll('.submenu a');
    submenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const subsection = this.getAttribute('data-subsection');
            console.log('Subseção selecionada:', subsection);
            
            // Atualizar breadcrumb
            const sectionName = this.querySelector('i').nextSibling.textContent.trim();
            document.getElementById('current-section').textContent = sectionName;
        });
    });
}

// Tabs
function initializeTabs() {
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover classe active de todas as tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Adicionar classe active à tab clicada
            this.classList.add('active');
            
            const tabType = this.getAttribute('data-tab');
            console.log('Tab selecionada:', tabType);
            
            // Em uma aplicação real, aqui carregaria o conteúdo da tab
            // Para este exemplo, vamos apenas mostrar um alerta
            if (tabType !== 'deals') {
                alert(`Em uma aplicação real, esta aba carregaria: ${tabType}`);
            }
        });
    });
}

// Colunas e Itens
function initializeColumns() {
    // Carregar itens iniciais
    Object.keys(items).forEach(colId => {
        loadItemsToColumn(colId);
    });
    
    // Configurar botões de adicionar item
    const addButtons = document.querySelectorAll('.btn-add-item');
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            const col = this.closest('.col');
            const colId = col.getAttribute('data-col');
            openAddItemModal(colId);
        });
    });
}

function loadItemsToColumn(colId) {
    const col = document.querySelector(`.col[data-col="${colId}"]`);
    const itemsContainer = col.querySelector('.items-container');
    
    // Limpar container
    itemsContainer.innerHTML = '';
    
    // Adicionar itens
    items[colId].forEach(item => {
        const itemElement = createItemElement(item);
        itemsContainer.appendChild(itemElement);
    });
    
    // Atualizar contador
    updateColumnCount(colId);
}

function createItemElement(item) {
    const div = document.createElement('div');
    div.className = `item priority-${item.priority}`;
    div.setAttribute('data-id', item.id);
    div.setAttribute('draggable', 'true');
    
    // Ícone de prioridade
    const priorityIcon = {
        'high': 'fa-exclamation-circle',
        'medium': 'fa-info-circle',
        'low': 'fa-check-circle'
    }[item.priority];
    
    div.innerHTML = `
        <div class="item-header">
            <div class="item-title">
                <i class="fas ${priorityIcon}"></i> ${item.title}
            </div>
            <div class="item-actions">
                <button class="btn-action btn-edit" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-action btn-delete" title="Excluir">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        <div class="item-description">${item.description}</div>
        <div class="item-footer">
            <span class="item-priority">
                <span class="priority-dot ${item.priority}"></span>
                ${item.priority === 'high' ? 'Alta' : item.priority === 'medium' ? 'Média' : 'Baixa'}
            </span>
            <span class="item-date">${item.date}</span>
        </div>
    `;
    
    // Adicionar eventos
    const editBtn = div.querySelector('.btn-edit');
    const deleteBtn = div.querySelector('.btn-delete');
    
    editBtn.addEventListener('click', () => editItem(item.id));
    deleteBtn.addEventListener('click', () => deleteItem(item.id));
    
    // Eventos de drag and drop
    div.addEventListener('dragstart', handleDragStart);
    div.addEventListener('dragend', handleDragEnd);
    
    return div;
}

function updateColumnCount(colId) {
    const col = document.querySelector(`.col[data-col="${colId}"]`);
    const countElement = col.querySelector('.col-count');
    countElement.textContent = items[colId].length;
}

// Modal
function initializeModal() {
    const modal = document.getElementById('addItemModal');
    const closeBtn = modal.querySelector('.btn-close-modal');
    const cancelBtn = modal.querySelector('.btn-cancel');
    const form = document.getElementById('addItemForm');
    
    // Fechar modal
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    // Fechar modal ao clicar fora
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Submeter formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        addNewItem();
    });
}

function openAddItemModal(defaultColumn = 'new') {
    const modal = document.getElementById('addItemModal');
    const form = document.getElementById('addItemForm');
    
    // Resetar formulário
    form.reset();
    
    // Definir coluna padrão
    document.getElementById('itemColumn').value = defaultColumn;
    
    // Abrir modal
    modal.classList.add('active');
    document.getElementById('itemTitle').focus();
}

function closeModal() {
    const modal = document.getElementById('addItemModal');
    modal.classList.remove('active');
}

function addNewItem() {
    const title = document.getElementById('itemTitle').value.trim();
    const description = document.getElementById('itemDescription').value.trim();
    const column = document.getElementById('itemColumn').value;
    const priority = document.querySelector('input[name="priority"]:checked').value;
    
    if (!title) {
        alert('Por favor, insira um título para o item.');
        return;
    }
    
    const newItem = {
        id: nextId++,
        title: title,
        description: description || 'Sem descrição',
        priority: priority,
        date: 'Hoje'
    };
    
    // Adicionar item ao array
    items[column].push(newItem);
    
    // Adicionar item à coluna
    const col = document.querySelector(`.col[data-col="${column}"]`);
    const itemsContainer = col.querySelector('.items-container');
    itemsContainer.appendChild(createItemElement(newItem));
    
    // Atualizar contador
    updateColumnCount(column);
    
    // Fechar modal
    closeModal();
    
    // Mostrar mensagem de sucesso
    alert('Item adicionado com sucesso!');
}

// Funcionalidades dos Itens
function editItem(itemId) {
    // Encontrar item em todas as colunas
    let item = null;
    let column = null;
    
    Object.keys(items).forEach(col => {
        const found = items[col].find(i => i.id === itemId);
        if (found) {
            item = found;
            column = col;
        }
    });
    
    if (item) {
        const newTitle = prompt('Editar título:', item.title);
        if (newTitle !== null && newTitle.trim() !== '') {
            item.title = newTitle.trim();
            
            const newDescription = prompt('Editar descrição:', item.description);
            if (newDescription !== null) {
                item.description = newDescription.trim();
            }
            
            // Recarregar a coluna
            loadItemsToColumn(column);
        }
    }
}

function deleteItem(itemId) {
    if (confirm('Tem certeza que deseja excluir este item?')) {
        // Encontrar e remover item de todas as colunas
        Object.keys(items).forEach(col => {
            const index = items[col].findIndex(i => i.id === itemId);
            if (index !== -1) {
                items[col].splice(index, 1);
                loadItemsToColumn(col);
            }
        });
    }
}

// Drag and Drop
function initializeDragAndDrop() {
    const columns = document.querySelectorAll('.col');
    
    columns.forEach(col => {
        col.addEventListener('dragover', handleDragOver);
        col.addEventListener('dragenter', handleDragEnter);
        col.addEventListener('dragleave', handleDragLeave);
        col.addEventListener('drop', handleDrop);
    });
}

function handleDragStart(e) {
    draggedItem = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', this.getAttribute('data-id'));
    
    // Adicionar delay para visualização
    setTimeout(() => {
        this.style.display = 'none';
    }, 0);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    this.style.display = 'block';
    
    // Remover classes de sobreposição
    document.querySelectorAll('.col').forEach(col => {
        col.classList.remove('over');
    });
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    e.preventDefault();
    this.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over');
}

function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    
    if (draggedItem) {
        const itemId = parseInt(draggedItem.getAttribute('data-id'));
        const targetColumn = this.getAttribute('data-col');
        
        // Encontrar item e coluna original
        let sourceColumn = null;
        Object.keys(items).forEach(col => {
            const index = items[col].findIndex(i => i.id === itemId);
            if (index !== -1) {
                sourceColumn = col;
            }
        });
        
        // Mover item se estiver em coluna diferente
        if (sourceColumn && sourceColumn !== targetColumn) {
            const itemIndex = items[sourceColumn].findIndex(i => i.id === itemId);
            if (itemIndex !== -1) {
                const [movedItem] = items[sourceColumn].splice(itemIndex, 1);
                items[targetColumn].push(movedItem);
                
                // Atualizar ambas as colunas
                loadItemsToColumn(sourceColumn);
                loadItemsToColumn(targetColumn);
                
                console.log(`Item ${itemId} movido de ${sourceColumn} para ${targetColumn}`);
            }
        }
        
        this.classList.remove('over');
    }
    
    return false;
}

// Notificações
function showNotifications() {
    const notificationCount = 3;
    const notifications = [
        { id: 1, text: "Novo orçamento solicitado", time: "5 min atrás" },
        { id: 2, text: "Serviço concluído com sucesso", time: "1 hora atrás" },
        { id: 3, text: "Lembrete: Reunião amanhã", time: "2 horas atrás" }
    ];
    
    let notificationHTML = `
        <div class="notification-popup">
            <div class="notification-header">
                <h4>Notificações (${notificationCount})</h4>
                <button class="btn-mark-all">Marcar todas como lidas</button>
            </div>
            <div class="notification-list">
    `;
    
    notifications.forEach(notif => {
        notificationHTML += `
            <div class="notification-item">
                <div class="notification-text">${notif.text}</div>
                <div class="notification-time">${notif.time}</div>
            </div>
        `;
    });
    
    notificationHTML += `
            </div>
            <div class="notification-footer">
                <a href="#" class="view-all">Ver todas as notificações</a>
            </div>
        </div>
    `;
    
    // Criar e mostrar popup
    const popup = document.createElement('div');
    popup.innerHTML = notificationHTML;
    popup.style.cssText = `
        position: fixed;
        top: 60px;
        right: 20px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        width: 300px;
        z-index: 1000;
        animation: slideDown 0.3s ease;
    `;
    
    // Adicionar estilos dinâmicos
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .notification-popup {
            padding: 15px;
        }
        .notification-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
        }
        .notification-header h4 {
            margin: 0;
            color: var(--text-dark);
        }
        .btn-mark-all {
            background: transparent;
            border: none;
            color: var(--primary-color);
            cursor: pointer;
            font-size: 0.8em;
        }
        .notification-item {
            padding: 10px 0;
            border-bottom: 1px solid #f5f5f5;
        }
        .notification-item:last-child {
            border-bottom: none;
        }
        .notification-text {
            color: var(--text-dark);
            margin-bottom: 5px;
        }
        .notification-time {
            color: var(--text-light);
            font-size: 0.8em;
        }
        .notification-footer {
            margin-top: 15px;
            text-align: center;
        }
        .view-all {
            color: var(--primary-color);
            text-decoration: none;
            font-size: 0.9em;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(popup);
    
    // Adicionar eventos
    popup.querySelector('.btn-mark-all').addEventListener('click', function() {
        alert('Todas as notificações marcadas como lidas!');
        document.body.removeChild(popup);
        // Remover ponto de notificação
        document.querySelector('.name::after').style.display = 'none';
    });
    
    popup.querySelector('.view-all').addEventListener('click', function(e) {
        e.preventDefault();
        alert('Em uma aplicação real, isso abriria a página de notificações.');
    });
    
    // Fechar ao clicar fora
    setTimeout(() => {
        const closePopup = function(e) {
            if (!popup.contains(e.target) && e.target !== document.querySelector('.name svg')) {
                document.body.removeChild(popup);
                document.removeEventListener('click', closePopup);
            }
        };
        document.addEventListener('click', closePopup);
    }, 100);
}

// Adicionar botão de menu mobile
function addMobileMenuButton() {
    if (window.innerWidth <= 992) {
        if (!document.querySelector('.mobile-menu-toggle')) {
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'mobile-menu-toggle';
            toggleBtn.innerHTML = '<i class="fas fa-bars"></i> Menu';
            
            toggleBtn.addEventListener('click', function() {
                document.querySelector('.site-nav').classList.toggle('active');
            });
            
            document.body.appendChild(toggleBtn);
        }
    }
}

// Verificar tamanho da tela
window.addEventListener('resize', addMobileMenuButton);
addMobileMenuButton();