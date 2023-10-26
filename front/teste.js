document.addEventListener('DOMContentLoaded', function () {
    const UserName = document.getElementById('name');
    const name = localStorage.getItem('name');
    const role = localStorage.getItem('role');

    
    if(role == 'Paciente'){
        console.log("1");
    }else{
        console.log( "2");
    }
    if (UserName && name) {   
        UserName.textContent = name;
    }
});