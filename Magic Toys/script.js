document.addEventListener('DOMContentLoaded', () => {
    // Marcar como "toggleable" todos os cards que começam escondidos
    document.querySelectorAll('.section .card.hidden').forEach(card => {
      card.classList.add('toggleable');
    });

    // Preparar todos os botões "Ver mais"
    document.querySelectorAll('.showmore').forEach(button => {
      // Estado acessível
      button.setAttribute('aria-expanded', 'false');

      button.addEventListener('click', () => {
        // Encontra a seção correspondente (o bloco imediatamente anterior ao .vermais)
        const container = button.closest('.vermais')?.previousElementSibling;
        if (!container) return;

        // 1) Tente usar os que foram marcados inicialmente como "toggleable"
        let toggleCards = container.querySelectorAll('.card.toggleable');

        // 2) Fallback: se ninguém tem toggleable (ex.: HTML mudou),
        // marque como toggleable os que estão hidden
        if (toggleCards.length === 0) {
          container.querySelectorAll('.produtos .card.hidden').forEach(card => {
            card.classList.add('toggleable');
          });
          toggleCards = container.querySelectorAll('.card.toggleable');
        }

        // 3) Fallback extra: se ainda assim não houver, considere "extras" os a partir do 5º
        if (toggleCards.length === 0) {
          container.querySelectorAll('.produtos .card:nth-child(n+5)').forEach(card => {
            card.classList.add('toggleable', 'hidden');
          });
          toggleCards = container.querySelectorAll('.card.toggleable');
        }

        const expanded = button.getAttribute('aria-expanded') === 'true';

        if (!expanded) {
          // Mostrar
          toggleCards.forEach(c => c.classList.remove('hidden'));
          button.textContent = 'Ver menos';
          button.setAttribute('aria-expanded', 'true');
        } else {
          // Esconder novamente só os "extras" (toggleable)
          toggleCards.forEach(c => c.classList.add('hidden'));
          button.textContent = 'Ver mais';
          button.setAttribute('aria-expanded', 'false');
        }
      });
    });
  });



  const imgContainer = document.querySelector('.banner .img');
  const images = document.querySelectorAll('.banner .img img');
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');

  let currentIndex = 0;

  function updateSlide() {
      const width = images[0].clientWidth;
      imgContainer.style.transform = `translateX(${-currentIndex * width}px)`;
  }

  nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateSlide();
  });

  prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateSlide();
  });


  const btnTopo = document.getElementById("btnTopo");

  // Mostrar o botão quando rolar 200px
  window.onscroll = function () {
    if (document.documentElement.scrollTop > 200) {
      btnTopo.style.display = "block";
    } else {
      btnTopo.style.display = "none";
    }
  };

  // Voltar ao topo suavemente
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

  // Função para atualizar badge e total
  function atualizarCarrinho() {
      const itens = listaCarrinho.querySelectorAll("li:not(#carrinho-vazio)");
      const msgVazio = document.getElementById("carrinho-vazio");
    
      badge.textContent = itens.length;
      badge.style.display = itens.length > 0 ? "inline-block" : "none";
      footerCarrinho.style.display = itens.length > 0 ? "flex" : "none";
    
      // Mostra/esconde mensagem de vazio
      msgVazio.style.display = itens.length === 0 ? "flex" : "none";
    
      // Calcular total
      let total = 0;
      itens.forEach(item => {
        const precoTexto = item.querySelector("p:last-child").textContent
          .replace("R$ ", "")
          .replace(",", ".");
        total += parseFloat(precoTexto);
      });
    
      totalCarrinho.textContent = `Total: R$ ${total.toFixed(2).replace(".", ",")}`;
  }
    
  // Adicionar produto
  BotoesAdicionar.forEach(botao => {
    botao.addEventListener("click", () => {
      const card = botao.closest(".card");
      const nome = card.querySelector("h3").textContent;
      const antigoPreco = card.querySelector("span").textContent;
      const preco = card.querySelector("p").textContent;
      const imagem = card.querySelector("img").src;

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
        <button class="remover">
          <svg width="20" height="20" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.33325 24C3.59992 24 2.97214 23.7389 2.44992 23.2167C1.9277 22.6944 1.66659 22.0667 1.66659 21.3333V4H0.333252V1.33333H6.99992V0H14.9999V1.33333H21.6666V4H20.3333V21.3333C20.3333 22.0667 20.0721 22.6944 19.5499 23.2167C19.0277 23.7389 18.3999 24 17.6666 24H4.33325ZM17.6666 4H4.33325V21.3333H17.6666V4ZM6.99992 18.6667H9.66658V6.66667H6.99992V18.6667ZM12.3333 18.6667H14.9999V6.66667H12.3333V18.6667Z" fill="#572063"/>
          </svg>
        </button>`;

      li.querySelector(".remover").addEventListener("click", () => {
        li.remove();
        atualizarCarrinho();
      });

      listaCarrinho.appendChild(li);
      atualizarCarrinho();
    });
  });

  // Botão finalizar compra (aqui você pode implementar a lógica real)
  botaoFinalizar.addEventListener("click", () => {
    alert("Finalizar compra ainda não implementado.");
  });

// Botão continuar comprando (fecha o carrinho)
botaoContinuar.addEventListener("click", () => {
  fecharSidebar(sidebarCarrinho);
});

// Botão continuar comprando do carrinho vazio (fecha o carrinho)
botaoContinuarVazio.addEventListener("click", () => {
  fecharSidebar(sidebarCarrinho);
});


  // Abrir/fechar carrinho
  abrirCarrinho.addEventListener("click", () => sidebarCarrinho.classList.add("ativo"));
  fecharCarrinho.addEventListener("click", () => sidebarCarrinho.classList.remove("ativo"));

  // Abrir/fechar login
  abrirLogin.addEventListener("click", () => sidebarLogin.classList.add("ativo"));
  fecharLogin.addEventListener("click", () => sidebarLogin.classList.remove("ativo"));
  


  const overlay = document.getElementById('overlay');

  function abrirSidebar(sidebar) {
    sidebar.classList.add('ativo');
    overlay.style.display = 'block';
    // Impede scroll do body enquanto aberto
    document.body.style.overflow = 'hidden';
  }
  
  function fecharSidebar(sidebar) {
    sidebar.classList.remove('ativo');
    overlay.style.display = 'none';
    // Restaura scroll do body
    document.body.style.overflow = '';
  }
  
  // Abrir carrinho
  abrirCarrinho.addEventListener('click', () => abrirSidebar(sidebarCarrinho));
  
  // Fechar carrinho
  fecharCarrinho.addEventListener('click', () => fecharSidebar(sidebarCarrinho));
  
  // Abrir login
  abrirLogin.addEventListener('click', () => abrirSidebar(sidebarLogin));
  
  // Fechar login
  fecharLogin.addEventListener('click', () => fecharSidebar(sidebarLogin));
  
  // Fechar sidebar ao clicar no overlay
  overlay.addEventListener('click', () => {
    if (sidebarCarrinho.classList.contains('ativo')) {
      fecharSidebar(sidebarCarrinho);
    }
    if (sidebarLogin.classList.contains('ativo')) {
      fecharSidebar(sidebarLogin);
    }
  });
  