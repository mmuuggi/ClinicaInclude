function criarOpcoesDias() {
    const select = document.getElementById("dia");
    
    for (let i = 1; i <= 31; i++) {
      const option = document.createElement("option");
      option.value = i;
      if(i < 10){
        option.textContent = '0' + i;
      }else{
        option.textContent = i;
      }
      
      select.appendChild(option);
    }
    
    return select.options;
  }
  
 criarOpcoesDias();
