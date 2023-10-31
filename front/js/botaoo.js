let container;
let links;

document.addEventListener('DOMContentLoaded', function () {
    container = document.getElementById("containerDataHora");
});

function pintarBotao(aa) {
    localStorage.setItem("marcarConsultaDia", aa.querySelector("h2").textContent);
    localStorage.setItem("marcarConsultaHora", aa.querySelector("p").textContent);
    if(aa.classList.contains("selecionado")){
        aa.classList.remove("selecionado");
    }else{
        aa.classList.add("selecionado")
    }
    links = container.querySelectorAll("a");
    links.forEach(link=>{
        if(link == aa){
            console.log(1)
        }else{
            if(link.classList.contains("selecionado")){
                link.classList.remove("selecionado");
            }
        }
    })
}
