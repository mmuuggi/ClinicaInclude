document.addEventListener('DOMContentLoaded', function (){
    if(localStorage.getItem('role') != 'Recepcionista'){
        consultas();
    }
    carregarNome();
    carregarEspecialidade();
});


function carregarEspecialidade(){
    const role = localStorage.getItem('role');
    const especialidades = localStorage.getItem('especialidade');
    if(role == 'Médico'){
        let especialidadeMedico = document.getElementById('especialidade');
        if(especialidades == ''){
            especialidadeMedico.textContent = "Especialidade: " + 'Nenhuma cadastrada';
        }else{
            document.getElementById('especialidadeButton').style.display = 'none';
            especialidadeMedico.textContent = "Especialidade: " + especialidades;
        }
    }
}

function carregarNome(){
    const UserName = document.getElementById('name');
    const name = localStorage.getItem('name');
    UserName.textContent = 'Nome: ' + name;
}

function consultas(){
    const data = {
        email: localStorage.getItem('email'),
        role: localStorage.getItem('role'),
        consultas: ""
    };

    fetch('https://includeapi-production.up.railway.app/perfil', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(response => {
        if(response.status == 200){
            return response.json();
        }
    })
    .then(data => {
        const consultas = data.consultas;
        localStorage.setItem('minhasConsultas', JSON.stringify(consultas));
        if(localStorage.getItem('role') == 'Médico'){
            carregarConsultasMedicos();
        }else{
            carregarConsultasPacientes();
        }
    })
}

function stringParaData(dataString) {
        const [dia, mes, ano] = dataString.split('/').map(Number);
        return new Date(ano, mes - 1, dia);
}

function removerHora(data) {
    const novaData = new Date(data);
    novaData.setHours(0, 0, 0, 0);
    return novaData;
}

function atualizarConsultasPacientes() {
    setInterval(carregarConsultasPacientes, 5000); // Atualiza a cada 5 segundos
}

function carregarConsultasPacientes() {
    const consultas = localStorage.getItem('minhasConsultas');
    const container = document.getElementById('Datas');
    let i = 0;
    if (consultas) {
        const dataAtual = new Date();
        const dataAtualSemHora = removerHora(dataAtual);
        let consulta = JSON.parse(consultas);
        consulta.forEach(consulta => {
            let dataConsulta = stringParaData(consulta.data_consulta);
            let dataConsultaSemHora = removerHora(dataConsulta);
            if (dataConsultaSemHora >= dataAtualSemHora) {
                const div = document.createElement('div');
                div.id = 'teste';
                div.innerHTML = `
                    <h2 >${consulta.data_consulta}</h2>
                    <p>${consulta.especialidade}</p>
                `;
                container.appendChild(div);
                i++;
            }
        });
        if (i === 0) {
            const div = document.createElement('div');
            div.innerHTML = `
                <h2 id='teste' >Sem consultas!</h2>
            `;
            container.appendChild(div);
        }
    }
}

function carregarConsultasMedicos() {
    const consultas = localStorage.getItem('minhasConsultas');
    const container = document.getElementById('container-pacientes');
    let i = 0;
    if (consultas.length > 2) {
        let consulta = JSON.parse(consultas);
        let dataAtual = new Date();
        let dataAtualSemHora = removerHora(dataAtual);
        consulta.forEach(consulta => {
            let dataConsulta = stringParaData(consulta.data_consulta);
            let dataConsultaSemHora = removerHora(dataConsulta);
            if (dataConsultaSemHora.getTime() === dataAtualSemHora.getTime()) {
                const div = document.createElement('div');
                div.className = 'pacientes-diario';
                div.innerHTML = `
                <p id="checkup">${consulta.nome_paciente} <br> </p>
                <p id="info-paciente">${consulta.hora_consulta}</p>
                `;
                container.appendChild(div);
                i++;
            }
        });
        
    }
    if (i == 0){
        const div = document.createElement('div');
        div.innerHTML = `
        <p id="info-paciente">Sem consultas!!</p>
        `;
        container.appendChild(div);
    }
}

function cadastrarEspecialidade(){
    document.getElementById("janelaCadastro").style.display = 'block';
    document.getElementById('especialidadeButton').style.display = 'none';
}

function cadastroEspecialidade(element){
    let esp = element.querySelector("p").textContent;
    document.getElementById('janelaCadastro').style.display = 'none';
    document.getElementById('popup').style.display = 'block';
    document.getElementById('nomeEspecialidade').textContent = esp;

}

function pesquisarMedico(){
    let email = document.getElementById('email').value;
    let nomeMedico = document.getElementById('nameMedico');
    const data = {
        email: email
    };
    fetch('https://includeapi-production.up.railway.app/pesquisarmedico', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(response => {
        if(response.status == 200){
            return response.json().then(data => {
                let name = data.name;
                let role = data.role;
                let especialidade = data.especialidade;
                let message = data.message;
                console.log(data.especialidade);
                let email = data.email;
                if(especialidade == null){
                    nomeMedico.textContent = name + ' - Especialidade não cadastrada.';
                    nomeMedico.addEventListener('click', function(event){
                        event.preventDefault();
                        document.getElementById('MsgErro').textContent = 'Não é possível acessar médico sem especialidade'
                    })
                    
                }else{
                    localStorage.setItem('nomeMedico', name);
                    localStorage.setItem('emailMedico', email);
                    localStorage.setItem('roleMedico', role);
                    localStorage.setItem('especialidadeMedico', especialidade);
                    nomeMedico.textContent = name + ' - ' + especialidade;
                }
                
            });
        } else if (response.status == 400) {
            nomeMedico.textContent = 'Email em formato inválido';
            nomeMedico.addEventListener('click', function(event){
                event.preventDefault();
            })
        } else {
            nomeMedico.textContent = 'Médico não encontrado.';
            nomeMedico.addEventListener('click', function(event){
                event.preventDefault();
            })
        }
    });
}

function confirmarButton(){
    let input = document.getElementById('especialidadeInput').value;
    if(input == 'Confirmar'){
        console.log("conexão com bd");
    }else{
        console.log(2);
    }

}

function fechar(){
    document.getElementById('especialidadeButton').style.display = 'block';
    document.getElementById('popup').style.display = 'none';
}
