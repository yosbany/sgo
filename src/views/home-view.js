import BaseView from './base-view.js';

const MENUITEM = [
    { id: 'home', name: 'Inicio', icon: 'home', route: '#home' },
    { id: 'make-order', name: 'Ordenes de Compra', icon: 'attach_money', route: '#make-order' },
    { id: 'budget-lunch', name: 'Lanch Para Fiestas', icon: 'track_changes', route: '#budget-lunch' },
    { id: 'accounting-transactions', name: 'Movimientos', icon: 'grid_on', route: '#accounting-transactions' },
    { id: 'rrhh', name: 'Nóminas', icon: 'business', route: '#rrhh' },
    { id: 'recipe-book', name: 'Recetario', icon: 'local_dining', route: '#recipe-book' },
    { id: 'online-catalog', name: 'Catálogo', icon: 'grid_on', route: '#online-catalog' },
    { id: 'procedures', name: 'Procedimientos', icon: 'chrome_reader_mode', route: '#procedures' },
    { id: 'purchase-plan', name: 'Plan de Compras', icon: 'grid_on', route: '#purchase-plan' },
    { id: 'counter-shifts', name: 'Turnos Mostrados', icon: 'grid_on', route: '#counter-shifts' },
    { id: 'calculate-price', name: 'Calcular Precios', icon: 'build', route: '#calculate-price' },
    { id: 'purchase-price', name: 'Buscador de Costos', icon: 'build', route: '#purchase-price' },
    { id: 'print-price', name: 'Imprimir Precios', icon: 'build', route: '#print-price' },
    { id: 'posters', name: 'Generar Carteles', icon: 'build', route: '#posters' }
];

export default class HomeView extends BaseView {

    constructor(controller) {
        super();
        this.controller = controller;
    }

    async renderView() {
        console.log("renderView");
        await this.fetchAndSetHTML(this.PATH_FRAGMENTS + "home.html", "app", "Inicio");
        this.createMenu();
        this.initEventView();
    }

    createMenu() {
        const sidebarNav = document.getElementById('sidebarnav');
        let menuHTML = '';
        MENUITEM.forEach(item => {
            console.log(item);
            menuHTML += `
                <li id="${item.id}" class="sidebar-item">
                    <a class="sidebar-link waves-effect waves-dark sidebar-link" href="${item.route}" aria-expanded="false">
                        <i class="mdi ${item.icon}"></i>
                        <span class="hide-menu">${item.name}</span>
                    </a>
                </li>`;
        });
        sidebarNav.innerHTML = menuHTML;
        // Añadir evento click a los elementos del menú
        const menuItemsElements = sidebarNav.querySelectorAll('.sidebar-item');
        menuItemsElements.forEach(item => {
            item.addEventListener('click', () => {
                // Remover la clase 'selected' de todos los elementos del menú
                menuItemsElements.forEach(item => item.classList.remove('selected'));
                // Agregar la clase 'selected' al elemento clicado
                item.classList.add('selected');
            });
        });
    }

    initEventView() {

    }


}