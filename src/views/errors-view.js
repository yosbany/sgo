import BaseView from './base-view.js';

export default class ErrorsView extends BaseView {
    
    constructor(controller) {
        super();
        this.controller = controller;
    }

    async error404(){
        this.hideWait();
    }

    async error500(){
        this.hideWait();
    }
}
