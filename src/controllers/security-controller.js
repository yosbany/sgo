import BaseController from './base-controller.js';
import SecurityServiceInstance from '../services/security-service.js';
import SecurityView from '../views/security-view.js';


class SecurityController extends BaseController {
    static instance = null;
    static getInstance() {
        if (!SecurityController.instance) {
            SecurityController.instance = new SecurityController();
        }
        return SecurityController.instance;
    }
    constructor() {
        super();
        this.view = new SecurityView(this);
        SecurityController.instance = this;
    }
    
    
    //route: #login
    async login() {
        this.view.loginRenderView();
    }

    async loginAction(email, password){
        try{
            const user = await SecurityServiceInstance.login(email, password);
            if(user){
                this.redirectToPage("index.html");
            }
        }
        catch(error){
            throw new Error('No se pudo autenticar: ' + error.message);
        }
        
        
    }
}

const SecurityControllerInstance = SecurityController.getInstance();
export default SecurityControllerInstance;
