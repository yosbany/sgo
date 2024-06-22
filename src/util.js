function toggleElementVisibility(elementId, isVisible) {
    const element = document.getElementById(elementId);
    if (element) {
        if (isVisible) {
            element.classList.remove("d-none");
            element.classList.add("d-block");
        } else {
            element.classList.remove("d-block");
            element.classList.add("d-none");
        }
    }
}

export function showWaitPlease(){
    var content = document.getElementsByClassName('main-wrapper')[0];
    if(!content){
        content = document.body;
    }
    content.style.display = 'none';
    $(".preloader").fadeIn();
}

export function hideWaitPlease(){
    $(".preloader").fadeOut(() => {
        var content = document.getElementsByClassName('main-wrapper')[0];
        if(!content){
            content = document.body;
        }
        content.style.display = 'block';
    });
}

export function redirectTo(path) {
    window.location.replace(path);
}

export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function formatDate(fecha) {
    if (!fecha) return '';
    const dateObj = new Date(fecha);
    const opciones = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    let fechaFormateada = dateObj.toLocaleString('es-ES', opciones);
    fechaFormateada = fechaFormateada.replace(/,/, '');
    return fechaFormateada;
}
