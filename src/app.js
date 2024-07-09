import router from './router.js';


window.addEventListener('load', router);
window.addEventListener('hashchange', router);

var timestamp = new Date().getTime();

// Obtener todos los elementos link que cargan CSS
var links = document.querySelectorAll('link[rel="stylesheet"]');
links.forEach(function(link) {
    var href = link.getAttribute('href');
    link.setAttribute('href', href + (href.includes('?') ? '&' : '?') + 'v=' + timestamp);
});

// Obtener todos los elementos script que cargan JS
var scripts = document.querySelectorAll('script[src]');
scripts.forEach(function(script) {
    var src = script.getAttribute('src');
});
