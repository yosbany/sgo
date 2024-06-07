
import ArticlesView from '../views/articles-view.js'
import BaseController from './base-controller.js';

class ArticlesController extends BaseController {
    static instance = null;
    static getInstance() {
        if (!ArticlesController.instance) {
            ArticlesController.instance = new ArticlesController();
        }
        return ArticlesController.instance;
    }
    constructor() {
        super();
        this.view = new ArticlesView();
        ArticlesController.instance = this;
    }

    //route: #list-articules
    async listArticles(){
        const articules = await DataPersistenceServiceInstance.getArticles();
        this.view.listArticlesRenderPartialView(articules);
    }
}


const ArticlesControllerInstance = ArticlesController.getInstance();
export default ArticlesControllerInstance;
