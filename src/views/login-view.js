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
        document.getElementById('submitBtn').addEventListener('click', async (event) => {
            event.preventDefault();
            const email = document.getElementById('text-field-hero-input-email').value;
            const password = document.getElementById('text-field-hero-input-password').value;
            this.controller.loginAction(email, password);
        });
    }
}