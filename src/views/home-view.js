import BaseView from './base-view.js';

const MENUITEM = [
    { name: 'Inicio', icon: 'home', route: '#home' },
    { name: 'Ordenes de Compra', icon: 'mdi-view-dashboard', route: '#list-purchase-orders' },
    { name: 'Lanch para Fiestas', icon: 'mdi-chart-bubble', route: '#budget-lunch' },
    { name: 'Movimientos', icon: 'mdi-blur-linear', route: '#accounting-transactions' },
    { name: 'Nóminas', icon: 'mdi-note-outline', route: '#rrhh' },
    { name: 'Recetario', icon: 'mdi-relative-scale', route: '#recipe-book' },
    { name: 'Catálogo de Producción', icon: 'mdi-pencil', route: '#list-production-catalog' },
    { name: 'Procedimientos', icon: 'mdi-multiplication-box', route: '#procedures' },
    { name: 'Plan de Compras', icon: 'mdi-alert', route: '#purchase-plan' },
    { name: 'Turnos Mostrados', icon: 'mdi-bulletin-board', route: '#counter-shifts' },
    { name: 'Calcular Precios', icon: 'mdi-alert-octagon', route: '#calculate-price' },
    { name: 'Buscador de Costos', icon: 'mdi-bulletin-board', route: '#purchase-price' },
    { name: 'Imprimir Precios', icon: 'mdi-all-inclusive', route: '#print-price' },
    { name: 'Generar Carteles', icon: 'mdi-all-inclusive', route: '#posters' }
];

export default class HomeView extends BaseView {

    constructor(controller) {
        super();
        this.controller = controller;
    }

    async homeRenderPartialView() {
        await this.getPartials('home.html', 'Inicio');
        this.createMenu();
        this.initEventView();
    }

    createMenu() {
        const sidebarNav = document.getElementById('sidebarnav');
        let menuHTML = '';

        MENUITEM.forEach(item => {
            const isSelected = item.route === '#home' ? 'selected' : '';
            const isActive = item.route === '#home' ? 'active' : '';
    
            menuHTML += `
                <li class="sidebar-item ${isSelected}">
                    <a class="sidebar-link waves-effect waves-dark sidebar-link ${isActive}" href="${item.route}" aria-expanded="false">
                        <i class="mdi ${item.icon}"></i>
                        <span class="hide-menu">${item.name}</span>
                    </a>
                </li>`;
        });
    
        sidebarNav.innerHTML = menuHTML;
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

    initEventView() {

    }


}