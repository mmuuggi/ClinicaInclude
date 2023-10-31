function marcarConsulta(role){
    let email;
    let nome_paciente;
    if(role == 'Paciente'){
        email = localStorage.getItem("email");
        nome_paciente = localStorage.getItem('name');
    }else{
        email = localStorage.getItem("emailPaciente");
        nome_paciente = localStorage.getItem('nomePaciente');
    }
    let hora = localStorage.getItem("marcarConsultaHora");
    let dataC = localStorage.getItem("marcarConsultaDia");
    let descricao = document.getElementById('descricaoPaciente').textContent;
    let medico = localStorage.getItem('medicoNome');
    let especialidade = localStorage.getItem('medicoEspecialidade');
    let emailM = localStorage.getItem('medicoEmail');

    const data = {
        email: email,
        nome_paciente: nome_paciente ,
        data_consulta: dataC,
        hora_consulta: hora,
        nome_medico: medico,
        especialidade: especialidade,
        descricao_paciente: descricao,
        medicoEmail: emailM
    };
    fetch('https://includeapi-production.up.railway.app/marcarconsulta', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(response => {
        if(response.status == 200){
            alert("Consulta marcada com sucesso!!!");
            if(confirm && role == 'Paciente'){
                window.location.href = 'perfilPaciente.html'
            }else if(confirm){
                window.location.href = 'perfilRecepcao.html'
            }
        }
    })
}
