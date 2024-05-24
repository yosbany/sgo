import BaseController from './base-controller.js';
import LoginView from '../views/login-view.js';
import SecurityServiceInstance from '../services/security-service.js';


export default class LoginController extends BaseController {

    constructor() {
        super();
        this.view = new LoginView(this);
    }

    async init() {
        console.log("LoginController init");
        this.view.renderView();
    }

    async loginAction(email, password){
        try{
            const user = await SecurityServiceInstance.login(email, password);
            if(user){
                this.redirectToPage("index.html");
            }
        }
        catch(error){
            console.log("No se pudo autenticar");
        }
        
        
    }
}
