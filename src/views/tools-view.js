import ToolsControllerInstance from '../controllers/tools-controller.js';
import BaseView from './base-view.js';

class ToolsView extends BaseView {
    static instance = null;
    static getInstance() {
        if (!ToolsView.instance) {
            ToolsView.instance = new ToolsView();
        }
        return ToolsView.instance;
    }
    constructor() {
        super();
        this.controller = ToolsControllerInstance;
        ToolsView.instance = this;
    }

}

const ToolsViewInstance = ToolsView.getInstance();
export default ToolsViewInstance;

