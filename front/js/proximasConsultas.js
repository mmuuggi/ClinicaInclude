document.addEventListener('DOMContentLoaded', function () {
    const consultas = localStorage.getItem('minhasConsultas');
    const container = document.getElementById('Datas');
    if(consultas){
        let consulta = JSON.parse(consultas);
        consulta.forEach(consulta1 => {
            const div = document.createElement('div');
            div.id = 'datapac1';
                div.innerHTML = `
                    <h2>${consulta1.data_consulta}</h2>
                    <p>${consulta1.especialidade}</p>
                `;
                container.appendChild(div);
            });
    }
});