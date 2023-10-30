function criarOpcoesHoras() {
    const select = document.getElementById("hora");
  
    for (let hora = 6; hora < 18; hora++) {
      const horaFormatada = (hora).toString().padStart(2, '0');
      
      const horaInicio = `${horaFormatada }:00`;
      const horaFormatadasoma = (hora+1).toString().padStart(2, '0');
      const horaFim = `${horaFormatadasoma}:00`;
      const option = document.createElement("option");
      option.value = horaInicio;
      console.log(option.textContent = `${horaInicio} - ${horaFim}`);
      select.appendChild(option);
      
    }
  }
  
  criarOpcoesHoras();