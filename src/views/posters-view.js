import BaseView from './base-view.js';

export default class PostersView extends BaseView {

    constructor() {
        super();
    }

    async renderView() {
        await this.getPartials('posters.html', 'Carteles');
        this.initEventView();
    }

    initEventView() {

    }


}