import { redirectTo } from './util.js';
import DataPersistenceModel from './models/data-persistence-model.js';
import HomeController from './controllers/home-controller.js';
import LoginController from './controllers/login-controller.js';
import AccountingTransactionsController from './controllers/accounting-transactions-controller.js';
import BudgetLunchController from './controllers/budget-lunch-controller.js';
import CalculatePriceController from './controllers/calculate-price-controller.js';
import CounterShiftsController from './controllers/counter-shifts-controller.js';
import PostersController from './controllers/posters-controller.js';
import PrintPriceController from './controllers/print-price-controller.js';
import ProfileController from './controllers/profile-controller.js';
import PurchasePlanController from './controllers/purchase-plan-controller.js';
import PurchasePriceController from './controllers/purchase-price-controller.js';
import ProceduresController from './controllers/procedures-controller.js';
import RecipeBookController from './controllers/recipe-book-controller.js';
import RrhhController from './controllers/rrhh-controller.js';
import Error404Controller from './controllers/error-404-controller.js';
import Error500Controller from './controllers/error-500-controller.js';
import PurchaseOrdersController from './controllers/purchase-orders-controller.js';
import ProductionCatalogController from './controllers/production-catalog-controller.js';

const BASE_PATH = '/nrd/';

const routes = {
    //Public
    'error-404.html': new Error404Controller(),
    'error-500.html': new Error500Controller(),
    'login.html': new LoginController(),
    //Private
    //HomeController
    '': new HomeController(),
    'index.html': new HomeController(),
    'home': new HomeController(),
    'exit': new HomeController(),
    'load-data': new HomeController(),

    'accounting-transactions': new AccountingTransactionsController(),
    'budget-lunch': new BudgetLunchController(),
    'calculate-price': new CalculatePriceController(),
    'counter-shifts': new CounterShiftsController(),
    //PurchaseOrdersController
    'list-purchase-orders': new PurchaseOrdersController(),
    'new-purchase-order': new PurchaseOrdersController(),
    'view-purchase-order': new PurchaseOrdersController(),
    'edit-purchase-order': new PurchaseOrdersController(),

    'list-production-catalog': new ProductionCatalogController(),
    'posters': new PostersController(),
    'print-price': new PrintPriceController(),
    'profile': new ProfileController(),
    'purchase-plan': new PurchasePlanController(),
    'purchase-price': new PurchasePriceController(),
    'procedures': new ProceduresController(),
    'recipe-book': new RecipeBookController(),
    'rrhh': new RrhhController()
};

function isRoutePublic(key) {
    const publicRoutes = ['login.html', 'error-404.html', 'error-500.html'];
    return publicRoutes.includes(key);
}

function getKeyFromHashAndPath() {
    const hash = window.location.hash.slice(1).split('?')[0];
    const path = window.location.pathname.slice(BASE_PATH.length).split('?')[0];
    return hash || path || '';
}

function getCamelCaseKey(key){
    return key.includes('-') ? key.replace(/-([a-z])/g, function (match, letter) {
        return letter.toUpperCase();
    }) : key;
}

function getUrlParams() {
    const searchParams = new URLSearchParams(window.location.search);
    const hashParamsIndex = window.location.hash.indexOf('?');
    if (hashParamsIndex !== -1) {
        const hashParams = new URLSearchParams(window.location.hash.slice(hashParamsIndex + 1));
        for (let [key, value] of hashParams.entries()) {
            searchParams.append(key, value);
        }
    }
    let params = {};
    for (let [key, value] of searchParams.entries()) {
        params[key] = value;
    }
    return params;
}

function executeControllerMethod(controller, methodName, params = {}) {
    const method = controller[methodName];
    if (method && typeof method === 'function') {
        method.call(controller, params);
    }
}

export default async function router() {
    const key = getKeyFromHashAndPath();
    const params = getUrlParams();
    console.log("go router key: ", key, ", params: "+JSON.stringify(params));
    if (routes.hasOwnProperty(key)) {
        const controller = routes[key];
        // Verificar si la ruta es pública
        if (isRoutePublic(key)) {
            // Si es pública, ejecutar el controlador directamente
            if (!window.location.hash) {
                executeControllerMethod(controller, 'init', params);
            } else {
                executeControllerMethod(controller, getCamelCaseKey(key), params);
            }
        } else {
            // Si es privada, verificar la autenticación del usuario
            const dataPersistenceModel =  new DataPersistenceModel();
            const currentUser = await dataPersistenceModel.storageService.getCurrentUser();
            if (!currentUser) {
                // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
                redirectTo("login.html");
                return;
            }
            // Si el usuario está autenticado, ejecutar el controlador
            if (!window.location.hash) {
                executeControllerMethod(controller, 'init', params);
            } else {
                executeControllerMethod(controller, getCamelCaseKey(key), params);
            }
        }
    } else {
        redirectTo("error-404.html");
    }
}
