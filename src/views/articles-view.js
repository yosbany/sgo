import BaseView from './base-view.js';

export default class ArticlesView extends BaseView {
    
    constructor(controller) {
        super();
        this.controller = controller;
    }

    async reloadTableArticles(articles) {
        let tbody = document.getElementById("body-table-articules");
        tbody.innerHTML = '';
        if (articles.length === 0) {
            let tr = document.createElement('tr');
            tr.innerHTML = `
                <th colspan="4" style="text-align: center;"><b>No hay registros<b></th>
            `;
            tbody.appendChild(tr);
        } else {
            articles.forEach(row => {
                let tr = document.createElement('tr');
                tr.innerHTML = `
                <th scope="col" style="vertical-align: middle;">${row.nombre}</th>
                <th scope="col" style="vertical-align: middle;">
                    <div class="d-flex flex-column flex-md-row justify-content-end" style="float: right;">
                        <button type="button" class="details btn btn-info btn-sm table-action-btn mb-1 mb-md-0 me-md-1">
                            <i class="mdi mdi-details"></i>
                        </button>
                    </div>
                </th>
                `;

                tbody.appendChild(tr);

                tr.querySelector('.details').addEventListener('click', (event) => {
                    const nombre = document.getElementById('nombre');
                    const pack_compra = document.getElementById('pack_compra');
                    const stock_deseado = document.getElementById('stock_deseado');
                    const precio_compra = document.getElementById('precio_compra');

                    nombre.value = row.nombre;
                    pack_compra.value = row.pack_compra;
                    stock_deseado.value = row.stock_deseado;
                    precio_compra.value = row.precio_compra;

                    this.updateSelectedOptions(row.proveedores);

                    const modal = new bootstrap.Modal(document.getElementById('modal-details-items'));
                    modal.show();
                });
            });
            const btn_guardar = document.getElementById("btn_guardar");
            btn_guardar.addEventListener('click', async () => {
                var proveedores = [];
                $('#proveedores').find(':selected').each(function() {
                    var text = $(this).text();
                    proveedores.push(text);
                });
                const nombre = document.getElementById('nombre');
                const pack_compra = document.getElementById('pack_compra');
                const stock_deseado = document.getElementById('stock_deseado');
                const precio_compra = document.getElementById('precio_compra');
                var articulo = {
                    nombre: nombre.value,
                    pack_compra: pack_compra.value,
                    stock_deseado: stock_deseado.value,
                    precio_compra: precio_compra.value,
                    proveedores: proveedores
                }
                const modal = new bootstrap.Modal(document.getElementById('modal-details-items'));
                try {
                    await this.controller.guardarArticuloAction(articulo);
                    toastr.success("Articulo guardado correctamente.");
                    modal.hide();
                } catch (error) {
                    console.error('Error guardando el articlo:', error);
                    toastr.error("Hubo un error al guardar el articulo. Por favor, intente nuevamente.");
                }
                
               
            });
        }
    }

    updateSelectedOptions(optionsSelected = []) {
        const selectElement = $('#proveedores');
        selectElement.val(optionsSelected).trigger('change');
    }

    reloadSelect(options, optionsSelected = []) {
        const selectElement =  $('#proveedores');
        options.forEach(option => {
            const optionElement = $('<option>').attr('value', option.nombre).text(option.nombre);
            if (optionsSelected.includes(option.nombre)) {
                optionElement.attr('selected', 'selected');
            }
            selectElement.append(optionElement);
        });
        $('#proveedores').trigger('change');
    }

    async listArticlesRenderPartialView(articles, proveedores) {
        await this.getPartials('list-articles.html', 'Artículos');
        this.reloadSelect(proveedores, []);
        $('#proveedores').select2({
            width: '100%'
        });
        this.reloadTableArticles(articles);
        this.hideWait();
    }
}