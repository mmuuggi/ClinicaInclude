function dois(){
const consultasJSON = localStorage.getItem('DoisUm');
const container = document.getElementById('container');
if(consultasJSON){
    const consultas = JSON.parse(consultasJSON);
    consultas.forEach(consulta => {
    const div = document.createElement('div');
        div.innerHTML = `
            <h2>${consulta.data_consulta}</h2>
            <p>${consulta.especialidade}</p>
        `;
        container.appendChild(div);
    });
}else{
    console.log("2");
}
}
function abrir(){
    document.getElementById('popup').style.display= 'flex';
}
function fechar(){
    document.getElementById('popup').style.display= 'none';
}