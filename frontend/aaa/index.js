function cadastro(){
	window.location.href = 'cadastro.html';
}
function paginaPrincipal(){
	window.location.href = 'index.html';
}
function login(){
	window.location.href = 'login.html';
}

function enviarLogin(){
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;

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
			alert("Login");
		}else{
			throw new Error("Erro na solicitação: " + response.body)
		}
	})
	.catch(error => {
		alert(error.message);
	})
	;
}


function enviarCadastro() {
	const email = document.getElementById("email").value;
	const name = document.getElementById("name").value;
	const cpf = document.getElementById("cpf").value;
	const password = document.getElementById("password").value;

	const data = {
		name: name,
		email: email,
		password: password,
		cpf: cpf,
		role: "Doctor"
	};

	fetch('http://localhost:8080/cadastro', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then(response => {
		if (response.status === 201) {
			alert("Usuário Cadastrado");
		} else if(response.status === 409){
			alert("Email já existe!");
		} else if(response.status === 500){
			alert("OII");
		}
		else {
			alert(response.status);
		}
		response.text().then(data => {
			alert(data)
		})
	});
	
}