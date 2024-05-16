import BaseView from './base-view.js';

export default class Error404View extends BaseView {
    constructor(controller) {
        super();
        this.controller = controller;
    }

    renderView() {
        this.initEventsView();
    }

    initEventsView() {
       
    }
}