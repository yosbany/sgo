import BaseController from './base-controller.js';
import MakeOrderView from '../views/make-order-view.js';
import DataPersistenceModel from '../models/data-persistence-model.js';




export default class MakeOrderController extends BaseController {
    constructor() {
        super();
        this.view = new MakeOrderView(this); 
        this.dataPersistenceModel = new DataPersistenceModel();
        
    }

    async makeOrder() {
        console.log("MakeOrderController makeOrder");
        const proveedores = this.dataPersistenceModel.getProveedores();
        this.view.renderView();
        
    }

    async getProveedores(){
        return await this.dataPersistenceModel.getProveedores();
    }

    async getArticulosXProveedor(proveedor){
        return await this.dataPersistenceModel.getArticulosXProveedor(proveedor);
    }


}


