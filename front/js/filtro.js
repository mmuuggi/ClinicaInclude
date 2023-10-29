document.addEventListener('DOMContentLoaded', function (){
   console.log(1)
});

var anoSelecionado = '';
var botoesAno = document.querySelectorAll('.Datasano button');

botoesAno.forEach(function(botao) {
    botao.addEventListener('click', function() {
        anoSelecionado = botao.getAttribute('data-ano');
});
});


function carregarMedicos(){
    const data = {
        dataConsulta: dataAtual
    };fetch('http://localhost:3000/teste', {
        method: 'GET',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        }
    }).then(response => {
        if(response.status == 200){
            return response.json();
        }}) 
        .then(data => {

        })
   
}

function filtrar(){
    let dataAtual;
    let valid = false;
    if(document.getElementById("dia")){
            let dia = document.getElementById("dia").value;
            let mes = document.getElementById("mes").value;
            let ano = anoSelecionado;
            if(dia != '' && mes != '' && ano != '' ){
                if(dia < 10){
                    dataAtual = '0' + dia + '/' + mes + '/' + ano;
                    valid = true;
                }else{
                    dataAtual = dia + '/' + mes + '/' + ano;
                    valid = true;
                }
            }else if(dia != '' && mes != ''){
                if(dia < 10){
                    dataAtual = '0' + dia + '/' + mes;
                }else{
                    dataAtual = dia + '/' + mes;
                }
                valid = true;
            }else if(dia != '' && ano != ''){
                valid = false;
            }else if(ano != '' && mes != ''){
                dataAtual = mes + '/' + ano;
                valid = true;
            }else if(dia != ''){
                dataAtual = dia;
                valid = true;
            }else if(mes != ''){
                dataAtual = mes;
                valid = true;
            }else if(ano != '' ){
                dataAtual = ano;
                valid = true;
            }else{
                valid = false;
            }

            if(valid){
                const data = {
                    dataConsulta: dataAtual
                };
                fetch('http://localhost:3000/filtro', {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: {
                            'Content-type': 'application/json'
                        }
                })
                    .then(response => {
                        if(response.status == 200){
                            return response.json();
                        }else {
                            let container = document.getElementById('containerMedico');
                            if(container.children.length == 0){
                                const div = document.createElement('div');
                                div.classList.add('naoAdd');
                                div.innerHTML = `
                                <a class="naoAdd">
                                    <h2 id='textNotADD'>Data não encontrada</h2>
                                </a>`
                                container.appendChild(div);
                            }else if(container.children.length == 1){
                                document.getElementById('textNotADD').textContent = 'Data não encontrada';
                            }
                        }
                    })
                    .then(data => {
                        let naoSei = data.diasMedicos;
                        let container = document.getElementById('containerMedico');
                        localStorage.setItem('T', JSON.stringify(naoSei));

                        if(naoSei){
                            let ab = JSON.parse(localStorage.getItem('T'));
                            while (container.firstChild) {
                                container.removeChild(container.firstChild);
                            }
                            ab.forEach(a =>{
                                const div = document.createElement('div');
                                let email1 = a.email;
                                div.innerHTML = `
                                <a onclick="abrirTeste('${email1}')">
                                <img src="image/image 1.svg" alt="">
                                    <h2>${a.nome}</h2>
                                    <p>${a.especialidade}</p>
                                </a>`;
                            
                                container.appendChild(div);
                            })
                        }

                    })
            }

            
            







        }else if(document.getElementById('escolhaTesteId')){
            filtroEspecialidade();
        }
}

function pegarItem(elemento){
    especialidade = elemento.querySelector('h2').textContent;
}

