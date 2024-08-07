
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
        this.view = new ArticlesView(this);
        ArticlesController.instance = this;
    }

    //route: #list-articles
    async listArticles(){
        this.view.listArticlesRenderPartialView();
    }

    async getArticuloAction(id){
        return await DataPersistenceServiceInstance.getArticulo(id);
    }

    async getArticulosAction(){
        return await DataPersistenceServiceInstance.getArticulos();
    }

    async getProveedoresAction(){
        return await DataPersistenceServiceInstance.getProveedores();
    }

    async guardarArticuloAction(articulo){
        await DataPersistenceServiceInstance.saveArticulo(articulo);
    }

    async eliminarArticuloAction(idArticulo){
        return await DataPersistenceServiceInstance.deleteArticulo(idArticulo);;
     }
    
}


const ArticlesControllerInstance = ArticlesController.getInstance();
export default ArticlesControllerInstance;
