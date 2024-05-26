import router from './router.js';

window.STORAGE_TYPE = 'firebase';
//window.STORAGE_TYPE = 'localstorage';
window.addEventListener('load', router);
window.addEventListener('hashchange', router);
