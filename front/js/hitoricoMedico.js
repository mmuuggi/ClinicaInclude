document.addEventListener("DOMContentLoaded", function () {
    carregarNome();
    carregarHistoricoMedico();
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

function carregarHistoricoMedico() {
    const consultas = localStorage.getItem('minhasConsultas');
    const container = document.getElementById('Datas');
    let i = 0;
    if (consultas){
        const dataAtual = new Date();
        const dataAtualSemHora = removerHora(dataAtual);
        const consulta = JSON.parse(consultas);
        consulta.forEach(consulta => {
            let dataConsulta = stringParaData(consulta.data_consulta);
            let dataConsultaSemHora = removerHora(dataConsulta);
            if (dataConsultaSemHora < dataAtualSemHora) {
                const div = document.createElement('div');
                let consultaId = consulta.id;
                div.id = 'datapac';
                div.classList.add(consultaId);
                div.innerHTML = `
                <a href='javascript:abrir(${consultaId})'>
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
                <h2>Sem consultas antigas</h2>
            `;
            container.appendChild(div);
        }
    }else {
        console.log("2");
    }
}

function carregarNome(){
    const UserName = document.getElementById('name');
    const name = localStorage.getItem('name');
    UserName.textContent = name;
}

function abrir(idConsulta){
    const consultas = localStorage.getItem('minhasConsultas');
    const container = document.getElementById('container-pop');
    if(consultas){
        const consulta = JSON.parse(consultas);
        const consultaEncontrada = consulta.find(consulta => consulta.id === idConsulta);
        if(consultaEncontrada){
            const div = document.createElement('div');
            div.id = 'popup';
            div.classList.add('examepopup');
            div.innerHTML = `<h1 id="especialidadePopUPTitle"></h1>
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
            document.getElementById('popup').style.display= 'flex';
        }else{
            console.log(2)
        }
    }
    
}
function fechar(){
    document.getElementById('popup').style.display= 'none';
}
