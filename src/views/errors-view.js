import BaseView from './base-view.js';

class ErrorsView extends BaseView {
    static instance = null;
    static getInstance(controller) {
        if (!ErrorsView.instance) {
            ErrorsView.instance = new ErrorsView(controller);
        }
        return ErrorsView.instance;
    }
    constructor(controller) {
        super();
        this.controller = controller;
        ErrorsView.instance = this;
    }

    async error404(){

    }

    async error500(){
        
    }
}

const ErrorsView =  ErrorsView.getInstance();
export default ErrorsView;