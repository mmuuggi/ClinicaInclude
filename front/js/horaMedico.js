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
    const data = {
        email: localStorage.getItem('emailMedico'),
        nome: localStorage.getItem('nomeMedico'),
        data_consulta: dataAtual,
        hora_consulta: hora,
        especialidade: localStorage.getItem('especialidadeMedico')
    };

    fetch('https://includeapi-production.up.railway.app/cadastrarHorario', {
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
            document.getElementById("messageErro").textContent = 'Esse médico já tem esse horário cadastrado';
        }
    })

}
