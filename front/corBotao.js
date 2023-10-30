document.addEventListener("DOMContentLoaded", function () {
    const especialidadeItens = document.querySelectorAll(".especialidadeItem");
  
    function toggleClickedClass(item) {
      if (item.classList.contains("clicked")) {
        item.classList.remove("clicked");
      } else {
        // Remover a classe "clicked" de todos os itens
        especialidadeItens.forEach(outroItem => {
          outroItem.classList.remove("clicked");
        });
  
        // Adicionar a classe "clicked" apenas ao item clicado
        item.classList.add("clicked");
      }
    }
  
    especialidadeItens.forEach(item => {
      item.addEventListener("click", function () {
        toggleClickedClass(item);
      });
    });
  });