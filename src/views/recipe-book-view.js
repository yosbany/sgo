import RecipeBookControllerInstance from '../controllers/recipe-book-controller.js';
import BaseView from './base-view.js';

class RecipeBookView extends BaseView {
    static instance = null;
    static getInstance() {
        if (!RecipeBookView.instance) {
            RecipeBookView.instance = new RecipeBookView();
        }
        return RecipeBookView.instance;
    }
    constructor() {
        super();
        this.controller = RecipeBookControllerInstance;
        RecipeBookView.instance = this;
    }

    async renderView() {
        await this.getPartials('recipe-book.html', 'Recetario');
        this.initEventView();
    }

    initEventView() {

    }
}

const RecipeBookViewInstance = RecipeBookView.getInstance();
export default RecipeBookViewInstance;