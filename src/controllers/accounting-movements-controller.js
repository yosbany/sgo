import BaseController from './base-controller.js';
import AccountingMovementsViewInstance from '../views/accounting-movements-view.js';
import DataPersistenceServiceInstance from '../services/data-persistence-service.js';

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
        AccountingMovementsController.instance = this;
    }
    //route: #list-accounting-movements
    async listAccountingMovements(){
        
    }
}

const AccountingMovementsControllerInstance = AccountingMovementsController.getInstance();
export default AccountingMovementsControllerInstance;