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
        localStorage.setItem('name', data.name);
        localStorage.setItem('role', data.role);
        localStorage.setItem('especialidade', data.especialidade);
        alert(localStorage.getItem('especialidade'));
        window.location.href = 'homePageLogada.html';
    })
    .catch(error =>{
        alert(error.message);
    });
}


function perfilPage(){
    if(localStorage.getItem('role') == 'Paciente'){
        window.location.href='perfilPaciente.html';
    }else if(localStorage.getItem('role') =='Médico'){
        window.location.href='perfilDoutor.html'
    }else{
        console.log(localStorage.getItem('name'));
    }
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

function deslogar(){
    localStorage.setItem('name', '');
    localStorage.setItem('role', '');
    window.location.href = 'homePage.html';
}