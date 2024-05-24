import BaseController from './base-controller.js';
import RecipeBookViewInstance from '../views/recipe-book-view.js';

class RecipeBookController extends BaseController {
    static instance = null;
    static getInstance() {
        if (!RecipeBookController.instance) {
            RecipeBookController.instance = new RecipeBookController();
        }
        return RecipeBookController.instance;
    }
    constructor() {
        super();
        this.view = RecipeBookViewInstance;
        RecipeBookController.instance = this;
    }

    //route: #list-recipe-book
    async listRecipeBook(){
        
    }
}

const RecipeBookControllerInstance = RecipeBookController.getInstance();
export default RecipeBookControllerInstance;

