import BaseController from './base-controller.js';
import PurchaseOrdersView from '../views/purchase-orders-view.js';
import DataPersistenceServiceInstance from '../services/data-persistence-service.js';





export default class PurchaseOrdersController extends BaseController {
    
    constructor() {
        super();
        this.view = new PurchaseOrdersView(this);
    }

    //route: #list-purchase-orders
    async listPurchaseOrders(){
        const ordenes = await DataPersistenceServiceInstance.getOrdenes();
        this.view.listPurchaseOrdersRenderPartialView(ordenes);
    }

    //route: #new-purchase-order
    async newPurchaseOrder(){
        const proveedores = await DataPersistenceServiceInstance.getProveedores();
        this.view.newPurchaseOrderRenderPartialView(proveedores);
    }

    //route: #view-purchase-order
    async viewPurchaseOrder(params){
        const idOrden = params ? params.idOrden : null;
        const orden = await DataPersistenceServiceInstance.getOrden(idOrden);
        console.log("orden: ",orden)
        const proveedores = await DataPersistenceServiceInstance.getProveedores();
        this.view.viewPurchaseOrderRenderPartialView(proveedores, orden);
    }

    //route: #edit-purchase-order
    async editPurchaseOrder(params){
        const idOrden = params ? params.idOrden : null;
        const orden = await DataPersistenceServiceInstance.getOrden(idOrden);
        const proveedores = await DataPersistenceServiceInstance.getProveedores();
        this.view.editPurchaseOrderRenderPartialView(proveedores, orden);
    }

    async deletePurchaseOrderAction(idOrder){
       const ordenes = await DataPersistenceServiceInstance.deleteOrden(idOrder);
       return ordenes;
    }

    async getArticulosXProveedorAction(proveedor){
       return await DataPersistenceServiceInstance.getArticulosXProveedor(proveedor);
    }

    async guardarOrdenDeCompraAction(orden){
        DataPersistenceServiceInstance.saveOrden(orden);
    }

}


