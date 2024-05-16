import BaseView from './base-view.js';

export default class CalculatePriceView extends BaseView {

    constructor() {
        super();
    }

    async renderView() {
        await this.fetchAndSetHTML(this.PATH_FRAGMENTS + "calculate-price.html", "app", "Calcular Precio");
        this.initEventView();
    }

    initEventView() {

    }


}