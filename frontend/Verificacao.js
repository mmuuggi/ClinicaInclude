let email = document.getElementById('email');
let cpf = document.getElementById('cpf');
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
cpf.addEventListener("keypress", ()=>{
    let cpflength = cpf.value.length
    if(cpflength === 3 || cpflength === 7){
        cpf.value += '.'
    }else if(cpflength === 11){
        cpf.value += '-'
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

function enviarCadastro() {
	const email = document.getElementById("email").value;
	const name = document.getElementById("name").value;
	const cpf = document.getElementById("cpf").value;
	const password = document.getElementById("password").value;
    const id = document.getElementById("id3").value;

	const data = {
		name: name,
		email: email,
		password: password,
		cpf: cpf,
		role: id
	};

	fetch('http://localhost:8080/cadastro', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then(response => {
		alert(response.status);
		response.text().then(data => {
			alert(data)
		})
	});
	
}
function enviarLogin(){
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

	const data = {
		email: email,
		password: password
	};

	fetch('http://localhost:8080/login', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then(response => {
		if(response.status == 200){
            window.location.href = 'homePageLogada.html';
		}else{
			throw new Error("Erro na solicitação: " + response.body)
		}
	})
	.catch(error => {
		alert(error.message);
	})
	;
}

function deslogar(){
    window.location.href = 'HomePage.html';
}