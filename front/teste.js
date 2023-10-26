document.addEventListener('DOMContentLoaded', function () {
    const UserName = document.getElementById('name');
    const name = localStorage.getItem('name');
    const role = localStorage.getItem('role');
    const especialidade = localStorage.getItem('especialidade');   
    if (UserName && name) {   
        UserName.textContent = name;
    }
    if(role == 'Médico'){
        let especialidadeMedico = document.getElementById('especialidade');
        if(especialidade != null){
            especialidadeMedico.textContent = especialidade;
        }
    }
});