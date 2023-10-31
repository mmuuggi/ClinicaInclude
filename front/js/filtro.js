let especialidade = '';
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
    };fetch('https://includeapi-production.up.railway.app/teste', {
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
                fetch('https://includeapi-production.up.railway.app/filtro', {
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
                       
                        let naoSei = data.medicos;
                        let container = document.getElementById('containerMedico');
                        localStorage.setItem('T', JSON.stringify(naoSei));
                        if(naoSei.length > 0){
                            let ab = JSON.parse(localStorage.getItem('T'));
                            while (container.firstChild) {
                                container.removeChild(container.firstChild);
                            }
                            ab.forEach(a =>{
                                const div = document.createElement('div');
                                let email1 = a.email;
                                div.innerHTML = `
                                <a onclick="abrirTeste('${email1}')">
                                <img src="image/Pfp Médico.svg" alt="">
                                    <h2>${a.nome}</h2>
                                    <p>${a.especialidade}</p>
                                </a>`;
                            
                                container.appendChild(div);
                            })
                        }else{
                            while (container.firstChild) {
                                container.removeChild(container.firstChild);
                            }
                            const div = document.createElement('div');
                                div.innerHTML = `
                                <a>
                                    <h2>Nada encontrado</h2>
                                </a>`;
                            
                                container.appendChild(div);
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
    let pesquisa = document.getElementById('pesquisa').value;
    if(pesquisa != ''){
        const data = {
            nome: pesquisa
        };
        fetch('https://includeapi-production.up.railway.app/filtro', {
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
                while (container.firstChild) {
                    container.removeChild(container.firstChild);
                }
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
            let medicos = data.medicos;
            localStorage.setItem('NomesMedicos', JSON.stringify(data.medicos));
            let container = document.getElementById('medicoAchados-Container');
            if(medicos){
                while (container.firstChild) {
                    container.removeChild(container.firstChild);
                }
                let medico = JSON.parse(localStorage.getItem('NomesMedicos'));
                medico.forEach(medico1 =>{
                    if (!container.querySelector(`[data-id="${medico1.email}"]`)) {
                    if(container.querySelector('.naoAdd')){
                        let aa = container.querySelector('.naoAdd');
                        aa.remove();
                    }
                    const div = document.createElement('div');
                    let email1 = medico1.email;
                    div.innerHTML = `
                    <a data-id="${medico1.email}" onclick="abrirTeste('${email1}')">
                    <img src="image/Pfp Médico.svg" alt="">
                        <h2>${medico1.nome}</h2>
                        <p>${medico1.especialidade}</p>
                    </a>`;
                
                    container.appendChild(div);
                    }

                }

                ) 
            }else{
                console.log(medicos)
            }
        });
    }else{
        
        let container = document.getElementById('medicoAchados-Container');
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
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
        fetch('https://includeapi-production.up.railway.app/filtro', {
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
                while (container.firstChild) {
                    container.removeChild(container.firstChild);
                }
                if(container.children.length == 0){
                    const div = document.createElement('div');
                    div.classList.add('naoAdd');
                    div.innerHTML = `
                    <a class="naoAdd">
                        <h2 id='textNotADD'>Especialidade não disponível</h2>
                    </a>`
                    container.appendChild(div);
                }else if(container.children.length == 1){
                    document.getElementById('textNotADD').textContent = 'Especialidade não disponível';
                }
            }
        })
        .then(data =>{
            let medicos = data.medicos;
            localStorage.setItem('NomesMedicos', JSON.stringify(medicos));
            let container = document.getElementById('medicoAchados-Container');
            if(medicos){
                
                let medico = JSON.parse(localStorage.getItem('NomesMedicos'));
                while (container.firstChild) {
                    container.removeChild(container.firstChild);
                }
                medico.forEach(medico1 =>{
                    if (!container.querySelector(`[data-id="${medico1.email}"]`)) {
                    const div = document.createElement('div');
                    let email1 = medico1.email;
                    div.innerHTML = `
                    <a data-id="${medico1.email}" onclick="abrirTeste('${email1}')">
                    <img src="image/Pfp Médico.svg" alt="">
                        <h2>${medico1.nome}</h2>
                        <p>${medico1.especialidade}</p>
                    </a>`;
                
                    container.appendChild(div);
                    }
                }) 
            }else{

            }
        });
    }else{
        let container = document.getElementById('medicoAchados-Container');
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        if(container.children.length == 0){
            const div = document.createElement('div');
            div.classList.add('naoAdd');
                div.innerHTML = `
                <a class="naoAdd">
                    <h2 id='textNotADD'>Escolha uma especialidade</h2>
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
