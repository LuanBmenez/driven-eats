// Seleciona todas as seções (linhas) que contêm os quadros
const comidas = document.querySelectorAll('.pratos, .pratos2');

// Para cada linha, aciona o comportamento de seleção, co
comidas.forEach(linha => {
    // Seleciona os 'quadros' dentro de cada linha
  const quadros = linha.querySelectorAll('.quadro1');

  quadros.forEach(quadro => {

    quadro.addEventListener('click', function() {
      // Remove a classe de selecionado ('selected')  de todos os quadros na mesma linha, assim somente um ficando selecionado 
      quadros.forEach(item => item.classList.remove('selected'));
      
      // Adiciona a classe de selecionado com o boxshadow ('selected') ao quadro clicado
      this.classList.add('selected');
    });
  });
});