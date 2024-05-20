import BaseView from './base-view.js';

export default class CounterShiftsView extends BaseView {

    constructor() {
        super();
    }

    async renderView() {
        await this.getPartials('counter-shifts.html', 'Turnos Mostrador');
        this.initEventView();
    }

    initEventView() {

    }


}