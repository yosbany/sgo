import BaseView from './base-view.js';

export default class LoginView extends BaseView {
    constructor(controller) {
        super();
        this.controller = controller;
    }

    renderView() {
        this.initEventsView();
    }

    initEventsView() {
        document.getElementById('btn-submit').addEventListener('click', async (event) => {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            this.controller.loginAction(email, password);
        });
    }
}