document.addEventListener('DOMContentLoaded', () => {
  // Marcar como "toggleable" todos os cards que começam escondidos
  document.querySelectorAll('.section .card.hidden').forEach(card => {
    card.classList.add('toggleable');
  });

  // Preparar todos os botões "Ver mais" com IDs únicos
  document.querySelectorAll('.showmore').forEach(button => {
    // Estado acessível
    button.setAttribute('aria-expanded', 'false');

    button.addEventListener('click', () => {
      const container = button.closest('.vermais')?.previousElementSibling;
      if (!container) return;

      let toggleCards = container.querySelectorAll('.card.toggleable');

      if (toggleCards.length === 0) {
        container.querySelectorAll('.produtos .card.hidden').forEach(card => {
          card.classList.add('toggleable');
        });
        toggleCards = container.querySelectorAll('.card.toggleable');
      }

      if (toggleCards.length === 0) {
        container.querySelectorAll('.produtos .card:nth-child(n+5)').forEach(card => {
          card.classList.add('toggleable', 'hidden');
        });
        toggleCards = container.querySelectorAll('.card.toggleable');
      }

      const expanded = button.getAttribute('aria-expanded') === 'true';

      if (!expanded) {
        toggleCards.forEach(c => c.classList.remove('hidden'));
        button.textContent = 'Ver menos';
        button.setAttribute('aria-expanded', 'true');
      } else {
        toggleCards.forEach(c => c.classList.add('hidden'));
        button.textContent = 'Ver mais';
        button.setAttribute('aria-expanded', 'false');
      }
    });
  });
});

const imgContainer = document.querySelector('.banner .img');
const slides = document.querySelectorAll('.banner .img picture');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

let currentIndex = 0;

function updateSlide() {
  const width = slides[0].clientWidth;
  imgContainer.style.transform = `translateX(${-currentIndex * width}px)`;
}

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlide();
});

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlide();
});

window.addEventListener('resize', updateSlide);
updateSlide();

const btnTopo = document.getElementById("btnTopo");

window.onscroll = function () {
  if (document.documentElement.scrollTop > 200) {
    btnTopo.style.display = "block";
  } else {
    btnTopo.style.display = "none";
  }
};

btnTopo.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

const BotoesAdicionar = document.querySelectorAll(".adicionar");
const badge = document.getElementById("badge-carrinho");
const sidebarCarrinho = document.getElementById("sidebar-carrinho");
const abrirCarrinho = document.getElementById("abrir-carrinho");
const fecharCarrinho = document.getElementById("fechar-carrinho");
const listaCarrinho = document.getElementById("lista-carrinho");
const footerCarrinho = document.querySelector(".footer-carrinho");
const totalCarrinho = document.getElementById("total-carrinho");
const botaoFinalizar = document.getElementById("botao-finalizar");
const botaoContinuar = document.getElementById("botao-continuar");
const botaoContinuarVazio = document.getElementById("sair-carrinho");

const sidebarLogin = document.getElementById("sidebar-login");
const abrirLogin = document.getElementById("abrir-login");
const fecharLogin = document.getElementById("fechar-login");

const abrirMenu = document.getElementById('menu');
const fecharMenu = document.getElementById('fechar-menu');
const sidebarMenu = document.getElementById('sidebar-menu');

// 🔄 Atualizar carrinho
function atualizarCarrinho() {
  const itens = listaCarrinho.querySelectorAll("li:not(#carrinho-vazio)");
  const msgVazio = document.getElementById("carrinho-vazio");

  let totalUnidades = 0;
  let total = 0;

  itens.forEach(item => {
    const precoTexto = item.querySelector("p:last-child").textContent
      .replace("R$ ", "")
      .replace(".", "")
      .replace(",", ".");
    const preco = parseFloat(precoTexto);

    const qtdSpan = item.querySelector(".quantidade");
    const qtd = qtdSpan ? parseInt(qtdSpan.textContent) : 1;

    totalUnidades += qtd;
    total += preco * qtd;
  });

  badge.textContent = totalUnidades;
  badge.style.display = totalUnidades > 0 ? "inline-block" : "none";
  footerCarrinho.style.display = totalUnidades > 0 ? "flex" : "none";
  msgVazio.style.display = totalUnidades === 0 ? "flex" : "none";

  totalCarrinho.textContent = `Total: R$ ${total.toFixed(2).replace(".", ",")}`;
}

