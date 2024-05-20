import BaseView from './base-view.js';

export default class PrintPriceView extends BaseView {

    constructor() {
        super();
    }

    async renderView() {
        await this.getPartials('print-price.html', 'Imprimir Precio');
        this.initEventView();
    }

    initEventView() {

    }
}