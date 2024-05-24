import BaseController from './base-controller.js';
import PayrollsViewInstance from '../views/payrolls-view.js';

class PayrollsController extends BaseController {
    static instance = null;
    static getInstance() {
        if (!PayrollsController.instance) {
            PayrollsController.instance = new PayrollsController();
        }
        return PayrollsController.instance;
    }
    constructor() {
        super();
        this.view = PayrollsViewInstance;
        PayrollsController.instance = this;
    }

    //route: #list-payrolls
    async listPayrolls(){
        
    }

}

const PayrollsControllerInstance = PayrollsController.getInstance();
export default PayrollsControllerInstance;
