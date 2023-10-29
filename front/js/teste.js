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
        if(localStorage.getItem('role') == 'Médico'){consultas
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
                    <h2>${consulta.data_consulta}</h2>
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
                let consultaId = consulta.id;
                div.className = 'pacientes-diario';
                div.innerHTML = `
                <a href='javascript:abrir(${consultaId})'>
                <p id="checkup">${consulta.nome_paciente} <br> </p>
                <p id="info-paciente">${consulta.hora_consulta}</p>
                </a>
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

function pesquisarMedico(a){
    console.log(1);
    let email = document.getElementById('email').value;
    let nomeMedico = document.getElementById('nameMedico');
    const data = {
        email: email,
        role: a
    };
    fetch('http://localhost:3000/pesquisar', {
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
                let email = data.email;
                if(role == 'Paciente'){
                    localStorage.setItem('nomePaciente', name);
                    localStorage.setItem('emailPaciente', email);
                    localStorage.setItem('rolePaciente', role);
                    localStorage.setItem('especialidadePaciente', especialidade);
                    nomeMedico.textContent = name;
                    document.getElementById('MsgErro').textContent = '';
                    nomeMedico.addEventListener('click', function(){
                        window.location.href = 'perfilRecepicaoEdicaomed02.html';
                    })
                }else{
                if(especialidade == null){
                    console.log('1' + especialidade);
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
                    document.getElementById('MsgErro').textContent = '';
                    nomeMedico.addEventListener('click', function(){
                        window.location.href = 'perfilRecepicaoEdicaomed02.html';
                    })
                }
            }
                
            });
        } else if (response.status == 400) {
            nomeMedico.textContent = 'Email em formato inválido';
            nomeMedico.addEventListener('click', function(event){
                event.preventDefault();
            })
        } else {
            if(a == 'Paciente'){
                nomeMedico.textContent = 'Paciente não cadastrado';
            }else{
                nomeMedico.textContent = 'Médico não encontrado.';
            }
            nomeMedico.addEventListener('click', function(event){
                event.preventDefault();
            })
        }
    });
}

function confirmarButton(){
    let input = document.getElementById('especialidadeInput').value;
    if(input == 'Confirmar'){
        const data = {
            email: localStorage.getItem('email'),
            especialidade: document.getElementById('nomeEspecialidade').textContent
        }
        fetch('http://localhost:3000/especialidade', {
        method: 'PUT',
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
            localStorage.setItem('especialidade', data.especialidade);
        })
        fechar();
        let botao = document.getElementById('especialidadeButton');
        botao.removeEventListener("click", cadastrarEspecialidade);
        setTimeout(function() {
            location.reload();
        }, 4000);
        
    }else{
        console.log(2);
    }

}

function fechar(){
    document.getElementById('especialidadeButton').style.display = 'none';
    document.getElementById('popup').style.display = 'none';
    document.getElementById('janelaCadastro').style.display = 'none';
}

function abrir(idConsulta){
    console.log(1)
    const consultas = localStorage.getItem('minhasConsultas');
    const container = document.getElementById('container-pop');
    if(consultas){
        const consulta = JSON.parse(consultas);
        const consultaEncontrada = consulta.find(consulta => consulta.id === idConsulta);
        if(consultaEncontrada){
            const div = document.createElement('div');
            div.id = 'popup1';
            div.classList.add('examepopup');
            div.innerHTML = `
            <h1 id="especialidadePopUPTitle"></h1>
            <h2 id="dataPopUPTitle"></h2>
            <div>
            <p>
                <span>Nome do Paciente:</span>
                <span id="nomePacientePopUP"></span>
            </p>
            <p>
                <span>Nome do Médico:</span>
                <span id="nomeMedicoPopUP"></span>
            </p>
            <p>
                <span>Especialidade do Médico:</span>
                <span id="especialidadePopUP"></span>
            </p>
            <p>
                <span>Data da realização do exame:</span>
                <span id="dataPopUP"></span>
            </p>
                <p>
                    <span>Horário:</span>
                    <span id="horarioPopUP"></span>
                </p>
                <p>
                    <span>Descrição:</span>
                    <span id="descricaoPacientePopUP"></span>
                </p>
                <p>
                    <span>Descrição:</span>
                    <span id="descricaoMedicoPopUP"></span>
                </p>
                <a href='Historicopaciente.html'><button>Ver histórico completo</button></a>
                <a href="javascript:fechar()">
                    <img src="image/BackButton.svg" alt="">
                </a>
        </div>`
        container.appendChild(div);
            document.getElementById('dataPopUPTitle').textContent = consultaEncontrada.data_consulta;
            document.getElementById('especialidadePopUPTitle').textContent = consultaEncontrada.especialidade;
            document.getElementById('nomePacientePopUP').textContent = consultaEncontrada.nome_paciente;
            document.getElementById('nomeMedicoPopUP').textContent = 'Dr. ' + consultaEncontrada.nome_medico;
            document.getElementById('especialidadePopUP').textContent = consultaEncontrada.especialidade;
            document.getElementById('dataPopUP').textContent = consultaEncontrada.data_consulta;
            document.getElementById('horarioPopUP').textContent = consultaEncontrada.hora_consulta;
            if(consultaEncontrada.descricao_paciente){
                document.getElementById('descricaoPacientePopUP').textContent = '"' + consultaEncontrada.descricao_paciente + '"';
            }else{
                document.getElementById('descricaoPacientePopUP').textContent = "Paciente não inseriu descrição."
            }
            if(consultaEncontrada.descricao_medico){
                document.getElementById('descricaoMedicoPopUP').textContent = '"' + consultaEncontrada.descricao_medico + '"';
            }else{
                document.getElementById('descricaoMedicoPopUP').textContent = "Médico não inseriu descrição."
            }
            document.getElementById('popup1').style.display= 'flex';
            document.getElementById('popup1').style.alignItems= 'center';
        }else{
            console.log(2)
        }
    }
}

function fechar(){
    document.getElementById('popup1').style.display= 'none';
}
