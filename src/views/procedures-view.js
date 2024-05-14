import BaseView from './base-view.js';

export default class ProceduresView extends BaseView {

    constructor() {
        super();
    }

    async renderView() {
        await this.fetchAndSetHTML(this.PATH_FRAGMENTS + "procedures.html", "app", "Procedimientos");
        this.initEventView();
    }

    initEventView() {

    }
}