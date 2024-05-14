import BaseController from './base-controller.js';
import ProceduresView from '../views/procedures-view.js';

export default class ProceduresController extends BaseController {
    constructor() {
        super();
        this.view = new ProceduresView();
        
    }

    

    async procedures() {
        console.log("ProceduresController procedures");
        this.view.renderView();
    }
}
