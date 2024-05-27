import BaseController from './base-controller.js';
import ToolsView from '../views/tools-view.js';


class ToolsController extends BaseController {
    static instance = null;
    static getInstance() {
        if (!ToolsController.instance) {
            ToolsController.instance = new ToolsController();
        }
        return ToolsController.instance;
    }
    constructor() {
        super();
        this.view = new ToolsView(this);
        ToolsController.instance = this;
    }

    //route: #calculate-price
    async calculatePrice(){
        await this.view.calculatePriceRenderPartialView();
    }

}

const ToolsControllerInstance = ToolsController.getInstance();
export default ToolsControllerInstance;