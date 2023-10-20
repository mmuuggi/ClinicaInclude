function enviarCadastro() {
	const nome = document.getElementById("email").value;
	const cpf = document.getElementById("cpf").value;

	const data = {
		nome: nome,
		cpf: cpf
	};

	fetch('localhost:8080/cadastro', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then(response => {
		if (response.status === 200) {
			document.getElementById("mensagem").textContent = "Cadastrado com sucesso!";
		} else {
			document.getElementById("mensagem").textContent = "Erro ao cadastrar.";
		}
	})
	.catch(error => {
		console.error('Erro:', error);
		document.getElementById("mensagem").textContent = "Erro ao cadastrar.";
	});