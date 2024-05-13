import BaseView from './base-view.js';

export default class HomeView extends BaseView {

    constructor(controller) {
        super();
        this.controller = controller;
    }

    async renderView() {
        await this.fetchAndSetHTML(this.PATH_FRAGMENTS + "home.html", "app");
        this.setPageTitleAndHeader("Inicio");
        this.initEventView();
    }

    initEventView() {

    }


}