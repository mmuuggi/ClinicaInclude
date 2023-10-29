let email = document.getElementById('email');
let cpf = document.getElementById('cpf');
let password = document.getElementById('password');
let form = document.querySelector('form');

form.addEventListener('submit', (e)=>{
    if(email.value == '' && password.value == ''){
        textForm.textContent = 'voce precisa prencher todos os capos!'
    }
    e.preventDefault();
})

email.addEventListener("keyup", ()=>{
    if(validacaoEmail(email.value)!== true){
        textEmail.textContent ="O formato do E-mail deve ser abc@.com"
    }else{
        textEmail.textContent = ''
    }
})

password.addEventListener("keyup", ()=>{
    if(validacaoPassword(password.value)!== true){
        textPassword.textContent ="Senha com 8 caracteres incluindo números e letras maiúsculas."
    }else{
        textPassword.textContent = ''
    }
})

function validacaoEmail(email){
let emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi
return emailPattern.test(email)
}

function validacaoPassword(password){
let passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,16})$/;
return passwordPattern.test(password)
}
function formatarCPF(input) {
    var value = input.value.replace(/[^0-9]/g, ''); // Remove tudo que não é número
    var formattedValue = '';
  
    for (var i = 0; i < value.length; i++) {
      if (i === 3 || i === 6) {
        formattedValue += '.'; // Adiciona ponto na 3ª e 7ª posição
      } else if (i === 9) {
        formattedValue += '-'; // Adiciona hífen na 11ª posição
      }
      formattedValue += value[i];
    }
  
    input.value = formattedValue;
  }