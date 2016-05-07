requirejs.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap'
    }
});

loadCss('../bower_components/normalize-css/normalize.css');
loadCss('../bower_components/bootstrap/dist/css/bootstrap.css');
loadCss('../style.css');

function loadCss(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}