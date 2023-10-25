function login(){
    email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    const data = {
        email: email,
        password: password,
        role: "1",
        especialidade: "2"
    };

    fetch('https://includeapi-production.up.railway.app/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(response => {
        if(response.status == 200){
            return response.json();
        }else{
            throw new Error("Erro na solicitação: " + response.body)
        }
    })
    .then(data =>{
        data.
        window.location.href = 'homePageLogada.html';
        localStorage.setItem('name', data.name);
        localStorage.set('role', data.role)
    })
    .catch(error =>{
        alert(error.message);
    });
}
function paginaCliente(){
    window.location.href = 'perfilPaciente.html';
}

function cadastro(){
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let name = document.getElementById("name").value;
    let cpf = document.getElementById("cpf").value;
    let idServidor = document.getElementById("idServidor").value;

    const data = {
        email: email,
        password: password,
        name: name,
        cpf: cpf,
        idServidor: idServidor
    };

    fetch('https://includeapi-production.up.railway.app/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(response =>{
        if(response.status == 201){
            window.location.href = 'homePageLogada.html';
        }else{
            throw new Error("Erro na solicitação: " + response.body)
        }
    })
    .catch(error =>{
        alert(error.message);
    });
}