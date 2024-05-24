import ProductionCatalogControllerInstance from '../controllers/production-catalog-controller.js';
import BaseView from './base-view.js';

class ProductionCatalogView extends BaseView {
    static instance = null;
    static getInstance() {
        if (!ProductionCatalogView.instance) {
            ProductionCatalogView.instance = new ProductionCatalogView();
        }
        return ProductionCatalogView.instance;
    }
    constructor() {
        super();
        this.contoller = ProductionCatalogControllerInstance
        ProductionCatalogView.instance = this;
    }

    async listProductionCatalogRenderPartialView() {
        await this.getPartials('list-production-catalog.html', 'Catálogo de Producción');
        this.initEventView();
    }
}

const ProductionCatalogViewInstance = ProductionCatalogView.getInstance();
export default ProductionCatalogViewInstance;