document.addEventListener('DOMContentLoaded', function () {
    const UserName = document.getElementById('name');
    const name = localStorage.getItem('name');
    const role = localStorage.getItem('role');
    const especialidades = localStorage.getItem('especialidade');
    let consulta = JSON.parse(localStorage.getItem('consultas'));
    let data1;
    let espe;
    if(consulta != null){
        for(let i =1; i<4; i++){
            let algo = 'datapac' + i;
            let ida = 'espe' + i;
            data1 = document.getElementById(algo);
            espe = document.getElementById(ida);
            if(consulta[i-1] != null){
                data1.textContent = (consulta[i-1].data);
                console.log(espe);
                espe.textContent = (consulta[i-1].especialidade)
            }
        }
    }
    if (UserName && name) {   
        UserName.textContent = name;
    }
    if(role == 'Médico'){
        let especialidadeMedico = document.getElementById('especialidade');
        if(especialidades != null){
            especialidadeMedico.textContent = "especialidade: " + especialidades;
        }
    }
    
});