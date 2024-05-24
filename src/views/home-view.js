import BaseView from './base-view.js';

export default class HomeView extends BaseView {
    constructor(controller) {
        super();
        this.controller = controller;
    }

    async index(){
       this.homeRenderPartialView();
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

}
