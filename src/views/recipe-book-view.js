import BaseView from './base-view.js';

export default class RecipeBookView extends BaseView {

    constructor() {
        super();
    }

    async renderView() {
        await this.getPartials('recipe-book.html', 'Recetario');
        this.initEventView();
    }

    initEventView() {

    }
}