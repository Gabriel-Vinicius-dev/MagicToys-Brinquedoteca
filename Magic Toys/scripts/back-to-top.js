// Lógica para o botão "Voltar ao Topo"
window.onscroll = function() {
    scrollFunction();
};

const btnTopo = document.getElementById("btnTopo");

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btnTopo.style.display = "block";
    } else {
        btnTopo.style.display = "none";
    }
}

btnTopo.addEventListener("click", () => {
    document.body.scrollTop = 0; // Para Safari
    document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE e Opera
});