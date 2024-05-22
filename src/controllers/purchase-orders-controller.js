import BaseController from './base-controller.js';
import PurchaseOrdersView from '../views/purchase-orders-view.js';
import DataPersistenceModel from '../models/data-persistence-model.js';




export default class PurchaseOrdersController extends BaseController {
    
    constructor() {
        super();
        this.view = new PurchaseOrdersView(this); 
        this.dataPersistenceModel = new DataPersistenceModel();
    }

    //route: #list-purchase-orders
    async listPurchaseOrders(){
        const ordenes = await this.dataPersistenceModel.getOrdenesCompra();
        this.view.listPurchaseOrdersRenderPartialView(ordenes);
    }

    //route: #new-purchase-order
    async newPurchaseOrder(){
        const proveedores = await this.dataPersistenceModel.getProveedores();
        this.view.newPurchaseOrderRenderPartialView(proveedores);
    }

    //route: #view-purchase-order
    async viewPurchaseOrder(params){
        const idOrden = params ? params.idOrden : null;
        const orden = await this.dataPersistenceModel.getOrden(idOrden);
        this.view.viewPurchaseOrderRenderPartialView(orden);
    }

    //route: #edit-purchase-order
    async editPurchaseOrder(params){
        const idOrden = params ? params.idOrden : null;
        const orden = await this.dataPersistenceModel.getOrden(idOrden);
        this.view.editPurchaseOrderRenderPartialView(orden);
    }

    async deletePurchaseOrderAction(idOrder){
       
    }

    async getArticulosXProveedorAction(proveedor){
       return await this.dataPersistenceModel.getArticulosXProveedor(proveedor);
    }

    async guardarOrdenDeCompraAction(orden){
        this.dataPersistenceModel.saveOrden(orden);
    }

}


