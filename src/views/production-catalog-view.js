import BaseView from './base-view.js';


export default  class ProductionCatalogView extends BaseView {
    
    constructor(controller) {
        super();
        this.controller = controller;
    }

    async listProductionCatalogRenderPartialView() {
        await this.getPartials('list-production-catalog.html', 'Catálogo de Producción');
    }
}
