import SecurityControllerInstance from '../controllers/security-controller.js';
import BaseView from './base-view.js';


class SecurityView extends BaseView {
    static instance = null;
    static getInstance() {
        if (!SecurityView.instance) {
            SecurityView.instance = new SecurityView();
        }
        return SecurityView.instance;
    }
    constructor() {
        super();
        this.controller = SecurityControllerInstance;
        SecurityView.instance = this;
    }

    async login(){
        document.getElementById('btn-submit').addEventListener('click', async (event) => {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            this.controller.loginAction(email, password);
        });
    }

}

const SecurityViewInstance = SecurityView.getInstance();
export default SecurityViewInstance;