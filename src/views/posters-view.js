import BaseView from './base-view.js';

export default class PostersView extends BaseView {

    constructor() {
        super();
    }

    async renderView() {
        await this.fetchAndSetHTML(this.PATH_FRAGMENTS + "posters.html", "app");
        this.setPageTitleAndHeader("Carteles");
        this.initEventView();
    }

    initEventView() {

    }


}