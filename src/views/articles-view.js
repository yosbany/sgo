import BaseView from './base-view.js';

export default class ArticlesView extends BaseView {
    
    constructor(controller) {
        super();
        this.controller = controller;
        this.reloadDom();
    }

    cacheDom() {
        super.cacheBaseDom();
        this.dom.tbodyArticulos = document.getElementById("id-tbody-articulos");
        this.dom.btnsVerDetalleArticuloArray = document.querySelector('.class-button-detalles-articulo');
        this.dom.inputIdArticulo = document.getElementById('id-input-id-articulo');
        this.dom.inputNombreArticulo = document.getElementById('id-input-nombre-articulo');
        this.dom.inputPackCompraArticulo = document.getElementById('id-input-pack-compra-articulo');
        this.dom.inputStockDeseadoArticulo = document.getElementById('id-input-stock-deseado-articulo');
        this.dom.inputPrecioCompraArticulo = document.getElementById('id-input-precio-compra-articulo');
        this.dom.multiselectProveedoresArticulo = $('#id-multiselect-proveedores-articulo');
        this.dom.modalDetalleArticulo = document.getElementById('id-div-modal-detalle-articulo');
        this.dom.btnGuardarArticulo = document.getElementById('id-btn-guardar-articulo');
        this.dom.btnEliminarArticulo = document.getElementById('id-btn-eliminar-articulo');
        this.dom.btnNuevoArticulo = document.getElementById('id-btn-nuevo-articulo');
    }

    bindEvents() {
        super.bindBaseEvents();
        this.dom.btnsVerDetalleArticuloArray.addEventListener('click', (event) => this.handleClickBtnVerDetallesArticulo(event));
        this.dom.btnGuardarArticulo.addEventListener('click', (event) => this.handleClickBtnGuardarArticulo(event));
        this.dom.btnEliminarArticulo.addEventListener('click', (event) => this.handleClickBtnEliminarArticulo(event));
        this.dom.btnNuevoArticulo.addEventListener('click', (event) => this.handleClickBtnNuevoArticulo(event));
    }

    reloadDom() {
        this.cacheDom();
        this.bindEvents(); 
    } 

    handleLoadSelectProveedores(optionsSelected = []) {
        const options = this.controller.getProveedoresAction();
        options.forEach(option => {
            const optionElement = $('<option>').attr('value', option.id).text(option.nombre);
            if (optionsSelected.includes(option.id)) {
                optionElement.attr('selected', 'selected');
            }
            this.dom.multiselectProveedoresArticulo.append(optionElement);
        });
        this.dom.multiselectProveedoresArticulo.trigger('change');
        this.dom.multiselectProveedoresArticulo.select2({
            width: '100%'
        });
    }

    async handleLoadTableArticulo(){
        const items = this.controller.getArticulosAction();
        this.dom.tbodyArticulos.innerHTML = "";
        if (items.length === 0) {
            let tr = document.createElement('tr');
            tr.innerHTML = `
                <th colspan="4" style="text-align: center;"><b>No hay registros<b></th>
            `;
            this.dom.tbodyArticulos.appendChild(tr);
        }
        else{
            items.forEach(row => {
                let tr = document.createElement('tr');
                tr.innerHTML = `
                    <th style="vertical-align: middle;">${row.nombre}</th>
                    <th style="vertical-align: middle;">
                        <div class="d-flex flex-column flex-md-row justify-content-end" style="float: right;">
                            <button type="button" class="class-button-detalles-articulo btn btn-info btn-sm table-action-btn mb-1 mb-md-0 me-md-1" id-obj-row=${row.id}>
                                <i class="mdi mdi-details"></i>
                            </button>
                        </div>
                    </th>
                `;
                this.dom.tbodyArticulos.appendChild(tr);
            });
        }
    }

    async handleClickBtnVerDetallesArticulo(event){
        const element = event.currentTarget;
        const id = element.getAttribute('id-obj-row');
        const articulo = await this.controller.getArticuloAction(id);
        console.log("articulo",articulo)
    }

    async handleClickBtnGuardarArticulo(event){
        const id = this.dom.inputIdArticulo.value;
        const articulo = await this.controller.getArticuloAction(id);
        console.log("articulo",articulo)
    }

    async handleClickBtnEliminarArticulo(event){
        const id = this.dom.inputIdArticulo.value;
        const articulo = await this.controller.getArticuloAction(id);
        console.log("articulo",articulo)
    }

    async handleClickBtnNuevoArticulo(event){
        console.log("new articulo")
    }

    async listArticlesRenderPartialView(articles, proveedores) {
        await this.getPartials('list-articles.html', 'Artículos');
        this.reloadDom();
        this.handleLoadTableArticulo();
        this.hideWait();
    }
}