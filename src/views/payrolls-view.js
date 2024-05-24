import BaseView from './base-view.js';

class PayrollsView extends BaseView {
    static instance = null;
    static getInstance(controller) {
        if (!PayrollsView.instance) {
            PayrollsView.instance = new PayrollsView(controller);
        }
        return PayrollsView.instance;
    }
    constructor(controller) {
        super();
        this.controller = controller;
        PayrollsView.instance = this;
    }

}


const PayrollsView =  PayrollsView.getInstance();
export default PayrollsView;