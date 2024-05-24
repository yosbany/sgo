import ProceduresViewInstance from '../views/procedures-view.js';
import BaseController from './base-controller.js';

class ProceduresController extends BaseController {
    static instance = null;
    static getInstance() {
        if (!ProceduresController.instance) {
            ProceduresController.instance = new ProceduresController();
        }
        return ProceduresController.instance;
    }
    constructor() {
        super();
        this.view = ProceduresViewInstance;
        ProceduresController.instance = this;
    }

    //route: #list-procedures
    async listProcedures(){
        
    }
}


const ProceduresControllerInstance = ProceduresController.getInstance();
export default ProceduresControllerInstance;
