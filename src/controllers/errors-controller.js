import ErrorsViewInstance from '../views/errors-view.js';
import BaseController from './base-controller.js';


class ErrorController extends BaseController {
    static instance = null;
    static getInstance() {
        if (!ErrorController.instance) {
            ErrorController.instance = new ErrorController();
        }
        return ErrorController.instance;
    }
    constructor() {
        super();
        this.view = ErrorsViewInstance;
        ErrorController.instance = this;
    }

    //route: #error-404
    async error404(){
        
    }

    //route: #error-500
    async error500(){
        
    }
}

const ErrorControllerInstance = ErrorController.getInstance();
export default ErrorControllerInstance;
