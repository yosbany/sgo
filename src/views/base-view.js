import { redirectTo, showLoaderPage, showLoaderApp, hideLoaderPage, hideLoaderApp } from '../util.js'

export default class BaseView {
    constructor() {
        this.eventHandlerMenu();
    }

    getContent(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            return element;
        }
        else {
            alert("No se encontro el elemento " + elementId);
        }
    }

    eventHandlerMenu() {
        const sidebarNav = document.getElementById('sidebarnav');
        if (sidebarNav) {
            // Añadir evento click a los elementos del menú
            const menuItemsElements = sidebarNav.querySelectorAll('.sidebar-item');
            menuItemsElements.forEach(item => {
                const link = item.querySelector('.sidebar-link');
                item.addEventListener('click', () => {
                    // Remover las clases 'selected' y 'active' de todos los elementos del menú
                    menuItemsElements.forEach(item => {
                        item.classList.remove('selected');
                        item.querySelector('.sidebar-link').classList.remove('active');
                    });
                    // Agregar las clases 'selected' y 'active' al elemento clicado
                    item.classList.add('selected');
                    link.classList.add('active');
                });
            });
        }
    }

    async getPartials(partial, title) {
        const elementId = 'app';
        const element = this.getContent(elementId);
        const urlPartial = './src/views/partials/' + partial;
        return fetch(urlPartial)
            .then(response => response.text())
            .then(html => {
                const tempElement = document.createElement('div');
                tempElement.innerHTML = html;
                tempElement.querySelectorAll('script').forEach(script => script.parentNode.removeChild(script));
                element.innerHTML = tempElement.innerHTML;
            })
            .then(() => {
                const newTitle = "SGO - " + title;
                document.title = newTitle;
                document.getElementById("mainTitlePage").innerText = title;
            });
    }

    addUrlParameter(path, key, value) {
        let separator = path.includes('?') ? '&' : '?';
        let newUrl = path + separator + encodeURIComponent(key) + '=' + encodeURIComponent(value);
        return newUrl;
    }

    redirectToPage(path, paramKey, paramValue) {
        if (paramKey && paramValue) {
            let newPath = this.addUrlParameter(path, paramKey, paramValue);
            redirectTo(newPath);
        }
        else {
            redirectTo(path);
        }
    }

    hideSnipperPage(){
        $(".preloader").fadeOut();
        $(".preloaderapp").fadeOut();
    }
    showSnipperContent(){
        $(".preloaderapp").fadeIn();
    }
    hideSnipperContent(){
        $(".preloaderapp").fadeOut();
    }

    showLoaderPage() {
        showLoaderPage();
    }

    showLoaderApp() {
        showLoaderApp();
    }

    hideLoaderPage() {
        hideLoaderPage();
    }
    hideLoaderApp() {
        hideLoaderApp();
    }

    imprimirContenido(contenido) {
        // Divide el contenido por líneas
        const lineas = contenido.split('\n');

        // Construye el contenido con viñetas a partir de la segunda línea
        let contenidoConVinetas = lineas.map((linea, index) => {
            // Para la primera línea, envuélvela en una etiqueta <strong>
            if (index === 0) {
                return `<strong class='primer-linea'>${linea}</strong><br>`;
            } else if (index < 4) {
                return `${linea}<br>`;
            } else if (linea.trim() !== '') { // Verifica si la línea no está vacía
                // Para las líneas siguientes no vacías, envuélvelas en etiquetas <li>
                return `<li>${linea}</li>`;
            } else {
                return ''; // Si la línea está vacía, no la incluyas en el contenido
            }
        }).join(''); // Une todas las líneas con un salto de línea

        // Crea una nueva ventana de impresión
        const ventanaImpresion = window.open('', '_blank');

        // Establece el contenido de la ventana de impresión
        ventanaImpresion.document.write(`
            <html>
            <head>
                <title>Resumen del Pedido</title>
                <style>
                    /* Agrega estilos para la impresión */
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 10px;
                    }
                    .resumen-pedido {
                        max-width: 80mm; /* Ancho máximo para el papel de 80 mm */
                        font-size: 12px; /* Tamaño de fuente adecuado */
                    }
                    .resumen-pedido ul {
                        padding-left: 20px; /* Agrega un margen entre la viñeta y el texto */
                    }
                    .resumen-pedido li {
                        list-style-type: circle; /* Establece la viñeta como un círculo */
                    }
                    .resumen-pedido .primer-linea {
                        font-weight: bold; /* Aplica negrita a la primera línea */
                    }
                </style>
            </head>
            <body>
                <div class="resumen-pedido">
                    <ul>
                        ${contenidoConVinetas}
                    </ul>
                </div>
            </body>
            </html>
        `);

        // Cierra la escritura en el documento de la ventana de impresión
        ventanaImpresion.document.close();

        // Imprime el contenido
        ventanaImpresion.print();
    }



}