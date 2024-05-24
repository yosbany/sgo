import BaseView from './base-view.js';

class ToolsView extends BaseView {
    static instance = null;
    static getInstance(controller) {
        if (!ToolsView.instance) {
            ToolsView.instance = new ToolsView(controller);
        }
        return ToolsView.instance;
    }
    constructor(controller) {
        super();
        this.controller = controller;
        ToolsView.instance = this;
    }

}

export default ToolsView.getInstance();

