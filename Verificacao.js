let email = document.getElementById('email');
let password = document.getElementById('password');
let form = document.querySelector('form');

form.addEventListener('submit', (e)=>{
    if(email.value == '' && password.value == ''){
        textForm.textContent = 'voce precisa prencher todos os capos!'
    }else{
        console.log(email.value);
        console.log(password.value); 
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