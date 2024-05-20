import BaseView from './base-view.js';

export default class BudgetLunchView extends BaseView {

    constructor() {
        super();
    }

    async renderView() {
        await this.getPartials('budget-lunch.html', 'Lunch Para Fiestas');
        this.initEventView();
    }

    initEventView() {

    }


}