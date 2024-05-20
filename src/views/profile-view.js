import BaseView from './base-view.js';

export default class ProfileView extends BaseView {

    constructor() {
        super();
    }

    async renderView() {
        await this.getPartials('profile.html', 'Perfil');
        this.initEventView();
    }

    initEventView() {

    }
}