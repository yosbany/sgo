// Función para mostrar el loader
function showLoader() {
    var pre = document.createElement("div");
    pre.innerHTML = '<div class="loader-wrapper"><div class="loader">Loading...</div></div>';
    document.body.insertBefore(pre, document.body.firstChild);
}

// Función para marcar la página como cargada
function markPageLoaded() {
    document.body.className += " loaded";
}

// Mostrar el loader cuando se carga la página
document.addEventListener("DOMContentLoaded", function(event) {
    showLoader();
});

// Marcar la página como cargada cuando cambia el hash de la URL
window.addEventListener("hashchange", function() {
    showLoader();
    markPageLoaded();
});
