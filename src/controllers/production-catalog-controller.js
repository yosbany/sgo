import BaseController from './base-controller.js';
import ProductionCatalogViewInstance from '../views/production-catalog-view.js';
import ProductionCatalogView from '../views/production-catalog-view.js';

class ProductionCatalogController extends BaseController {
    static instance = null;
    static getInstance() {
        if (!ProductionCatalogController.instance) {
            ProductionCatalogController.instance = new ProductionCatalogController();
        }
        return ProductionCatalogController.instance;
    }
    constructor() {
        super();
        this.view = new ProductionCatalogView(this);
        ProductionCatalogController.instance = this;
    }

    //route: #list-production-catalog
    async listProductionCatalog(){
        this.view.listProductionCatalogRenderPartialView();
    }

    
}

const ProductionCatalogControllerInstance = ProductionCatalogController.getInstance();
export default ProductionCatalogControllerInstance;
