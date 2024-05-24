import ToolsViewInstance from '../views/tools-view.js';
import BaseController from './base-controller.js';


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
        this.view = ToolsViewInstance;
        ToolsController.instance = this;
    }

}

const ToolsControllerInstance = ToolsController.getInstance();
export default ToolsControllerInstance;