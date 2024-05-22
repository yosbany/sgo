import BaseView from './base-view.js';

export default class PurchaseOrdersView extends BaseView {

    constructor(controller) {
        super();
        this.controller = controller;
    }

    async cargarTablaOrdenes(ordenes) {
        let tbody = document.getElementById("body-table-order");
        tbody.innerHTML = '';
        if (ordenes.length === 0) {
            let tr = document.createElement('tr');
            tr.innerHTML = `
                <th colspan="4" style="text-align: center;"><b>No hay registros<b></th>
            `;
            tbody.appendChild(tr);
        } else {
            ordenes.forEach(row => {
                let tr = document.createElement('tr');
                tr.innerHTML = `
                <th scope="col" style="vertical-align: middle;">${row.fecha}</th>
                <th scope="col" style="vertical-align: middle;">${row.proveedor}</th>
                <th scope="col" style="vertical-align: middle;">${row.importe}</th>
                <th scope="col" style="vertical-align: middle;">
                    <div class="d-flex flex-column flex-md-row justify-content-end" style="float: right;">
                        <button type="button" class="view btn btn-info btn-sm table-action-btn mb-1 mb-md-0 me-md-1" id-row-data-bind="${row.id}">
                            <i class="mdi mdi-eye"></i>
                        </button>
                        <button type="button" class="edit btn btn-primary btn-sm table-action-btn mb-1 mb-md-0 me-md-1" id-row-data-bind="${row.id}">
                            <i class="mdi mdi-table-edit"></i>
                        </button>
                        <button type="button" class="delete btn btn-danger btn-sm table-action-btn" id-row-data-bind="${row.id}">
                            <i class="mdi mdi-delete"></i>
                        </button>
                    </div>
                </th>
                `;
                tbody.appendChild(tr);
            });
        }
    }

    async cargarSelectProveedores(proveedores, proveedorSeleccionadoPorDefecto = null) {
        let select = document.getElementById("select-proveedores");
        select.innerHTML = '';
        if (proveedores.length === 0) {
            const option = document.createElement('option');
            option.value = '';
            option.textContent = 'No hay proveedores disponibles';
            select.appendChild(option);
        } else {
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Seleccione un proveedor';
            select.appendChild(defaultOption);

            proveedores.forEach(proveedor => {
                const option = document.createElement('option');
                option.value = proveedor.nombre;
                option.textContent = proveedor.nombre;
                if (proveedorSeleccionadoPorDefecto && proveedor.nombre === proveedorSeleccionadoPorDefecto) {
                    option.selected = true;
                }
                select.appendChild(option);
            });
        }
    }

    async cargarTablaArticulosXProveedor(articulos){
        let tbody = document.getElementById("body-tabla-articulos-proveedor");
        tbody.innerHTML = '';
        if (articulos.length === 0) {
            let tr = document.createElement('tr');
            tr.innerHTML = `
                <th colspan="4" style="text-align: center;"><b>No hay registros<b></th>
            `;
            tbody.appendChild(tr);
        } else {
            articulos.forEach(articulo => {
                let tr = document.createElement('tr');
                tr.innerHTML = `
                  <td style="vertical-align: middle;"><input class="form-check-input checkbox-row" type="checkbox" style="scale: 1.6;"></td>
                  <td style="vertical-align: middle;"><h5 data-bs-toggle="tooltip" title="COMPRAS X ${articulo.pack_compra}" style="margin-bottom: 0px !important;cursor: pointer;" data-bind="${articulo.pack_compra}">${articulo.nombre}</h5></td>
                  <td style="vertical-align: middle;"><span class="badge bg-secondary">$ ${articulo.precio_compra}</span></td>
                  <td style="text-align: right;"><input type="number" class="form-control stock-deseado-row" style="width: 80px;float: right;text-align: right;" disabled value=${articulo.stock_deseado}></td>
                `;
                tbody.appendChild(tr);

                const checkbox = tr.querySelector('.checkbox-row');
                const stock_deseado = tr.querySelector('.stock-deseado-row');
                const nombre = tr.cells[1];

                checkbox.addEventListener('change', () => {
                    stock_deseado.disabled = !checkbox.checked;
                    stock_deseado.readOnly = !checkbox.checked;
                    if (checkbox.checked) {
                        tr.classList.add('table-success');
                    }
                    else {
                        tr.classList.remove('table-success');
                    }
                    //this.actualizarResumenPedido();
                });
                stock_deseado.addEventListener('input', () => {
                    //this.actualizarResumenPedido();
                });
                stock_deseado.addEventListener('focus', () => {
                    stock_deseado.value = '';
                });
                stock_deseado.addEventListener('blur', () => {
                    if (stock_deseado.value === '') {
                        stock_deseado.value = articulo.stock_deseado;
                    }
                });

                nombre.addEventListener('click', () => {
                    if (checkbox.checked) {
                        tr.classList.add('table-success');
                    }
                    else {
                        tr.classList.toggle('table-success');
                    }
                });
            });
        }
    }
    
