import BaseController from './base-controller.js';
import DataPersistenceServiceInstance from '../services/data-persistence-service.js';
import PurchaseOrdersView from '../views/purchase-orders-view.js'


class PurchaseOrdersController extends BaseController {
    static instance = null;
    static getInstance() {
        if (!PurchaseOrdersController.instance) {
            PurchaseOrdersController.instance = new PurchaseOrdersController();
        }
        return PurchaseOrdersController.instance;
    }
    constructor() {
        super();
        this.view = new PurchaseOrdersView(this)
        PurchaseOrdersController.instance = this;
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
        const proveedores = await DataPersistenceServiceInstance.getProveedores();
        console.log(orden);
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
       await DataPersistenceServiceInstance.saveOrden(orden);
    }

}

const PurchaseOrdersControllerInstance = PurchaseOrdersController.getInstance();
export default PurchaseOrdersControllerInstance;
