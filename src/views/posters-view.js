import BaseView from './base-view.js';

export default class PostersView extends BaseView {

    constructor() {
        super();
    }

    async renderView() {
        await this.fetchAndSetHTML(this.PATH_FRAGMENTS + "posters.html", "app", "Carteles");
        this.initEventView();
    }

    initEventView() {

    }


}