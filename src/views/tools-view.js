import BaseView from './base-view.js';

export default class ToolsView extends BaseView {
    
    constructor(controller) {
        super();
        this.controller = controller;
    }

    async calculatePriceRenderPartialView(){
        await this.getPartials('calculate-price.html', 'Calculadora de Precios');
        this.hideWait();
    }

}


