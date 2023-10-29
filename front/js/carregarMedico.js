document.addEventListener('DOMContentLoaded', function (){
    const data = {
        email: localStorage.getItem('aaaaaa')
    };
    fetch('http://localhost:3000/filtro/teste', {
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
        document.getElementById('nameMedicoEsp').textContent = data[0].nome;

        let container = document.getElementById('containerDataHora');

        let datas = JSON.stringify(data);

        let dataH = JSON.parse(datas);
        let mes;

        dataH.forEach(dat =>{
            console.log(1)
            const div = document.createElement('div');
            let mes = obterNomeDoMes(dat.dataConsulta);
            div.innerHTML = `
            <a href='perfilPaciente.html'>
            <div>
                <h2>${dat.dataConsulta}</h2>
                <h3>${mes}</h3>
                <p>${dat.hora_consulta}</p>
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