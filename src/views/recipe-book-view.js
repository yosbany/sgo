import BaseView from './base-view.js';

class RecipeBookView extends BaseView {
    static instance = null;
    static getInstance(controller) {
        if (!RecipeBookView.instance) {
            RecipeBookView.instance = new RecipeBookView(controller);
        }
        return RecipeBookView.instance;
    }
    constructor(controller) {
        super();
        this.controller = controller;
        RecipeBookView.instance = this;
    }

}
const RecipeBookView = RecipeBookView.getInstance();
export default RecipeBookView;