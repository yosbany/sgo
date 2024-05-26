import BaseController from './base-controller.js';
import HomeView from '../views/home-view.js';
import DataPersistenceServiceInstance from '../services/data-persistence-service.js';


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
        this.view = new HomeView(this);
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

    //route: #list-backup
    async listBackup(){
        const listBackup = await DataPersistenceServiceInstance.getListBackup();
        this.view.listBackupRenderPartialView(listBackup);
    }

    async restoredBackup(backup){
        DataPersistenceServiceInstance.restoredBackup(backup);
    }

    async loadDataAction(){
       
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