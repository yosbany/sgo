import PayrollsControllerInstance from '../controllers/payrolls-controller.js';
import BaseView from './base-view.js';

class PayrollsView extends BaseView {
    static instance = null;
    static getInstance() {
        if (!PayrollsView.instance) {
            PayrollsView.instance = new PayrollsView();
        }
        return PayrollsView.instance;
    }
    constructor() {
        super();
        this.controller = PayrollsControllerInstance;
        PayrollsView.instance = this;
    }

}

const PayrollsViewInstance = PayrollsView.getInstance();
export default PayrollsViewInstance; 