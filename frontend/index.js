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
		role: "Doctor",
		especialidade: "Ortopedista"
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
			alert("Email inválido");
		}
	});
	
}