document.addEventListener("DOMContentLoaded", function () {
    carregarCancelar();
    consultas(localStorage.getItem('emailPaciente'));
});

function stringParaData(dataString) {
    const [dia, mes, ano] = dataString.split('/').map(Number);
    return new Date(ano, mes - 1, dia);
}

function removerHora(data) {
const novaData = new Date(data);
novaData.setHours(0, 0, 0, 0);
return novaData;
}

function consultas(email){
    const data = {
        email: email,
        role: "Paciente",
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
        carregarConsultasPacientes();
    })
}

function carregarConsultasPacientes(){
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
                let consultaId = consulta.id;
                div.id = 'datap';
                div.classList.add(consultaId);
                div.innerHTML = `
                <a onclick="abrir(${consultaId})">
                    <h2>${consulta.data_consulta}</h2>
                    <span>${consulta.especialidade}</span>
                    </a>
                `;
                container.appendChild(div);
                i++;
            }
        });
        if (i === 0) {
            const div = document.createElement('div');
            div.innerHTML = `
                <h2>Sem consultas!</h2>
            `;
            container.appendChild(div);
        }
    }
}

function carregarCancelar(){
    const UserName = document.getElementById('name');
    const name = localStorage.getItem('nomePaciente');
    UserName.textContent = name;
}

function abrir(idConsulta){
    const consultas = localStorage.getItem('minhasConsultas');
    const container = document.getElementById('container-pop');
    if(consultas){
        const consulta = JSON.parse(consultas);
        const consultaEncontrada = consulta.find(consulta => consulta.id === idConsulta);
        if(consultaEncontrada){
            localStorage.setItem('nameMedico1', consultaEncontrada.nome_medico);
            localStorage.setItem('especialidadeMedico1', consultaEncontrada.especialidade);
            localStorage.setItem('horaMedico1', consultaEncontrada.hora_consulta);
            localStorage.setItem('dataMedico1', consultaEncontrada.data_consulta);
            localStorage.setItem('idMedico1', consultaEncontrada.id);
            localStorage.setItem('emailMedico1', consultaEncontrada.email_medico);
            const div = document.createElement('div');
            div.id = 'popup';
            div.classList.add('examepopup');
            div.innerHTML = `           <div id='headerHistoricoPop'>
            <div>
                <a href="javascript:fechar()">
                    <img src="image/BackButton.svg" alt="">
                </a>
            </div>
            <div>
                <h1 id="especialidadePopUPTitle"></h1>
                <h2 id="dataPopUPTitle"></h2>
            </div>
        </div>
        <div id="teste12" >
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
    </div>
    <div id='testeimg' >
    <div>
    <p>Exame:</p>
        <img src="image/image 2.svg" alt="">
    </div>
    </div>
    </div>
    <div id='botoesHistorico'>
    <a id='buttonHistorico' onclick="cancelarConsulta()">Cancelar consulta</a>
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
            document.getElementById('popup').style.display= 'flex';
        }else{
            console.log(2)
        }
    }
    
}

function fechar(){
    document.getElementById('popup').style.display= 'none';
}

function cancelarConsulta(){
    const data = {
        id: localStorage.getItem('idMedico1'),
        email: localStorage.getItem('emailMedico1'),
        nome:localStorage.getItem('nameMedico1'),
        especialidade: localStorage.getItem('especialidadeMedico1'),
        data_consulta: localStorage.getItem('dataMedico1'),
        hora_consulta: localStorage.getItem('horaMedico1')
    };

    fetch('https://includeapi-production.up.railway.app/desmarcar', {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        }
    }).then(response=>{
        if(response.status == 200){
            window.location.href = 'perfilRecepcao.html';
        }
    })
}