import BaseController from './base-controller.js';
import ProductionCatalogView from '../views/production-catalog-view.js';

export default class ProductionCatalogController extends BaseController {
    constructor() {
        super();
        this.view = new ProductionCatalogView();
    }

    async listProductionCatalog(){
        console.log("ProductionCatalogController listProductionCatalog");
        this.view.listProductionCatalogRenderPartialView();
    }

    
}