// ➕➖ Adicionar produto
BotoesAdicionar.forEach(botao => {
  botao.addEventListener("click", () => {
    const card = botao.closest(".card");
    const nome = card.querySelector("h4") ? card.querySelector("h4").textContent : 'Produto Desconhecido';
    const antigoPrecoElement = card.querySelector("span");
    const antigoPreco = antigoPrecoElement ? antigoPrecoElement.textContent : '';
    const precoElement = card.querySelector("p");
    const preco = precoElement ? precoElement.textContent : 'R$ 0,00';
    const imagem = card.querySelector("img") ? card.querySelector("img").src : '';

    let itemExistente = Array.from(listaCarrinho.querySelectorAll("li:not(#carrinho-vazio)"))
      .find(item => item.querySelector(".infos-prod strong").textContent === nome);

    if (itemExistente) {
      const qtdSpan = itemExistente.querySelector(".quantidade");
      let qtd = parseInt(qtdSpan.textContent);
      qtd++;
      qtdSpan.textContent = qtd;
    } else {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="carPord-img">
          <img src="${imagem}" alt="${nome}">
        </div>
        <div class="infos-prod">
          <p><strong>${nome}</strong></p>
          <p class="pecoAntigo">${antigoPreco}</p>
          <p><strong>${preco}</strong></p>
        </div>
        <div class="acoes">
          <button class="remover">
            <svg width="20" height="20" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.33325 24C3.59992 24 2.97214 23.7389 2.44992 23.2167C1.9277 22.6944 1.66659 22.0667 1.66659 21.3333V4H0.333252V1.33333H6.99992V0H14.9999V1.33333H21.6666V4H20.3333V21.3333C20.3333 22.0667 20.0721 22.6944 19.5499 23.2167C19.0277 23.7389 18.3999 24 17.6666 24H4.33325ZM17.6666 4H4.33325V21.3333H17.6666V4ZM6.99992 18.6667H9.66658V6.66667H6.99992V18.6667ZM12.3333 18.6667H14.9999V6.66667H12.3333V18.6667Z" fill="#572063"/>
            </svg>
          </button>
          <div class="qtd">
            <button class="menos">-</button>
            <span class="quantidade">1</span>
            <button class="mais">+</button>
          </div>
        </div>`;

      const qtdSpan = li.querySelector(".quantidade");

      li.querySelector(".mais").addEventListener("click", () => {
        qtdSpan.textContent = parseInt(qtdSpan.textContent) + 1;
        atualizarCarrinho();
      });

      li.querySelector(".menos").addEventListener("click", () => {
        let qtd = parseInt(qtdSpan.textContent);
        if (qtd > 1) {
          qtd--;
          qtdSpan.textContent = qtd;
        } else {
          li.remove();
        }
        atualizarCarrinho();
      });

      li.querySelector(".remover").addEventListener("click", () => {
        li.remove();
        atualizarCarrinho();
      });

      listaCarrinho.appendChild(li);
    }

    atualizarCarrinho();
  });
});

botaoContinuar.addEventListener("click", () => {
  fecharSidebar(sidebarCarrinho);
});

botaoContinuarVazio.addEventListener("click", () => {
  fecharSidebar(sidebarCarrinho);
});

abrirCarrinho.addEventListener("click", () => sidebarCarrinho.classList.add("ativo"));
fecharCarrinho.addEventListener("click", () => sidebarCarrinho.classList.remove("ativo"));

abrirLogin.addEventListener("click", () => sidebarLogin.classList.add("ativo"));
fecharLogin.addEventListener("click", () => sidebarLogin.classList.remove("ativo"));

abrirMenu.addEventListener("click", () => sidebarMenu.classList.add("ativo"));
fecharMenu.addEventListener("click", () => sidebarMenu.classList.remove("ativo"));

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
abrirMenu.addEventListener('click', () => abrirSidebar(sidebarMenu));
fecharMenu.addEventListener('click', () => fecharSidebar(sidebarMenu));

overlay.addEventListener('click', () => {
  if (sidebarCarrinho.classList.contains('ativo')) fecharSidebar(sidebarCarrinho);
  if (sidebarLogin.classList.contains('ativo')) fecharSidebar(sidebarLogin);
  if (sidebarMenu.classList.contains('ativo')) fecharSidebar(sidebarMenu);
});

document.querySelectorAll('#sidebar-menu .menu-list a').forEach(link => {
  link.addEventListener('click', () => fecharSidebar(sidebarMenu));
});

// search.js - VERSÃO CORRIGIDA COM IDs ÚNICOS
class ProductSearch {
  constructor() {
      this.products = [];
      this.searchInput = document.querySelector('.busca');
      this.searchInput2 = document.querySelector('.busca2');
      this.searchResults = null;
      this.overlay = null;
      this.init();
  }

  init() {
      this.loadProductsFromPage();
      this.setupEventListeners();
      this.addSearchStyles();
  }

  loadProductsFromPage() {
    this.products = [];
    
    console.log('🔄 Carregando produtos (excluindo Mais Vendidos)...');
    
    // Buscar APENAS das 3 categorias principais
    const sections = document.querySelectorAll('.meninas, .meninos, .bebes');
    
    sections.forEach(section => {
        const cards = section.querySelectorAll('.card');
        
        cards.forEach(card => {
            const nameElement = card.querySelector('h4');
            const imageElement = card.querySelector('img');
            
            if (nameElement && imageElement) {
                const productName = nameElement.textContent.trim();
                const categoryName = section.classList.contains('meninas') ? 'Meninas' :
                                   section.classList.contains('meninos') ? 'Meninos' : 'Bebês';
                
                this.products.push({
                    element: card,
                    name: productName,
                    image: imageElement.src,
                    category: categoryName.toLowerCase(),
                    categoryName: categoryName,
                    section: section,
                    isHidden: card.classList.contains('hidden')
                });
            }
        });
    });

    console.log(`📦 TOTAL: ${this.products.length} produtos carregados (Meninas, Meninos, Bebês)`);
}

  setupEventListeners() {
      const debounce = (func, wait) => {
          let timeout;
          return function executedFunction(...args) {
              const later = () => {
                  clearTimeout(timeout);
                  func(...args);
              };
              clearTimeout(timeout);
              timeout = setTimeout(later, wait);
          };
      };

      const searchHandler = debounce((event) => {
          this.performSearch(event.target.value);
      }, 300);

      if (this.searchInput) {
          this.searchInput.addEventListener('input', searchHandler);
          this.searchInput.addEventListener('focus', (e) => {
              if (this.searchInput.value.length >= 2) {
                  this.performSearch(this.searchInput.value);
              }
          });
      }

      if (this.searchInput2) {
          this.searchInput2.addEventListener('input', searchHandler);
          this.searchInput2.addEventListener('focus', (e) => {
              if (this.searchInput2.value.length >= 2) {
                  this.performSearch(this.searchInput2.value);
              }
          });
      }

      document.addEventListener('keydown', (event) => {
          if (event.key === 'Escape') {
              this.clearSearch();
          }
      });
  }

  performSearch(searchTerm) {
      const term = searchTerm.toLowerCase().trim();
      
      if (term.length === 0) {
          this.clearSearch();
          return;
      }

      if (term.length < 2) {
          if (this.searchResults) {
              this.updateSearchMessage("Digite pelo menos 2 caracteres...");
          }
          return;
      }

      const results = this.products.filter(product => 
          product.name.toLowerCase().includes(term)
      );

      console.log(`🔍 Busca por "${term}": ${results.length} resultados`);
      this.displayResults(results, term);
  }

  displayResults(results, searchTerm) {
      this.clearSearch();

      this.searchResults = document.createElement('div');
      this.searchResults.className = 'search-results-overlay';
      
      Object.assign(this.searchResults.style, {
          position: 'fixed',
          top: '120px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          maxWidth: '500px',
          maxHeight: '60vh',
          overflowY: 'auto',
          background: '#FEFFB8',
          border: '3px solid #3F0251',
          borderRadius: '15px',
          zIndex: '10000',
          boxShadow: '0 20px 60px rgba(63, 2, 81, 0.4)',
          padding: '15px',
          fontFamily: 'Arial, sans-serif'
      });

      // Header
      const header = document.createElement('div');
      header.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 2px solid #3F0251; padding-bottom: 8px;">
              <h3 style="color: #3F0251; margin: 0; font-size: 1.2em; display: flex; align-items: center; gap: 8px;">
                  <span>🔍</span> Busca
              </h3>
              <button id="close-search" style="background: none; border: none; font-size: 22px; cursor: pointer; color: #3F0251; padding: 2px 8px; border-radius: 50%;">×</button>
          </div>
          <p style="color: #572063; margin: 0 0 15px 0; font-size: 13px;">
              <strong>${results.length}</strong> resultado(s) para "<strong style="color: #3F0251;">${searchTerm}</strong>"
          </p>
      `;

      header.querySelector('#close-search').addEventListener('click', () => {
          this.clearSearch();
      });

      this.searchResults.appendChild(header);

      if (results.length === 0) {
          this.displayNoResults(searchTerm);
      } else {
          this.displayResultsList(results);
      }

      document.body.appendChild(this.searchResults);
      this.createOverlay();
  }

  displayNoResults(searchTerm) {
      const noResults = document.createElement('div');
      noResults.style.cssText = `
          text-align: center;
          padding: 30px 20px;
          color: #572063;
      `;
      noResults.innerHTML = `
          <div style="font-size: 48px; margin-bottom: 15px;">
          <img src="imagens/bonziSeiLa.png" alt=""
          style="width: 150px; height: 120px;">
          </div>
          <p style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">Nenhum produto encontrado</p>
          <p style="margin: 0; font-size: 14px; color: #895D93;">Tente buscar por outros termos</p>
      `;
      this.searchResults.appendChild(noResults);
  }

  displayResultsList(results) {
      const resultsList = document.createElement('div');
      resultsList.style.cssText = `
          display: flex;
          flex-direction: column;
          gap: 8px;
      `;

      results.forEach(product => {
          const productElement = document.createElement('div');
          productElement.style.cssText = `
              display: flex;
              align-items: center;
              padding: 12px;
              border: 1px solid #3f025130;
              border-radius: 10px;
              cursor: pointer;
              transition: all 0.3s ease;
              background: white;
          `;

          // Ícone indicando se o produto está escondido
          const hiddenIcon = product.isHidden ? ' 🔍' : '';

          productElement.innerHTML = `
              <img src="${product.image}" alt="${product.name}" 
                   style="width: 45px; height: 45px; border-radius: 8px; object-fit: cover; margin-right: 12px; border: 2px solid #3F0251;">
              <div style="flex: 1;">
                  <h4 style="margin: 0 0 4px 0; color: #3F0251; font-size: 14px; font-weight: bold;">
                      ${product.name}${hiddenIcon}
                  </h4>
                  <span style="color: #895D93; font-size: 12px; background: #3f025110; padding: 2px 8px; border-radius: 10px;">
                      ${product.categoryName}
                  </span>
              </div>
              <div style="color: #572063; font-size: 18px;">→</div>
          `;

          productElement.addEventListener('click', () => {
              this.selectProduct(product);
          });

          productElement.addEventListener('mouseenter', () => {
              productElement.style.background = '#FBFF00';
              productElement.style.transform = 'translateX(5px)';
              productElement.style.borderColor = '#3F0251';
          });

          productElement.addEventListener('mouseleave', () => {
              productElement.style.background = 'white';
              productElement.style.transform = 'translateX(0)';
              productElement.style.borderColor = '#3f025130';
          });

          resultsList.appendChild(productElement);
      });

      this.searchResults.appendChild(resultsList);
  }

  createOverlay() {
      this.overlay = document.createElement('div');
      this.overlay.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(2px);
          z-index: 9999;
      `;
      this.overlay.addEventListener('click', () => {
          this.clearSearch();
      });
      document.body.appendChild(this.overlay);
  }

  selectProduct(product) {
      console.log('✅ Produto selecionado:', product.name);
      console.log('📂 Informações:', {
          categoria: product.categoryName,
          estáEscondido: product.isHidden,
          seção: product.section
      });
      
      // CORREÇÃO: Expandir seção se o produto estiver escondido
      if (product.isHidden && product.section) {
          console.log('🔓 Produto está escondido, expandindo seção...');
          this.expandSection(product.section);
      }
      
      // Rolar até o produto
      setTimeout(() => {
          if (product.element) {
              product.element.scrollIntoView({ 
                  behavior: 'smooth', 
                  block: 'center' 
              });
              
              // Destaque visual
              this.highlightProduct(product.element);
          }
      }, product.isHidden ? 800 : 500); // Delay maior se precisou expandir
              
      this.clearSearch();
  }

  // MÉTODO: Expandir seção usando IDs únicos
  expandSection(section) {
      let showMoreButton = null;
      
      // Encontrar o botão correto baseado na seção usando IDs únicos
      if (section.classList.contains('mais-vendidos')) {
          showMoreButton = document.getElementById('verMais1');
      } else if (section.classList.contains('meninas')) {
          showMoreButton = document.getElementById('verMais2');
      } else if (section.classList.contains('meninos')) {
          showMoreButton = document.getElementById('verMais3');
      } else if (section.classList.contains('bebes')) {
          showMoreButton = document.getElementById('verMais4');
      }
      
      // Fallback: tentar encontrar por classe
      if (!showMoreButton) {
          showMoreButton = section.nextElementSibling?.querySelector('.showmore');
      }
      
      if (showMoreButton && showMoreButton.textContent === 'Ver mais') {
          console.log('🎯 Clicando no botão "Ver mais"...');
          
          // Simular clique no botão "Ver mais"
          showMoreButton.click();
          
          // Garantir que todos os cards fiquem visíveis
          setTimeout(() => {
              const hiddenCards = section.querySelectorAll('.card.hidden');
              hiddenCards.forEach(card => {
                  card.classList.remove('hidden');
              });
              console.log(`📂 ${hiddenCards.length} cards revelados`);
          }, 400);
      } else if (showMoreButton) {
          console.log('ℹ️ Botão já está expandido ou não encontrado');
      }
  }

  highlightProduct(element) {
      const originalBorder = element.style.border;
      const originalBoxShadow = element.style.boxShadow;
      const originalTransform = element.style.transform;
      
      element.style.border = '3px solid #FBFF00';
      element.style.boxShadow = '0 0 20px #FBFF00';
      element.style.transform = 'scale(1.02)';
      
      setTimeout(() => {
          element.style.border = originalBorder;
          element.style.boxShadow = originalBoxShadow;
          element.style.transform = originalTransform;
      }, 2000);
  }

  updateSearchMessage(message) {
      if (this.searchResults) {
          const header = this.searchResults.querySelector('p');
          if (header) {
              header.innerHTML = `<span style="color: #895D93;">${message}</span>`;
          }
      }
  }

  clearSearch() {
      if (this.searchResults) {
          this.searchResults.remove();
          this.searchResults = null;
      }
      if (this.overlay) {
          this.overlay.remove();
          this.overlay = null;
      }
      
      // Limpar campos de busca
      if (this.searchInput) this.searchInput.value = '';
      if (this.searchInput2) this.searchInput2.value = '';
  }

  addSearchStyles() {
      const styles = `
          .search-results-overlay::-webkit-scrollbar {
              width: 6px;
          }
          
          .search-results-overlay::-webkit-scrollbar-track {
              background: #f1f1f1;
              border-radius: 3px;
          }
          
          .search-results-overlay::-webkit-scrollbar-thumb {
              background: #3F0251;
              border-radius: 3px;
          }
      `;

      const styleSheet = document.createElement('style');
      styleSheet.textContent = styles;
      document.head.appendChild(styleSheet);
  }
}

// Inicializar busca
document.addEventListener('DOMContentLoaded', () => {
  new ProductSearch();
});

// =============================================
// MODAL CHECKOUT - COLOCAR NO FINAL DO ARQUIVO
// =============================================

// Funções do Modal Checkout
function abrirCheckout() {
  if (listaCarrinho.querySelectorAll('li:not(#carrinho-vazio)').length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }
  
  carregarCheckout();
  const modalCheckout = document.getElementById('modal-checkout');
  modalCheckout.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function fecharCheckoutModal() {
  const modalCheckout = document.getElementById('modal-checkout');
  modalCheckout.style.display = 'none';
  document.body.style.overflow = '';
}

function carregarCheckout() {
  const listaCheckout = document.getElementById('lista-checkout');
  const totalCheckout = document.getElementById('total-checkout');
  const itens = listaCarrinho.querySelectorAll('li:not(#carrinho-vazio)');
  let total = 0;
  
  listaCheckout.innerHTML = '';
  
  itens.forEach(item => {
    const nome = item.querySelector('.infos-prod strong').textContent;
    const precoTexto = item.querySelector('.infos-prod p:last-child').textContent
      .replace('R$ ', '')
      .replace('.', '')
      .replace(',', '.');
    const preco = parseFloat(precoTexto);
    const quantidade = parseInt(item.querySelector('.quantidade').textContent);
    const subtotal = preco * quantidade;
    
    total += subtotal;
    
    const itemHTML = `
      <div class="item-checkout">
        <div class="item-info">
          <h4>${nome}</h4>
          <p>Qtd: ${quantidade} × R$ ${preco.toFixed(2)}</p>
        </div>
        <div class="item-preco">R$ ${subtotal.toFixed(2)}</div>
      </div>
    `;
    
    listaCheckout.innerHTML += itemHTML;
  });
  
  totalCheckout.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function finalizarPedido() {
  const nome = document.getElementById('nome-cliente').value;
  const email = document.getElementById('email-cliente').value;
  const telefone = document.getElementById('telefone-cliente').value;
  const metodo = document.getElementById('metodo-pagamento').value;
  
  if (!nome || !email || !telefone || !metodo) {
    alert('Por favor, preencha todos os campos!');
    return;
  }
  
  // Simular processamento
  alert(`🎊 Pedido confirmado!\n\nObrigado, ${nome}!\nEm breve você receberá as instruções de pagamento por e-mail.`);
  
  // Limpar carrinho
  listaCarrinho.querySelectorAll('li:not(#carrinho-vazio)').forEach(item => item.remove());
  atualizarCarrinho();
  fecharCheckoutModal();
  
  // Limpar formulário
  document.getElementById('nome-cliente').value = '';
  document.getElementById('email-cliente').value = '';
  document.getElementById('telefone-cliente').value = '';
  document.getElementById('metodo-pagamento').value = '';
}

// Inicializar eventos do checkout quando o DOM carregar
document.addEventListener('DOMContentLoaded', function() {
  // Substituir o alert atual do botão finalizar
  const botaoFinalizar = document.getElementById('botao-finalizar');
  if (botaoFinalizar) {
    botaoFinalizar.addEventListener('click', abrirCheckout);
  }
  
  // Event Listeners para o modal checkout
  const fecharCheckout = document.querySelector('.fechar-checkout');
  const voltarCarrinho = document.getElementById('voltar-carrinho');
  const confirmarPedido = document.getElementById('confirmar-pedido');
  const modalCheckout = document.getElementById('modal-checkout');
  
  if (fecharCheckout) {
    fecharCheckout.addEventListener('click', fecharCheckoutModal);
  }
  
  if (voltarCarrinho) {
    voltarCarrinho.addEventListener('click', fecharCheckoutModal);
  }
  
  if (confirmarPedido) {
    confirmarPedido.addEventListener('click', finalizarPedido);
  }
  
  if (modalCheckout) {
    modalCheckout.addEventListener('click', (e) => {
      if (e.target === modalCheckout) {
        fecharCheckoutModal();
      }
    });
  }
});
