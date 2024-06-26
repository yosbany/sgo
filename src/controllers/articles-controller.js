
import ArticlesView from '../views/articles-view.js'
import BaseController from './base-controller.js';
import DataPersistenceServiceInstance from '../services/data-persistence-service.js';

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

    //route: #list-articles
    async listArticles(){
        const articules = await DataPersistenceServiceInstance.getArticles();
        const proveedores = await DataPersistenceServiceInstance.getProveedores();
        this.view.listArticlesRenderPartialView(articules, proveedores);
    }
}


const ArticlesControllerInstance = ArticlesController.getInstance();
export default ArticlesControllerInstance;
