import ErrorControllerInstance from '../controllers/errors-controller.js';
import BaseView from './base-view.js';

class ErrorsView extends BaseView {
    static instance = null;
    static getInstance() {
        if (!ErrorsView.instance) {
            ErrorsView.instance = new ErrorsView();
        }
        return ErrorsView.instance;
    }
    constructor() {
        super();
        this.controller = ErrorControllerInstance;
        ErrorsView.instance = this;
    }

    async error404(){

    }

    async error500(){
        
    }
}

const ErrorsViewInstance = ErrorsView.getInstance();
export default ErrorsViewInstance;