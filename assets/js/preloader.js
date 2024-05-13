// Función para insertar el loader
function insertLoader() {
    var pre = document.createElement("div");
    pre.innerHTML = '<div class="loader-wrapper"><div class="loader">Loading...</div></div>';
    document.body.insertBefore(pre, document.body.firstChild);
}

// Función para agregar la clase "loaded" al body cuando el DOM está cargado
function addLoadedClass() {
    document.body.className += " loaded";
}

// Insertar el loader cuando la página se carga por primera vez
window.addEventListener("DOMContentLoaded", function(event) {
    insertLoader();
});

// Agregar la clase "loaded" cuando el DOM está cargado
window.addEventListener("DOMContentLoaded", function(event) {
    addLoadedClass();
});

// Insertar el loader y agregar la clase "loaded" cuando cambia el hash de la URL
window.addEventListener("hashchange", function(event) {
    insertLoader();
    addLoadedClass();
});
