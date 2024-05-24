import BaseController from './base-controller.js';
import DataPersistenceServiceInstance from '../services/data-persistence-service.js';
import HomeViewInstance from '../views/home-view.js';

class HomeController extends BaseController {
    static instance = null;
    static getInstance() {
        if (!HomeController.instance) {
            HomeController.instance = new HomeController();
        }
        return HomeController.instance;
    }
    constructor() {
        super();
        this.view = HomeViewInstance;
        HomeController.instance = this;
    }
    
    //route: #index
    async index() {
        this.view.homeRenderPartialView();
    }

    //route: #load-data
    async loadData(){
        console.log("HomeController loadData");
        this.loadDataAction();
    }

    async loadDataAction(){
       DataPersistenceServiceInstance.loadData();
    }
    
    //route: #home
    async home() {
        console.log("HomeController home");
        this.view.homeRenderPartialView();
    }

    //route: #exit
    exit() {
        console.log("HomeController exit");
        
    }

}

const HomeControllerInstance = HomeController.getInstance();
export default HomeControllerInstance;