const botoesAdicionar = document.querySelectorAll('.card button');
const listaCarrinho = document.getElementById('lista-carrinho');
const totalCarrinho = document.getElementById('total-carrinho');
const footerCarrinho = document.querySelector('.footer-carrinho');
const carrinhoVazioMensagem = document.getElementById('carrinho-vazio');

let produtosNoCarrinho = [];

function adicionarAoCarrinho(produto) {
    produtosNoCarrinho.push(produto);
    atualizarCarrinho();
}

function removerDoCarrinho(index) {
    produtosNoCarrinho.splice(index, 1);
    atualizarCarrinho();
}

function atualizarCarrinho() {
    listaCarrinho.innerHTML = '';
    let total = 0;

    if (produtosNoCarrinho.length === 0) {
        carrinhoVazioMensagem.style.display = 'flex';
        footerCarrinho.style.display = 'none';
        document.querySelector('.badge').textContent = '0';
    } else {
        carrinhoVazioMensagem.style.display = 'none';
        footerCarrinho.style.display = 'flex';
        document.querySelector('.badge').textContent = produtosNoCarrinho.length;

        produtosNoCarrinho.forEach((produto, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}">
                <div>
                    <strong>${produto.nome}</strong>
                    <p class="pecoAntigo">R$${produto.precoAntigo}</p>
                    <p>R$${produto.preco}</p>
                </div>
                <button onclick="removerDoCarrinho(${index})" class="remover">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;
            listaCarrinho.appendChild(li);
            total += produto.preco;
        });
    }

    totalCarrinho.textContent = `Total: R$${total.toFixed(2).replace('.', ',')}`;
}

botoesAdicionar.forEach(botao => {
    botao.addEventListener('click', (evento) => {
        const card = evento.target.closest('.card');
        const produto = {
            nome: card.querySelector('h3').textContent,
            imagem: card.querySelector('img').src,
            precoAntigo: card.querySelector('span').textContent.replace('R$', ''),
            preco: parseFloat(card.querySelector('p').textContent.replace('R$', '').replace(',', '.'))
        };
        adicionarAoCarrinho(produto);
    });
});

document.addEventListener('DOMContentLoaded', atualizarCarrinho);