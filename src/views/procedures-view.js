import ProceduresControllerInstance from '../controllers/procedures-controller.js';
import BaseView from './base-view.js';

class ProceduresView extends BaseView {
    static instance = null;
    static getInstance() {
        if (!ProceduresView.instance) {
            ProceduresView.instance = new ProceduresView();
        }
        return ProceduresView.instance;
    }
    constructor() {
        super();
        this.contoller = ProceduresControllerInstance
        ProceduresView.instance = this;
    }
}

const ProceduresViewInstance = ProceduresView.getInstance();
export default ProceduresViewInstance;