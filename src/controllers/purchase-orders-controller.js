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
        this.view.listPurchaseOrdersRenderPartialView();
    }

    //route: #new-purchase-order
    async newPurchaseOrder(){
        this.view.newPurchaseOrderRenderPartialView();
    }

    //route: #view-purchase-order
    async viewPurchaseOrder(idOrder){
        this.view.viewPurchaseOrderRenderPartialView();
    }

    //route: #edit-purchase-order
    async editPurchaseOrder(idOrder){
        this.view.editPurchaseOrderRenderPartialView();
    }

    async deletePurchaseOrderAction(idOrder){
        
    }

}


