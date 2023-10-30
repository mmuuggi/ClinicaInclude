document.addEventListener('DOMContentLoaded', function (){
    const data = {
        email: localStorage.getItem('aaaaaa')
    };
    fetch('https://includeapi-production.up.railway.app/filtro/teste', {
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
    .then(data =>{
        let datas = JSON.stringify(data.medicos);
        let container = document.getElementById('containerDataHora');
        
        let dataH = JSON.parse(datas);
        document.getElementById('nameMedicoEsp').textContent = 'Dr. ' + dataH[0].nome;
        localStorage.setItem("medicoNome", dataH[0].nome);
        localStorage.setItem("medicoEspecialidade", dataH[0].especialidade);
        localStorage.setItem("medicoEmail", dataH[0].email);
        let mes;

        dataH.forEach(dat =>{
            const div = document.createElement('div');
            mes = obterNomeDoMes(dat.dataConsulta);
            div.innerHTML = `
            <a onclick="pintarBotao(this)">
            <div>
                <h2>${dat.dataConsulta}</h2>
                <h3>${mes}</h3>
                <p id="HoraC" >${dat.hora_consulta}</p>
            </div>
            </a>
            `;
            container.appendChild(div);
        })

    });
});

function obterNomeDoMes(dataString) {
    const partes = dataString.split('/');
    if (partes.length === 3) {
        const mes = parseInt(partes[1], 10);
        if (mes >= 1 && mes <= 12) {
            const nomesDosMeses = [
                "Jan.", "Fev.", "Mar.", "Abr.", "Maio", "Jun.",
                "Jul.", "Ago.", "Set.", "Out.", "Nov.", "Dez."
            ];
            return nomesDosMeses[mes - 1];
        }
    }
    return "Mês inválido";
}