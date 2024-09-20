// Seleciona todas as seções (linhas) que contêm os quadros criando assim variaveis
const comidas = document.querySelectorAll('.almoco, .bebidas, .sobremesas');
const botaoFecharPedido = document.getElementById('botao-ativo');

// Objeto para rastrear a seleção dos itens
let itensSelecionados = {
    Comida: false,
    Bebida: false,
    Sobremesa: false
};

// Para cada linha, aciona o comportamento de seleção para bebidas não inteferirem em sobremesas por exemplo
comidas.forEach(linha => {
    const quadros = linha.querySelectorAll('.quadro1');

    quadros.forEach(quadro => {
        quadro.addEventListener('click', function() {
            // Remove a classe 'selecionado' de outros quadros na linha, assim ficando somente um
            quadros.forEach(item => item.classList.remove('selected'));
            
            // Adiciona a classe selecionado ao item em qual apertei
            this.classList.add('selected');

            // Verifica o tipo de item selecionado com base nas classes corretas
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
 //verifica se todos os itens foram selecionados, mundado o bottom final para fechar pedido
function verificarSelecao(){
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