import BaseView from './base-view.js';

export default class ProductionCatalogView extends BaseView {

    constructor() {
        super();
    }

    async listProductionCatalogRenderPartialView() {
        await this.getPartials('list-production-catalog.html', 'Catálogo de Producción');
        this.initEventView();
    }

    

    initEventView() {

    }


}