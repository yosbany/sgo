import BaseView from './base-view.js';

export default class RrhhView extends BaseView {

    constructor() {
        super();
    }

    async renderView() {
        await this.getPartials('rrhh.html', 'Nómina');
        this.initEventView();
    }

    initEventView() {

    }
}