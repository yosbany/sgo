import PurchaseOrdersControllerInstance from '../controllers/purchase-orders-controller.js';
import BaseView from './base-view.js';

class PurchaseOrdersView extends BaseView {
    static instance = null;
    static getInstance() {
        if (!PurchaseOrdersView.instance) {
            PurchaseOrdersView.instance = new PurchaseOrdersView();
        }
        return PurchaseOrdersView.instance;
    }
    constructor() {
        super();
        this.controller = PurchaseOrdersControllerInstance;
        PurchaseOrdersView.instance = this;
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
                // Formatear la fecha
                let fechaFormateada = new Date(row.fecha).toLocaleString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                });
    
                let tr = document.createElement('tr');
                tr.innerHTML = `
                <th scope="col" style="vertical-align: middle;">${fechaFormateada}</th>
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

                tr.querySelector('.view').addEventListener('click', (event) => {
                    this.redirectToPage('#view-purchase-order', 'idOrden', row.id);
                });
                tr.querySelector('.edit').addEventListener('click', (event) => {
                        this.redirectToPage('#edit-purchase-order', 'idOrden', row.id);
                });
                tr.querySelector('.delete').addEventListener('click', (event) => {
                    const confirmDeleteModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
                    confirmDeleteModal.show();
                });
                document.getElementById('btn-confirm-delete').addEventListener('click', async (event) => {
                    const ordenes = await this.controller.deletePurchaseOrderAction(row.id);
                    this.cargarTablaOrdenes(ordenes)
                    const confirmDeleteModal = bootstrap.Modal.getInstance(document.getElementById('confirmDeleteModal'));
                    confirmDeleteModal.hide();
                    toastr.success("Orden eliminada correctamente.");
                });
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

    async cargarTablaArticulosXProveedor(articulos, articulosSeleccionados, soloLectura = false) {
        let tbody = document.getElementById("body-tabla-articulos-proveedor");
        const divordenpie = document.getElementById("orden-pie");
        tbody.innerHTML = '';

        if (articulos.length === 0) {
            divordenpie.style.display = 'none'
            let tr = document.createElement('tr');
            tr.innerHTML = `
                <th colspan="4" style="text-align: center;"><b>No hay registros<b></th>
            `;
            tbody.appendChild(tr);
        } else {
            divordenpie.style.display = 'block'
            articulos.forEach(articulo => {
                let tr = document.createElement('tr');
                tr.innerHTML = `
                    <td style="vertical-align: middle;">
                        <input class="form-check-input checkbox-row" type="checkbox" style="scale: 1.6;" ${soloLectura ? 'disabled' : ''}>
                    </td>
                    <td style="vertical-align: middle;">
                        <h5 data-bs-toggle="tooltip" title="COMPRAS X ${articulo.pack_compra}" style="margin-bottom: 0px !important;cursor: pointer;" data-bind="${articulo.pack_compra}">${articulo.nombre}</h5>
                    </td>
                    <td style="vertical-align: middle;">
                        <span class="badge bg-secondary precio-row">$ ${articulo.precio_compra}</span>
                    </td>
                    <td style="text-align: right;">
                        <input type="number" class="form-control stock-deseado-row" style="width: 80px;float: right;text-align: right;" disabled value=${articulo.stock_deseado}>
                    </td>
                `;
                tbody.appendChild(tr);

                const checkbox = tr.querySelector('.checkbox-row');
                const stock_deseado = tr.querySelector('.stock-deseado-row');
                const nombre = tr.cells[1];

                if (articulosSeleccionados && articulosSeleccionados.some(a => a.nombre === articulo.nombre)) {
                    checkbox.checked = true;
                    tr.classList.add('table-success');
                    stock_deseado.disabled = soloLectura ? true : false;
                    stock_deseado.readOnly = soloLectura ? true : false;
                }

                if (!soloLectura) {
                    checkbox.addEventListener('change', () => {
                        stock_deseado.disabled = !checkbox.checked;
                        stock_deseado.readOnly = !checkbox.checked;
                        if (checkbox.checked) {
                            tr.classList.add('table-success');
                        } else {
                            tr.classList.remove('table-success');
                        }
                        this.actualizarResumen();
                    });
                    stock_deseado.addEventListener('input', () => {
                        this.actualizarResumen();
                    });
                    stock_deseado.addEventListener('focus', () => {
                        stock_deseado.value = '';
                    });
                    stock_deseado.addEventListener('blur', () => {
                        if (stock_deseado.value === '') {
                            stock_deseado.value = articulo.stock_deseado;
                        }
                        this.actualizarResumen();
                    });
                    nombre.addEventListener('click', () => {
                        if (checkbox.checked) {
                            tr.classList.add('table-success');
                        } else {
                            tr.classList.toggle('table-success');
                        }
                    });
                }
            });
            this.actualizarResumen();
        }
    }

    async actualizarResumen() {
        const proveedorSeleccionado = document.getElementById("select-proveedores").value;
        const fechaActual = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
        let tbody = document.getElementById("body-tabla-articulos-proveedor");
        const resumenPedido = document.getElementById("resumen-pedido");

        const articulosMarcados = Array.from(tbody.querySelectorAll('.checkbox-row:checked'))
            .map(checkbox => {
                const row = checkbox.closest('tr');
                const nombre = row.querySelector('td:nth-child(2)').textContent.trim();
                const stock_deseado = row.querySelector('input[type="number"]').value || 0;
                const elementWithDataBind = row.querySelector('[data-bind]');
                const contenido = elementWithDataBind ? elementWithDataBind.getAttribute('data-bind') : '';
                return `${stock_deseado} ${contenido} DE ${nombre}`;
            });

        let resumenPedidoTexto = '';
        if (articulosMarcados.length > 0) {
            resumenPedidoTexto += `Pedido - Nueva Río D'or\n`;
            resumenPedidoTexto += `${proveedorSeleccionado}\n`;
            resumenPedidoTexto += `Fecha: ${fechaActual}\n\n`;
            resumenPedidoTexto += `${articulosMarcados.join('\n')}\n`;
        }

        resumenPedido.value = resumenPedidoTexto;
        resumenPedido.style.height = 'auto';
        resumenPedido.style.height = (resumenPedido.scrollHeight + 2) + 'px';
    }

    async listPurchaseOrdersRenderPartialView(ordenes) {
        await this.getPartials('list-purchase-orders.html', 'Lista - Ordenes de Compra');

        this.cargarTablaOrdenes(ordenes);

        document.getElementById('btn-nueva-orden').addEventListener('click', (event) => {
            this.redirectToPage('#new-purchase-order');
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
        document.getElementById('btn-copiar').addEventListener('click', () => {
            document.getElementById("resumen-pedido").select();
            document.execCommand('copy');
            toastr.success("Resumen copiado correctamente.");
            document.getElementById("btn-copiar").textContent = 'Resumen Copiado';
            setTimeout(function () {
                document.getElementById("btn-copiar").textContent = 'Copiar';
            }, 5000);
        });
        document.getElementById('btn-imprimir').addEventListener('click', () => {
            const contenido = document.getElementById("resumen-pedido").value;
            if (contenido.trim() !== '') {
                //this.imprimirContenido(contenido);

            } else {
                console.log('No hay contenido para imprimir.');
            }
        });
        document.getElementById('btn-guardar').addEventListener('click', async () => {
            const proveedorSeleccionado = document.getElementById('select-proveedores').value;
            let tbody = document.getElementById('body-tabla-articulos-proveedor');
            const articulosMarcados = Array.from(tbody.querySelectorAll('.checkbox-row:checked')).map(checkbox => {
                const row = checkbox.closest('tr');
                const nombre = row.querySelector('td:nth-child(2)').textContent.trim();
                const stockDeseado = row.querySelector('input[type="number"]').value || 0;
                const precioCompra = row.querySelector(".precio-row").textConten;
                return {
                    nombre: nombre,
                    precio_compra: precioCompra,
                    stock_deseado: stockDeseado
                };
            });
            const resumenPedido = document.getElementById('resumen-pedido').value;

            if (!proveedorSeleccionado) {
                toastr.error("Por favor, seleccione un proveedor.");
                return;
            }
            if (articulosMarcados.length === 0) {
                toastr.error("Por favor, marque al menos un artículo.");
                return;
            }

            const datosAGuardar = {
                id: String((new Date()).getTime()),
                fecha: new Date(),
                proveedor: proveedorSeleccionado,
                articulos: articulosMarcados,
                resumen: resumenPedido,
                importe: 0
            };

            try {
                await this.controller.guardarOrdenDeCompraAction(datosAGuardar);
                toastr.success("Orden de compra guardada correctamente.");
                this.redirectToPage('#list-purchase-orders');
            } catch (error) {
                console.error('Error guardando la orden de compra:', error);
                toastr.error("Hubo un error al guardar la orden de compra. Por favor, intente nuevamente.");
            }
        });

    }

    async viewPurchaseOrderRenderPartialView(proveedores, order) {
        await this.getPartials('view-purchase-order.html', 'Ver - Orden de Compra');

        this.cargarSelectProveedores(proveedores, order.proveedor);
        const articulos = await this.controller.getArticulosXProveedorAction(order.proveedor);
        this.cargarTablaArticulosXProveedor(articulos, order.articulos, true);

        document.getElementById('link-regresar').addEventListener('click', (event) => {
            this.redirectToPage('#list-purchase-orders');
        });
        document.getElementById('btn-copiar').addEventListener('click', () => {
            document.getElementById("resumen-pedido").select();
            document.execCommand('copy');
            toastr.success("Resumen copiado correctamente.");
            document.getElementById("btn-copiar").textContent = 'Resumen Copiado';
            setTimeout(function () {
                document.getElementById("btn-copiar").textContent = 'Copiar';
            }, 5000);
        });
        document.getElementById('btn-imprimir').addEventListener('click', () => {
            const contenido = document.getElementById("resumen-pedido").value;
            if (contenido.trim() !== '') {
                //this.imprimirContenido(contenido);

            } else {
                console.log('No hay contenido para imprimir.');
            }
        });
    }

    async editPurchaseOrderRenderPartialView(proveedores, order) {
        await this.getPartials('edit-purchase-order.html', 'Editar - Orden de Compra');
        this.cargarSelectProveedores(proveedores, order.proveedor);
        const articulos = await this.controller.getArticulosXProveedorAction(order.proveedor);
        await this.cargarTablaArticulosXProveedor(articulos, order.articulos);


        document.getElementById('link-regresar').addEventListener('click', (event) => {
            this.redirectToPage('#list-purchase-orders');
        });
        document.getElementById('btn-copiar').addEventListener('click', () => {
            document.getElementById("resumen-pedido").select();
            document.execCommand('copy');
            toastr.success("Resumen copiado correctamente.");
            document.getElementById("btn-copiar").textContent = 'Resumen Copiado';
            setTimeout(function () {
                document.getElementById("btn-copiar").textContent = 'Copiar';
            }, 5000);
        });
        document.getElementById('btn-imprimir').addEventListener('click', () => {
            const contenido = document.getElementById("resumen-pedido").value;
            if (contenido.trim() !== '') {
                //this.imprimirContenido(contenido);

            } else {
                console.log('No hay contenido para imprimir.');
            }
        });
        document.getElementById('btn-guardar').addEventListener('click', async () => {
            const proveedorSeleccionado = document.getElementById('select-proveedores').value;
            let tbody = document.getElementById('body-tabla-articulos-proveedor');
            const articulosMarcados = Array.from(tbody.querySelectorAll('.checkbox-row:checked')).map(checkbox => {
                const row = checkbox.closest('tr');
                const nombre = row.querySelector('td:nth-child(2)').textContent.trim();
                const stockDeseado = row.querySelector('input[type="number"]').value || 0;
                const precioCompra = row.querySelector(".precio-row").textConten;
                return {
                    nombre: nombre,
                    precio_compra: precioCompra,
                    stock_deseado: stockDeseado
                };
            });
            const resumenPedido = document.getElementById('resumen-pedido').value;

            if (!proveedorSeleccionado) {
                toastr.error("Por favor, seleccione un proveedor.");
                return;
            }
            if (articulosMarcados.length === 0) {
                toastr.error("Por favor, marque al menos un artículo.");
                return;
            }

            order.articulos = articulosMarcados;
            order.resumen = resumenPedido;
            order.importe = 0;

            try {
                await this.controller.guardarOrdenDeCompraAction(order);
                toastr.success("Orden de compra guardada correctamente.");
                this.redirectToPage('#list-purchase-orders');
            } catch (error) {
                console.error('Error guardando la orden de compra:', error);
                toastr.error("Hubo un error al guardar la orden de compra. Por favor, intente nuevamente.");
            }
        });
    }
}


const PurchaseOrdersViewInstance = PurchaseOrdersView.getInstance();
export default PurchaseOrdersViewInstance;