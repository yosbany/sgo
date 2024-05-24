import BaseView from './base-view.js';


class AccountingMovementsView extends BaseView {
    static instance = null;
    static getInstance() {
        if (!AccountingMovementsView.instance) {
            AccountingMovementsView.instance = new AccountingMovementsView();
        }
        return AccountingMovementsView.instance;
    }
    constructor() {
        super();
        AccountingMovementsView.instance = this;
    }

}

const AccountingMovementsViewInstance = AccountingMovementsView.getInstance();
export default AccountingMovementsViewInstance;