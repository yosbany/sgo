import router from './router.js';

window.STORAGE_TYPE = 'firebase'; // O 'localstorage'
window.addEventListener('load', router);
window.addEventListener('hashchange', router);
