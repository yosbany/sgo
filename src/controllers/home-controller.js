import BaseController from './base-controller.js';
import HomeView from '../views/home-view.js';


export default class HomeController extends BaseController {

    constructor() {
        super();
        this.view = new HomeView(this);
    }

    async init() {
        console.log("HomeController init");
        this.view.homeRenderPartialView();
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