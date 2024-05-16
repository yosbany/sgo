import BaseController from './base-controller.js';
import Error404View from '../views/error-404-view.js'

export default class Error404Controller extends BaseController {

    constructor() {
        super();
        this.view = new Error404View(this);
    }

    async init() {
        console.log("Error404Controller init");
        this.view.renderView();
    }
}
