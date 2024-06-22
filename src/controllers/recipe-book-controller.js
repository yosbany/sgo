import BaseController from './base-controller.js';
import RecipeBookView from '../views/recipe-book-view.js'



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
        this.view = new RecipeBookView(this);
        RecipeBookController.instance = this;
    }

    //route: #list-recipe-book
    async listRecipeBook(){
        
    }
}

const RecipeBookControllerInstance = RecipeBookController.getInstance();
export default RecipeBookControllerInstance;

