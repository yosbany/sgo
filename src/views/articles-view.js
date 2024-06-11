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
                        <button type="button" class="view btn btn-info btn-sm table-action-btn mb-1 mb-md-0 me-md-1">
                            <i class="mdi mdi-eye"></i>
                        </button>
                    </div>
                </th>
                `;

                tbody.appendChild(tr);

                tr.querySelector('.view').addEventListener('click', (event) => {
                    const nombre = document.getElementById('nombre');
                    nombre.value = row.nombre;
                    this.updateSelectedOptions(row.proveedores);
                    const modal = new bootstrap.Modal(document.getElementById('modal-details-items'));
                    modal.show();
                });
            });
        }
    }

    updateSelectedOptions(optionsSelected = []) {
        const selectElement = $('#dynamic-select');
        selectElement.val(optionsSelected).trigger('change');
    }

    reloadSelect(options, optionsSelected = []) {
        const selectElement =  $('#dynamic-select');
        options.forEach(option => {
            const optionElement = $('<option>').attr('value', option.nombre).text(option.nombre);
            if (optionsSelected.includes(option.nombre)) {
                optionElement.attr('selected', 'selected');
            }
            selectElement.append(optionElement);
        });
        $('#dynamic-select').trigger('change');
    }

    async listArticlesRenderPartialView(articles, proveedores) {
        await this.getPartials('list-articles.html', 'Artículos');
        this.reloadSelect(proveedores, []);
        $('#dynamic-select').select2({
            theme: 'bootstrap-5',
            width: '100%'
        });
        this.reloadTableArticles(articles);
    }
}