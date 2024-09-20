// seleciona as linhas clicaveis importantes
const comidas = document.querySelectorAll('.almoco, .bebidas, .sobremesas');
const botaoFecharPedido = document.getElementById('botao-ativo');

// Objeto para rastrear a seleção dos itens
let itensSelecionados = {
    Comida: false,
    Bebida: false,
    Sobremesa: false
};

// adiciona onde eu so posso clicar em 1 de cada linha
comidas.forEach(linha => {
    const quadros = linha.querySelectorAll('.quadro1');

    quadros.forEach(quadro => {
        quadro.addEventListener('click', function() {
            // tira a classe selecionado quando seleciono outra comida
            quadros.forEach(item => item.classList.remove('selected'));
            this.classList.add('selected');

            // verifica se selecionei comida bebida ou sobremesa
            if (linha.classList.contains('almoco')) {
                itensSelecionados.Comida = true;
            } else if (linha.classList.contains('bebidas')) {
                itensSelecionados.Bebida = true;
            } else if (linha.classList.contains('sobremesas')) {
                itensSelecionados.Sobremesa = true;
            }

            // Verifica se todos os itens foram selecionados
            verificarSelecao();
        });
    });
});

// Verifica se todos os itens foram selecionados para ativar o botão de pedido
function verificarSelecao() {
    const { Comida, Bebida, Sobremesa } = itensSelecionados;

    if (Comida && Bebida && Sobremesa) {
        botaoFecharPedido.classList.remove('botao-inativo');
        botaoFecharPedido.classList.add('botao-ativo');
        botaoFecharPedido.innerText = 'Fechar Pedido';
    } else {
        botaoFecharPedido.classList.remove('botao-ativo');
        botaoFecharPedido.classList.add('botao-inativo');
        botaoFecharPedido.innerText = 'Selecione os 3 itens para fechar o pedido';
    }
}

// Comportamento do botão "Fechar Pedido"
botaoFecharPedido.addEventListener('click', function() {
    if (botaoFecharPedido.classList.contains('botao-ativo')) {
        document.querySelector('.fimdecompra').style.display = 'flex';
        mostrarResumoPedido();
    }
});

// Exibe o final do pedido
function mostrarResumoPedido() {
    const listaPedido = document.querySelector('.pedido-itens');
    listaPedido.innerHTML = ''; 

    let total = 0;
    const selecionados = document.querySelectorAll('.quadro1.selected');

    selecionados.forEach(item => {
        const titulo = item.querySelector('.titulo-pedido').innerText;
        const preco = Number(item.querySelector('.preço, .preço2').innerText.replace(',', '.'));

        // Criar elementos para adicionar na tela de final do pedido
        const itemPedido = document.createElement('p');
        itemPedido.innerHTML = `<span>${titulo}</span> <span>R$ ${preco.toFixed(2).replace('.', ',')}</span>`;
        listaPedido.appendChild(itemPedido);

        total += preco; // Somar o preço
    });

    // Atualiza o valor total no HTML
    document.getElementById('valor-total').innerText = total.toFixed(2).replace('.', ',');
}

// botão cancelar apaga a pagina de compras e volta para a inicial
document.getElementById('cancelar-pedido').addEventListener('click', function() {
    document.querySelector('.fimdecompra').style.display = 'none';
});