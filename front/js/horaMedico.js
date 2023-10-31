var anoSelecionado = '';
var botoesAno = document.querySelectorAll('.Datasano button');

botoesAno.forEach(function(botao) {
    botao.addEventListener('click', function() {
        anoSelecionado = botao.getAttribute('data-ano');
    });
});

function addHorarioMedico() {
    let dia = document.getElementById("dia").value;
    let mes = document.getElementById("mes").value;
    let hora = document.getElementById("hora").value;
    let ano = anoSelecionado;
    let dataAtual;
    if(dia < 10){
        dataAtual = '0' + dia + '/' + mes + '/'+ ano;
    }else{
        dataAtual = dia + '/' + mes + '/'+ ano;
    }  
    if(dataAtual.length == 10 && dataMaiorOuIgualDataAtual(dataAtual) && hora != ''){
        const data = {
            email: localStorage.getItem('emailMedico'),
            nome: localStorage.getItem('nomeMedico'),
            dataConsulta: dataAtual,
            hora_consulta: hora,
            especialidade: localStorage.getItem('especialidadeMedico')
        };
    
        fetch('https://includeapi-production.up.railway.app/cadastrarhorario', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(response => {
            if(response.status == 200){
                document.getElementById("messageErro").textContent = '';
                document.getElementById('popup').style.display = 'block';
            }else{
                console.log(localStorage.getItem('emailMedico'));
                console.log(localStorage.getItem('nomeMedico'));
    
                document.getElementById("messageErro").textContent = 'Esse médico já tem esse horário cadastrado';
            }
        })
        
    }else{
        document.getElementById("messageErro").textContent = 'Data em formato inválido';
    }
    

}
function dataMaiorOuIgualDataAtual(dataParaVerificar) {
    const partesData = dataParaVerificar.split('/');
    if (partesData.length !== 3) {
        return false; // Formato de data inválido
    }

    // partesData[2] contém o ano, partesData[1] contém o mês e partesData[0] contém o dia
    const dia = parseInt(partesData[0], 10);
    const mes = parseInt(partesData[1] - 1, 10); // Subtrai 1 do mês, pois os meses em JavaScript começam em 0
    const ano = parseInt(partesData[2], 10);

    const dataAtual = new Date();
    dataAtual.setHours(0, 0, 0, 0); // Definir horas, minutos, segundos e milissegundos como zero

    const dataComparacao = new Date(ano, mes, dia);

    return dataComparacao >= dataAtual;
}
