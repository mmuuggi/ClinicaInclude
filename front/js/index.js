function login() {
    email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    const data = {
        email: email,
        password: password,
        role: "",
        especialidade: "",
    };

    fetch('https://includeapi-production.up.railway.app/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(response => {
        if (response.status == 200) {
            return response.json();
        } else {
            return response.json().then(data => {
                let message = document.getElementById('messageErro');
                message.textContent = data.message;
                throw new Error(data.message); // Lançar uma exceção para tratamento de erro
            });
        }
    })
    .then(data => {
        localStorage.setItem('email', data.email);
        localStorage.setItem('name', data.name);
        localStorage.setItem('role', data.role);
        
        if (data.role == 'Médico') {
            if (data.especialidade !== null) {
                localStorage.setItem('especialidade', data.especialidade);
            } else {
                localStorage.setItem('especialidade', '');
            }
        }
        window.location.href = 'homePageLogada.html';
    })
}


function perfilPage(){
    if(localStorage.getItem('role') == 'Paciente'){
        window.location.href='perfilPaciente.html';
    }else if(localStorage.getItem('role') == 'Médico'){
        window.location.href='perfilDoutor.html'
    }else if(localStorage.getItem('role') == 'Recepcionista'){
        window.location.href = 'perfilRecepcao.html';
    }
}

function cadastro(){
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let name = document.getElementById("name").value;
    let cpf = document.getElementById("cpf").value;
    let idServidor = document.getElementById("idServidor").value;
    if(idServidor == 'medicomtosupinpa'){
        idServidor = 'Médico';
    }else if(idServidor == 'recepcionistamtosupinpa'){
        idServidor = 'recepcionistamtosupinpa';
    }else{
        idServidor = 'Paciente';
    }
    const data = {
        email: email,
        password: password,
        name: name,
        cpf: cpf,
        role: idServidor,
        message: ""
    };

    fetch('https://includeapi-production.up.railway.app/cadastro', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(response =>{
        if(response.status == 201){
            localStorage.setItem('name', data.name);
            localStorage.setItem('role', data.role);
            localStorage.setItem('especialidade', data.especialidade);
            window.location.href = 'homePageLogada.html';
        }else{
            return response.json()
        }
    })
    .then(data =>{
        let message = document.getElementById('messageErro');
        message.textContent = data.message;
    }
        )
}
function deslogar(){
    localStorage.clear();
    window.location.href = 'homePage.html';
}
