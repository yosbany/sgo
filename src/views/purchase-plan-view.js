import BaseView from './base-view.js';

export default class PurchasePlanView extends BaseView {

    constructor() {
        super();
    }

    async renderView() {
        await this.getPartials('purchase-plan.html', 'Plan Compras');
        this.initEventView();
    }

    initEventView() {

    }

    
}