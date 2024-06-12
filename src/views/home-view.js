import { formatDate } from '../util.js';
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
                        this.redirectToPage("#calculate-price");
                        break;
                    case 'card5':
                        this.redirectToPage("#list-backup");
                        break;
                    case 'card6':
                        alert('Buscador de Costos');
                        // Lógica específica para la card 6
                        break;
                    case 'card7':
                        alert('Turnos Mostrados');
                        // Lógica específica para la card 7
                        break;
                    case 'card8':
                        alert('Plan de Compras');
                        // Lógica específica para la card 8
                        break;
                    default:
                        console.log('Card desconocida');
                }
            });
        });
        this.hideSnipperPage();
    }

    async listBackupRenderPartialView(listBackup){
        await this.getPartials('list-backup.html', 'Lista de Backups');
        this.reloadTablaBackup(listBackup);

    }

    async reloadTablaBackup(listBackup){
        let tbody = document.getElementById("body-table-backups");
        tbody.innerHTML = '';
        if (listBackup.length === 0) {
            let tr = document.createElement('tr');
            tr.innerHTML = `
                <th colspan="4" style="text-align: center;"><b>No hay registros<b></th>
            `;
            tbody.appendChild(tr);
        } else {
            listBackup.forEach(row => {
                let tr = document.createElement('tr');
                tr.innerHTML = `
                <th scope="col" style="vertical-align: middle;">${formatDate(row.fecha)}</th>
                <th scope="col" style="vertical-align: middle;">${row.nombre}</th>
                <th scope="col" style="vertical-align: middle;">
                    <div class="d-flex flex-column flex-md-row justify-content-end" style="float: right;">
                        <button type="button" class="restore btn btn-info btn-sm table-action-btn mb-1 mb-md-0 me-md-1">
                            <i class="mdi mdi-restore"></i>
                        </button>
                    </div>
                </th>
                `;

                tbody.appendChild(tr);

                tr.querySelector('.restore').addEventListener('click', (event) => {
                    const confirmRestoredBackup = new bootstrap.Modal(document.getElementById('confirm-restored-backup'));
                    confirmRestoredBackup.show();
                });
                document.getElementById('btn-confirm-modal').addEventListener('click', async (event) => {
                    await this.controller.restoredBackup(row.nombre);
                    const confirmRestoredBackup = bootstrap.Modal.getInstance(document.getElementById('confirm-restored-backup'));
                    confirmRestoredBackup.hide();
                    toastr.success("Backup restaurado correctamente.");
                    this.redirectToPage('#home');
                });
            });
        }
    }



}
