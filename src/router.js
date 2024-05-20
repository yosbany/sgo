import { redirectTo } from './util.js';
import DataPersistenceModel from './models/data-persistence-model.js';
import HomeController from './controllers/home-controller.js';
import LoginController from './controllers/login-controller.js';
import AccountingTransactionsController from './controllers/accounting-transactions-controller.js';
import BudgetLunchController from './controllers/budget-lunch-controller.js';
import CalculatePriceController from './controllers/calculate-price-controller.js';
import CounterShiftsController from './controllers/counter-shifts-controller.js';
import OnlineCatalogController from './controllers/online-catalog-controller.js';
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




const BASE_PATH = '/nrd/';

const routes = {
    //Public
    // Error404Controller
    'error-404.html': new Error404Controller(),
    // Error500Controller
    'error-500.html': new Error500Controller(),
    // LoginController
    'login.html': new LoginController(),
    //Private
    // HomeController
    '': new HomeController(),
    'index.html': new HomeController(),
    'home': new HomeController(),
    'exit': new HomeController(),
    // AccountingTransactionsController
    'accounting-transactions': new AccountingTransactionsController(),
    // BudgetLunchController
    'budget-lunch': new BudgetLunchController(),
    // CalculatePriceController
    'calculate-price': new CalculatePriceController(),
    // CounterShiftsController
    'counter-shifts': new CounterShiftsController(),
    // MakeOrderController
    'list-purchase-orders': new PurchaseOrdersController(),
    // OnlineCatalogController
    'online-catalog': new OnlineCatalogController(),
    // PostersController
    'posters': new PostersController(),
    // PrintPriceController
    'print-price': new PrintPriceController(),
    // ProfileController
    'profile': new ProfileController(),
    // PurchasePlanController
    'purchase-plan': new PurchasePlanController(),
    // PurchasePriceController
    'purchase-price': new PurchasePriceController(),
    // ProceduresController
    'procedures': new ProceduresController(),
    // RecipeBookController
    'recipe-book': new RecipeBookController(),
    // RrhhController
    'rrhh': new RrhhController()
};

function isRoutePublic(key) {
    const publicRoutes = ['login.html', 'error-404.html', 'error-500.html'];
    return publicRoutes.includes(key);
}


function getKeyFromHashAndPath() {
    const hash = window.location.hash.slice(1);
    const path = window.location.pathname.slice(BASE_PATH.length);
    return hash || path || '';
}

function getCamelCaseKey(key){
    return key.includes('-') ? key.replace(/-([a-z])/g, function (match, letter) {
        return letter.toUpperCase();
    }) : key;
}

function executeControllerMethod(controller, methodName) {
    const method = controller[methodName];
    if (method && typeof method === 'function') {
        method.call(controller);
    }
}

export default async function router() {
    const key = getKeyFromHashAndPath();
    console.log("go router key: ", key);
    if (routes.hasOwnProperty(key)) {
        const controller = routes[key];
        // Verificar si la ruta es pública
        if (isRoutePublic(key)) {
            // Si es pública, ejecutar el controlador directamente
            if (!window.location.hash) {
                executeControllerMethod(controller, 'init');
            } else {
                executeControllerMethod(controller, getCamelCaseKey(key));
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
                executeControllerMethod(controller, 'init');
            } else {
                executeControllerMethod(controller, getCamelCaseKey(key));
            }
        }
    } else {
        redirectTo("error-404.html");
    }
}
