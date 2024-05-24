import AccountingMovementsView from '../views/accounting-movements-view.js';
import BaseController from './base-controller.js';


class AccountingMovementsController extends BaseController {
    static instance = null;
    static getInstance() {
        if (!AccountingMovementsController.instance) {
            AccountingMovementsController.instance = new AccountingMovementsController();
        }
        return AccountingMovementsController.instance;
    }
    constructor() {
        super();
        this.view = new AccountingMovementsView(this);
        AccountingMovementsController.instance = this;
    }
    
    //route: #list-accounting-movements
    async listAccountingMovements(){
        
    }
}

const AccountingMovementsControllerInstance = AccountingMovementsController.getInstance();
export default AccountingMovementsControllerInstance;