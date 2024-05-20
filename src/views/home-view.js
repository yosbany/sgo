import BaseView from './base-view.js';

const MENUITEM = [
    { id: 'home', name: 'Inicio', icon: 'home', route: '#home' },
    { id: 'make-order', name: 'Ordenes de Compra', icon: 'mdi-view-dashboard', route: '#make-order' },
    { id: 'budget-lunch', name: 'Lanch Para Fiestas', icon: 'mdi-chart-bubble', route: '#budget-lunch' },
    { id: 'accounting-transactions', name: 'Movimientos', icon: 'mdi-blur-linear', route: '#accounting-transactions' },
    { id: 'rrhh', name: 'Nóminas', icon: 'mdi-note-outline', route: '#rrhh' },
    { id: 'recipe-book', name: 'Recetario', icon: 'mdi-relative-scale', route: '#recipe-book' },
    { id: 'online-catalog', name: 'Catálogo', icon: 'mdi-pencil', route: '#online-catalog' },
    { id: 'procedures', name: 'Procedimientos', icon: 'mdi-multiplication-box', route: '#procedures' },
    { id: 'purchase-plan', name: 'Plan de Compras', icon: 'mdi-bulletin-board', route: '#purchase-plan' },
    { id: 'counter-shifts', name: 'Turnos Mostrados', icon: 'mdi-bulletin-board', route: '#counter-shifts' },
    { id: 'calculate-price', name: 'Calcular Precios', icon: 'mdi-bulletin-board', route: '#calculate-price' },
    { id: 'purchase-price', name: 'Buscador de Costos', icon: 'mdi-bulletin-board', route: '#purchase-price' },
    { id: 'print-price', name: 'Imprimir Precios', icon: 'mdi-bulletin-board', route: '#print-price' },
    { id: 'posters', name: 'Generar Carteles', icon: 'mdi-bulletin-board', route: '#posters' }
];

export default class HomeView extends BaseView {

    constructor(controller) {
        super();
        this.controller = controller;
    }

    async renderView() {
        await this.getPartials('home.html', 'Inicio');
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