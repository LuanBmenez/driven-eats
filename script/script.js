// seleciona as linhas clicaveis importantes
const comidas = document.querySelectorAll('.almoco, .bebidas, .sobremesas');
const botaoFecharPedido = document.querySelector('.btn-footer');
console.log(botaoFecharPedido)
// Objeto para rastrear a seleção dos itens
let itensSelecionados = {
    Comida: false,
    Bebida: false,
    Sobremesa: false
};


comidas.forEach(linha => {
    linha.addEventListener('click', function(event) {
        const quadro = event.target.closest('.quadro-1');
        if (!quadro) return;

        const selecionadoAnterior = linha.querySelector('.quadro-1.selected');
        if (selecionadoAnterior) {
            selecionadoAnterior.classList.remove('selected');
        }

        quadro.classList.add('selected');

        if (linha.classList.contains('almoco')) {
            itensSelecionados.comida = true;
        } else if (linha.classList.contains('bebidas')) {
            itensSelecionados.bebidas = true;
        } else if (linha.classList.contains('sobremesas')) {
            itensSelecionados.sobremesas = true;
        }

        verificarSelecao();
    });
});


function verificarSelecao() {
    const { comida, bebidas, sobremesas } = itensSelecionados; 

    if (comida && bebidas && sobremesas) { 
        botaoFecharPedido.classList.add('botao-ativo');
        botaoFecharPedido.innerText = 'Fechar Pedido';
    } else {
        botaoFecharPedido.classList.remove('botao-ativo');
        botaoFecharPedido.innerText = 'Selecione os 3 itens para fechar o pedido';
    }
}


botaoFecharPedido.addEventListener('click', function() {
    if (botaoFecharPedido.classList.contains('botao-ativo')) {
        document.querySelector('.fim-de-compra').style.display = 'flex';
        mostrarResumoPedido();
    }
});


function mostrarResumoPedido() {
    const listaPedido = document.querySelector('.pedido-itens');
    listaPedido.innerHTML = ''; 

    let total = 0;
    const selecionados = document.querySelectorAll('.quadro-1.selected');

    selecionados.forEach(item => {
        const titulo = item.querySelector('.titulo-pedido').innerText;
        const dinheiro = Number(item.querySelector('.preco, .preco-2').innerText.replace(',', '.'));

        // Criar elementos para adicionar na tela de final do pedido
        const itemPedido = document.createElement('p');
        itemPedido.innerHTML = `<span>${titulo}</span> <span>R$ ${dinheiro.toFixed(2).replace('.', ',')}</span>`;
        listaPedido.appendChild(itemPedido);

        total += dinheiro; // Somar o preço
    });

    // Atualiza o valor total no HTML
    document.getElementById('valor-total').innerText = total.toFixed(2).replace('.', ',');
}

// botão cancelar apaga a pagina de compras e volta para a inicial
document.querySelector('.cancelar').addEventListener('click', function() {
    document.querySelector('.fim-de-compra').style.display = 'none';
});