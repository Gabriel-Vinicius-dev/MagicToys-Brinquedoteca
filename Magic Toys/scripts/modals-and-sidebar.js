// Lógica para abrir e fechar sidebars (modais)
const abrirCarrinho = document.getElementById('abrir-carrinho');
const fecharCarrinho = document.getElementById('fechar-carrinho');
const sidebarCarrinho = document.getElementById('sidebar-carrinho');

const abrirLogin = document.getElementById('abrir-login');
const fecharLogin = document.getElementById('fechar-login');
const sidebarLogin = document.getElementById('sidebar-login');
const overlay = document.getElementById('overlay');

function abrirSidebar(sidebar) {
    sidebar.classList.add('ativo');
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function fecharSidebar(sidebar) {
    sidebar.classList.remove('ativo');
    overlay.style.display = 'none';
    document.body.style.overflow = '';
}

abrirCarrinho.addEventListener('click', () => abrirSidebar(sidebarCarrinho));
fecharCarrinho.addEventListener('click', () => fecharSidebar(sidebarCarrinho));
abrirLogin.addEventListener('click', () => abrirSidebar(sidebarLogin));
fecharLogin.addEventListener('click', () => fecharSidebar(sidebarLogin));
overlay.addEventListener('click', () => {
    fecharSidebar(sidebarCarrinho);
    fecharSidebar(sidebarLogin);
});