import BaseView from './base-view.js';

class ProceduresView extends BaseView {
    static instance = null;
    static getInstance(controller) {
        if (!ProceduresView.instance) {
            ProceduresView.instance = new ProceduresView(controller);
        }
        return ProceduresView.instance;
    }
    constructor(controller) {
        super();
        this.controller = controller;
        ProceduresView.instance = this;
    }
}

const ProceduresView = ProceduresView.getInstance();
export default ProceduresView;