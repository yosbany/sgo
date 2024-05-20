import BaseView from './base-view.js';

export default class CalculatePriceView extends BaseView {

    constructor() {
        super();
    }

    async renderView() {
        await this.getPartials('calculate-price.html', 'Calcular Precio');
        this.initEventView();
    }

    initEventView() {

    }


}