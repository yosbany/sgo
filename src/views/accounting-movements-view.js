import BaseView from './base-view.js';


class AccountingMovementsViewAccountingMovementsView extends BaseView {
    static instance = null;
    static getInstance(controller) {
        if (!AccountingMovementsView.instance) {
            AccountingMovementsView.instance = new AccountingMovementsView(controller);
        }
        return AccountingMovementsView.instance;
    }
    constructor(controller) {
        super();
        this.controller = controller;
        AccountingMovementsView.instance = this;
    }

    

}
const AccountingMovementsView = AccountingMovementsView.getInstance();
export default AccountingMovementsView;