function filtroMedico(){
    let email = document.getElementById('email').value;
    if(email != ''){
        const data = {
            nome: email
        };
        fetch('http://localhost:3000/filtro', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(response => {
            if(response.status == 200){
                return response.json();
            }else{
                let container = document.getElementById('medicoAchados-Container');
                if(container.children.length == 0){
                    const div = document.createElement('div');
                    div.classList.add('naoAdd');
                    div.innerHTML = `
                    <a class="naoAdd">
                        <h2 id='textNotADD'>Médico não encontrado</h2>
                    </a>`
                    container.appendChild(div);
                }else if(container.children.length == 1){
                    document.getElementById('textNotADD').textContent = 'Médico não encontrado';
                }
            }
        })
        .then(data =>{
            localStorage.setItem('NomesMedicos', JSON.stringify(data.diasMedicos));
            let container = document.getElementById('medicoAchados-Container');
            if(data.diasMedicos){
                let medico = JSON.parse(localStorage.getItem('NomesMedicos'));
                medico.forEach(medico1 =>{
                    if (!container.querySelector(`[data-id="${medico1.id}"]`)) {
                    if(container.querySelector('.naoAdd')){
                        console.log(1);
                        let aa = container.querySelector('.naoAdd');
                        aa.remove();
                    }
                    const div = document.createElement('div');
                    let email1 = medico1.email;
                    div.innerHTML = `
                    <a data-id="${medico1.id}" onclick="abrirTeste('${email1}')">
                    <img src="image/image 1.svg" alt="">
                        <h2>${medico1.nome}</h2>
                        <p>${medico1.especialidade}</p>
                    </a>`;
                
                    container.appendChild(div);
                    }

                }

                ) 
            }
        });
    }else{
        let container = document.getElementById('medicoAchados-Container');
        if(container.children.length == 0){
            const div = document.createElement('div');
            div.classList.add('naoAdd');
                div.innerHTML = `
                <a class="naoAdd">
                    <h2 id='textNotADD'>Insira um nome</h2>
                </a>`
            container.appendChild(div);
        }else if(container.children.length == 1){
            document.getElementById('textNotADD').textContent = 'Insira um nome';
        }
            
    }
}

function filtroEspecialidade(){
    if(especialidade != ''){
        const data = {
            especialidade: especialidade
        };
        fetch('http://localhost:3000/filtro', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(response => {
            if(response.status == 200){
                return response.json();
            }else {
                let container = document.getElementById('medicoAchados-Container');
                if(container.children.length == 0){
                    const div = document.createElement('div');
                    div.classList.add('naoAdd');
                    div.innerHTML = `
                    <a class="naoAdd">
                        <h2 id='textNotADD'>Escolha uma especialidade</h2>
                    </a>`
                    container.appendChild(div);
                }else if(container.children.length == 1){
                    document.getElementById('textNotADD').textContent = 'Escolha uma especialidade';
                }
            }
        })
        .then(data =>{
            let medicos = data.diasMedicos;
            localStorage.setItem('NomesMedicos', JSON.stringify(medicos));
            let container = document.getElementById('medicoAchados-Container');
            if(medicos){
                let medico = JSON.parse(localStorage.getItem('NomesMedicos'));
                while (container.firstChild) {
                    container.removeChild(container.firstChild);
                }
                medico.forEach(medico1 =>{
                    const div = document.createElement('div');
                    let email1 = medico1.email;
                    div.innerHTML = `
                    <a onclick="abrirTeste('${email1}')">
                    <img src="image/image 1.svg" alt="">
                        <h2>${medico1.nome}</h2>
                        <p>${medico1.especialidade}</p>
                    </a>`;
                
                    container.appendChild(div);
                }) 
            }
        });
    }else{
        let container = document.getElementById('medicoAchados-Container');
        if(container.children.length == 0){
            const div = document.createElement('div');
            div.classList.add('naoAdd');
                div.innerHTML = `
                <a class="naoAdd">
                    <h2 id='textNotADD'>Insira um nome</h2>
                </a>`
            container.appendChild(div);
        }else if(container.children.length == 1){
            document.getElementById('textNotADD').textContent = 'Insira um nome';
        }
            
    }
}

function abrirTeste(medico){
    localStorage.setItem('aaaaaa', medico);
    window.location.href = 'MarcarConsultaMedico02.html';
}