    async listPurchaseOrdersRenderPartialView(ordenes) {
        await this.getPartials('list-purchase-orders.html', 'Lista - Ordenes de Compra');

        this.cargarTablaOrdenes(ordenes);

        document.getElementById('btn-nueva-orden').addEventListener('click', (event) => {
            this.redirectToPage('#new-purchase-order');
        });
        document.querySelectorAll('.view').forEach(button => {
            button.addEventListener('click', (event) => {
                const rowId = button.getAttribute('id-row-data-bind');
                this.redirectToPage('#view-purchase-order', 'idOrder', rowId);
            });
        });
        document.querySelectorAll('.edit').forEach(button => {
            button.addEventListener('click', (event) => {
                const rowId = button.getAttribute('id-row-data-bind');
                this.redirectToPage('#edit-purchase-order', 'idOrder', rowId);
            });
        });
        let deleteRowId = null;
        document.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', (event) => {
                deleteRowId = button.getAttribute('id-row-data-bind');
                const confirmDeleteModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
                confirmDeleteModal.show();
            });
        });
        document.getElementById('btn-confirm-delete').addEventListener('click', (event) => {
            if (deleteRowId) {
                this.controller.deletePurchaseOrderAction(deleteRowId);
                deleteRowId = null;
                const confirmDeleteModal = bootstrap.Modal.getInstance(document.getElementById('confirmDeleteModal'));
                confirmDeleteModal.hide();
            }
        });

    }

    async newPurchaseOrderRenderPartialView(proveedores) {
        await this.getPartials('new-purchase-order.html', 'Nueva - Orden de Compra');
        this.cargarSelectProveedores(proveedores);
        document.getElementById('link-regresar').addEventListener('click', (event) => {
            this.redirectToPage('#list-purchase-orders');
        });
        document.getElementById('select-proveedores').addEventListener('change', async (event) => {
            const proveedorSeleccionado = event.target.value;
            const articulos = await this.controller.getArticulosXProveedorAction(proveedorSeleccionado);
            this.cargarTablaArticulosXProveedor(articulos);
        });
    }

    async viewPurchaseOrderRenderPartialView(order) {
        await this.getPartials('view-purchase-order.html', 'Ver - Orden de Compra');
        this.cargarSelectProveedores(proveedores, "CARNELANDIA");
        document.getElementById('link-regresar').addEventListener('click', (event) => {
            this.redirectToPage('#list-purchase-orders');
        });
    }

    async editPurchaseOrderRenderPartialView(order) {
        await this.getPartials('edit-purchase-order.html', 'Editar - Orden de Compra');
        document.getElementById('link-regresar').addEventListener('click', (event) => {
            this.redirectToPage('#list-purchase-orders');
        });
    }










    async renderView() {
        await this.getPartials('make-order.html', 'Ordenes de Compra');
        this.proveedorSelect = document.getElementById('proveedorSelect');
        this.productosTableBody = document.getElementById('productosTableBody');
        this.resumenPedidoTextarea = document.getElementById('comment');
        this.copiarBtn = document.getElementById('copiarBtn');
        this.imprimirBtn = document.getElementById('imprimirBtn');

        this.initEventView();
        const proveedores = await this.controller.getProveedores();
        this.cargarProveedores(proveedores);
        this.cargarProductos();
    }

    initEventView() {
        this.proveedorSelect.addEventListener('change', event => {
            const proveedorSeleccionado = event.target.value;
            this.cargarProductos(proveedorSeleccionado);
            this.actualizarResumenPedido();
        });
        this.copiarBtn.addEventListener('click', () => {
            this.resumenPedidoTextarea.select();
            document.execCommand('copy');
            this.copiarBtn.textContent = 'Resumen Copiado';
            setTimeout(function () {
                this.copiarBtn.textContent = 'Copiar';
            }, 5000);
        });
        this.imprimirBtn.addEventListener('click', () => {
            const contenido = this.resumenPedidoTextarea.value;
            if (contenido.trim() !== '') {
                this.imprimirContenido(contenido);
            } else {
                console.log('No hay contenido para imprimir.');
            }
        });
    }

    cargarProveedores(proveedores) {
        proveedores.forEach(proveedor => {
            console.log(proveedor);
            const option = document.createElement('option');
            option.value = proveedor.nombre;
            option.textContent = proveedor.nombre;
            this.proveedorSelect.appendChild(option);
        });
    }

    async cargarProductos(proveedorSeleccionado) {
        this.productosTableBody.innerHTML = '';

        const articulos = await this.controller.getArticulosXProveedor(proveedorSeleccionado);
        if (articulos) {
            articulos.forEach(articulo => {
                const row = this.productosTableBody.insertRow();
                row.innerHTML = `
                  <td style="vertical-align: middle;"><input class="form-check-input" type="checkbox" style="scale: 1.6;"></td>
                  <td style="vertical-align: middle;"><h5 data-bs-toggle="tooltip" title="COMPRAS X ${articulo.pack_compra}" style="margin-bottom: 0px !important;cursor: pointer;" data-bind="${articulo.pack_compra}">${articulo.nombre}</h5></td>
                  <td style="vertical-align: middle;"><span class="badge bg-secondary">$ ${articulo.precio_compra}</span></td>
                  <td style="text-align: right;"><input type="number" class="form-control" style="width: 80px;float: right;" disabled value=${articulo.stock_deseado}></td>
                `;
                const checkbox = row.querySelector('.form-check-input');
                const cantidadInput = row.querySelector('.form-control');
                const productoH5 = row.cells[1];

                checkbox.addEventListener('change', () => {
                    cantidadInput.disabled = !checkbox.checked;
                    cantidadInput.readOnly = !checkbox.checked;
                    if (checkbox.checked) {
                        row.classList.add('table-success');
                    }
                    else {
                        row.classList.remove('table-success');
                    }
                    this.actualizarResumenPedido();
                });
                cantidadInput.addEventListener('input', () => {
                    this.actualizarResumenPedido();
                });
                cantidadInput.addEventListener('focus', () => {
                    cantidadInput.value = '';
                });
                cantidadInput.addEventListener('blur', () => {
                    if (cantidadInput.value === '') {
                        cantidadInput.value = articulo.stock_deseado;
                    }
                });

                productoH5.addEventListener('click', () => {
                    if (checkbox.checked) {
                        row.classList.add('table-success');
                    }
                    else {
                        row.classList.toggle('table-success');
                    }
                });

            });
        } else {
            const noRecordsRow = document.createElement('tr');
            noRecordsRow.innerHTML = `
                <td colspan="4" style="text-align: center;">No hay registros</td>
            `;
            this.productosTableBody.appendChild(noRecordsRow);
        }
    }


    actualizarResumenPedido() {
        const proveedorSeleccionado = this.proveedorSelect.value;
        const fechaActual = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });

        const productosMarcados = Array.from(this.productosTableBody.querySelectorAll('input[type="checkbox"]:checked'))
            .map(checkbox => {
                const row = checkbox.closest('tr');
                const producto = row.querySelector('td:nth-child(2)').textContent.trim();
                const cantidad = row.querySelector('input[type="number"]').value || 0;
                const elementWithDataBind = row.querySelector('[data-bind]');
                const contenido = elementWithDataBind ? elementWithDataBind.getAttribute('data-bind') : '';
                return `${cantidad} ${contenido} DE ${producto}`;
            });

        let resumen = '';
        if (productosMarcados.length > 0) {
            resumen += `Pedido - Nueva Río D'or\n`;
            resumen += `${proveedorSeleccionado}\n`;
            resumen += `Fecha: ${fechaActual}\n\n`;
            resumen += `${productosMarcados.join('\n')}\n`;
        }

        this.resumenPedidoTextarea.value = resumen;
        this.ajustarAlturaTextarea();
    }


    ajustarAlturaTextarea() {
        this.resumenPedidoTextarea.style.height = 'auto';
        this.resumenPedidoTextarea.style.height = (this.resumenPedidoTextarea.scrollHeight + 2) + 'px';
    }

}