import BaseView from './base-view.js';


class SecurityView extends BaseView {
    static instance = null;
    static getInstance(controller) {
        if (!SecurityView.instance) {
            SecurityView.instance = new SecurityView(controller);
        }
        return SecurityView.instance;
    }
    constructor(controller) {
        super();
        this.controller = controller;
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

const SecurityView = SecurityView.getInstance();
export default SecurityView;