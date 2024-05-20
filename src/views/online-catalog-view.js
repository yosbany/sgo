import BaseView from './base-view.js';

export default class OnlineCatalogView extends BaseView {

    constructor() {
        super();
    }

    async renderView() {
        await this.getPartials('online-catalog.html', 'Catálogo en Línea');
        this.initEventView();
    }

    initEventView() {

    }


}