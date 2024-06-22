import BaseView from './base-view.js';


export default class SecurityView extends BaseView {
    
    constructor(controller) {
        super();
        this.controller = controller;
    }

    async loginRenderView(){
        document.getElementById('btn-submit').addEventListener('click', async (event) => {
            event.preventDefault();
            this.showWait();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            try {
                await this.controller.loginAction(email, password);
            } catch (error) {
                toastr.error(error.message);
            }
            finally{
                this.hideWait();
            }
        });
        this.hideWait();
    }

}