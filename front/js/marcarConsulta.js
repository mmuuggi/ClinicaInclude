var anoSelecionado = '';
var botoesAno = document.querySelectorAll('.Datasano button');

botoesAno.forEach(function(botao) {
    botao.addEventListener('click', function() {
        anoSelecionado = botao.getAttribute('data-ano');
});
});
function oii(){
    let dia = document.getElementById("dia").value;
    let mes = document.getElementById("mes").value;
    let ano = anoSelecionado;
    let dataAtual;
    if(dia < 10){
        dataAtual = '0' + dia + '/' + mes + '/' + ano;
    }else{
        dataAtual = dia + '/' + mes + '/' + ano;
    }
    console.log(dataAtual);

    
}