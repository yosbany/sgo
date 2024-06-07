
import ArticlesView from '../views/articles-view.js'
import BaseController from './base-controller.js';

class ArticlesController extends BaseController {
    static instance = null;
    static getInstance() {
        if (!ProceduresController.instance) {
            ProceduresController.instance = new ProceduresController();
        }
        return ProceduresController.instance;
    }
    constructor() {
        super();
        this.view = new ArticlesView();
        ProceduresController.instance = this;
    }

    //route: #list-articules
    async listArticles(){
        const articules = await DataPersistenceServiceInstance.getArticles();
        this.view.listArticlesRenderPartialView(articules);
    }
}


const ArticlesControllerInstance = ArticlesController.getInstance();
export default ArticlesControllerInstance;
