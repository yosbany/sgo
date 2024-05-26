window.STORAGE_TYPE = 'firebase';
//window.STORAGE_TYPE = 'localstorage';
import router from './router.js';

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
