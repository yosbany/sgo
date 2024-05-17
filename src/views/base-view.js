import { redirectTo, showLoaderPage, showLoaderApp, hideLoaderPage, hideLoaderApp } from '../util.js'

export default class BaseView {


    constructor() {
        this.PATH_FRAGMENTS = "./src/views/partials/";
    }

    emitEventController(keyEvent, dataEvent) {
        document.dispatchEvent(new CustomEvent(keyEvent, dataEvent));
    }

    getContent(elementId) {
        return document.getElementById(elementId) ? document.getElementById("elementId").innerHTML : document.createElement("dvi").innerHTML;
    }

    async fetchAndSetHTML(url, targetElementId, title) {

        this.hideLoaderPage();
        this.hideLoaderApp();

        return fetch(url)
            .then(response => response.text())
            .then(html => {
                document.getElementById(targetElementId).innerHTML = this._filterScripts(html);
            })
            .then(() =>{
                this._setPageTitleAndHeader(title)
            });
    }

    _filterScripts(html) {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = html;
        //tempElement.querySelectorAll('script').forEach(script => script.parentNode.removeChild(script));
        return tempElement.innerHTML;
    }

    redirectToPage(path) {
        redirectTo(path);
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

    _setPageTitleAndHeader(title) {
        const newTitle = "NRD - " + title;
        document.title = newTitle;
        //document.getElementById("pageTitle").innerText = newTitle;
        document.getElementById("mainTitle").innerText = title;
        this._setSidebarMenu()
    }

    _setSidebarMenu() {
        if (window.location.hash) {
            const hash = window.location.hash.slice(1);
            const sidebarLinks = document.querySelectorAll('#sidebar-menu a.mdc-drawer-link');
            sidebarLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href && href.includes('#' + hash)) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }

    }

    imprimirContenido(contenido) {
        // Divide el contenido por líneas
        const lineas = contenido.split('\n');
    
        // Construye el contenido con viñetas a partir de la segunda línea
        let contenidoConVinetas = lineas.map((linea, index) => {
            // Para la primera línea, envuélvela en una etiqueta <strong>
            if (index === 0) {
                return `<strong class='primer-linea'>${linea}</strong><br>`;
            } else if(index < 4){
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