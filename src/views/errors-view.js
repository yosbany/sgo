import BaseView from './base-view.js';

export default class ErrorsView extends BaseView {
    
    constructor(controller) {
        super();
        this.controller = controller;
    }

    async error404(){
        this.hideSnipper();
    }

    async error500(){
        this.hideSnipper();
    }
}
