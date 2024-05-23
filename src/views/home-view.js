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
        
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', async (event) => {
                const cardId = event.currentTarget.id;
                console.log("event: " + event);
                console.log("cardId.currentTarget: " + event.currentTarget);
                console.log("cardId: " + cardId);
                switch (cardId) {
                    case 'card1':
                        this.redirectToPage("#new-purchase-order");
                        break;
                    case 'card2':
                        alert('Nuevo Movimiento Contable');
                        // Lógica específica para la card 2
                        break;
                    case 'card3':
                        alert('Nueva Tarea Operativa');
                        // Lógica específica para la card 3
                        break;
                    case 'card4':
                        alert('Calculadora de Precios');
                        // Lógica específica para la card 4
                        break;
                    case 'card5':
                        await this.controller.loadDataAction();
                        toastr.success("Datos cargados correctamente.");
                        break;
                    default:
                        console.log('Card desconocida');
                }
            });
        });
    }

    

    initEventView() {

    }


}