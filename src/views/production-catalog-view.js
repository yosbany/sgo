import BaseView from './base-view.js';

class ProductionCatalogView extends BaseView {
    static instance = null;
    static getInstance(controller) {
        if (!ProductionCatalogView.instance) {
            ProductionCatalogView.instance = new ProductionCatalogView(controller);
        }
        return ProductionCatalogView.instance;
    }
    constructor(controller) {
        super();
        this.controller = controller;
        ProductionCatalogView.instance = this;
    }

    async listProductionCatalogRenderPartialView() {
        await this.getPartials('list-production-catalog.html', 'Catálogo de Producción');
        this.initEventView();
    }
}

const ProductionCatalogView = ProductionCatalogView.getInstance();
export default ProductionCatalogView;