import { redirectTo } from './util.js';
import ErrorControllerInstance from './controllers/errors-controller.js';
import SecurityControllerInstance from './controllers/security-controller.js';
import HomeControllerInstance from './controllers/home-controller.js';
import PurchaseOrdersControllerInstance from './controllers/purchase-orders-controller.js';
import ProductionCatalogControllerInstance from './controllers/production-catalog-controller.js';
import ToolsControllerInstance from './controllers/tools-controller.js';
import ProceduresControllerInstance from './controllers/procedures-controller.js';
import AccountingMovementsControllerInstance from './controllers/accounting-movements-controller.js';
import RecipeBookControllerInstance from './controllers/recipe-book-controller.js';
import PayrollsControllerInstance from './controllers/payrolls-controller.js';
import SecurityServiceInstance from './services/security-service.js';
import DataPersistenceServiceInstance from './services/data-persistence-service.js';
import ArticlesControllerInstance from './controllers/articles-controller.js';




const BASE_PATH = '/nrd/';

const routes = {
    //Public
    'error-404': ErrorControllerInstance,
    'error-500': ErrorControllerInstance,
    'login': SecurityControllerInstance,
    //Private
    //HomeController
    '': HomeControllerInstance,
    'index': HomeControllerInstance,
    'home': HomeControllerInstance,
    'exit': HomeControllerInstance,
    'list-backup': HomeControllerInstance,

    'list-accounting-movements': AccountingMovementsControllerInstance,

    'list-articles': ArticlesControllerInstance,
    
    //PurchaseOrdersController
    'list-purchase-orders': PurchaseOrdersControllerInstance,
    'new-purchase-order': PurchaseOrdersControllerInstance,
    'view-purchase-order': PurchaseOrdersControllerInstance,
    'edit-purchase-order': PurchaseOrdersControllerInstance,

    'list-production-catalog': ProductionCatalogControllerInstance,

    'posters': ToolsControllerInstance,
    'print-price': ToolsControllerInstance,
    'profile': ToolsControllerInstance,
    'purchase-plan': ToolsControllerInstance,
    'purchase-price': ToolsControllerInstance,
    'calculate-price':ToolsControllerInstance,

    'list-procedures': ProceduresControllerInstance,

    'list-recipe-book': RecipeBookControllerInstance,
    'list-payrolls': PayrollsControllerInstance
};

function isRoutePublic(key) {
    const publicRoutes = ['login', 'error-404', 'error-500'];
    return publicRoutes.includes(key);
}

function getKeyFromHashAndPath() {
    const hash = window.location.hash.slice(1).split('?')[0];
    let path = window.location.pathname.slice(BASE_PATH.length).split('?')[0];
    const dotIndex = path ? path.indexOf('.') : -1;
    if (dotIndex !== -1) {
        path = path.slice(0, dotIndex);
    }
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
            executeControllerMethod(controller, getCamelCaseKey(key), params);
        } else {
            // Si es privada, verificar la autenticación del usuario
            const currentUser = await SecurityServiceInstance.getCurrentUser();
            if (!currentUser) {
                // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
                redirectTo("login.html");
                return;
            }
            // Si el usuario está autenticado, ejecutar el controlador
            if (key === '') {
                executeControllerMethod(controller, 'index', params);
            } else {
                executeControllerMethod(controller, getCamelCaseKey(key), params);
            }
        }
    } else {
        redirectTo("error-404.html");
    }
}
