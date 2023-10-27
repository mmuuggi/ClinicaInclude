document.addEventListener("DOMContentLoaded", function () {
    carregarHistoricoMedico();
    carregarNome();
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
    if (consultas) {
        const dataAtual = new Date();
        const dataAtualSemHora = removerHora(dataAtual);
        const consulta = JSON.parse(consultas);
        let i = 0;
        consulta.forEach(consulta => {
            let dataConsulta = stringParaData(consulta.data_consulta);
            let dataConsultaSemHora = removerHora(dataConsulta);
            if (dataConsultaSemHora < dataAtualSemHora) {
                const div = document.createElement('div');
                div.id = 'datapac';
                div.innerHTML = `
                <a>
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
    } else {
        console.log("2");
    }
}

function carregarNome(){
    const UserName = document.getElementById('name');
    const name = localStorage.getItem('name');
    UserName.textContent = name;
}