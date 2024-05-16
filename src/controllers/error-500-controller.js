import BaseController from './base-controller.js';
import Error500View from '../views/error-500-view.js'

export default class Error500Controller extends BaseController {

    constructor() {
        super();
        this.view = new Error500View(this);
    }

    async init() {
        console.log("Error500Controller init");
        this.view.renderView();
    }
}
