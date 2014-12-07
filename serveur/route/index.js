/*globals module, require*/
module.exports = function (app, route) {
    "use strict";
    
    var i,
        noeuds = require("../noeuds.json");

    // integre tout les script de rootage
    for (i in noeuds) {
        if (noeuds.hasOwnProperty(i)) {
            require("./" + noeuds[i])(app);
        }
    }

    app.get('/', function (req, res) {
        res.setHeader('Content-Type', 'text/plain');
        res.end('Vous êtes à l\'accueil');
    });

    app.get('/accueil', function (req, res) {
        res.setHeader('Content-Type', 'text/plain');
        res.end('Vous êtes à l\'accueil');
    });

    app.get('/403', function (req, res) {
        res.setHeader('Content-Type', 'text/plain');
        res.end('erreur 403');
    });

    app.get('/404', function (req, res) {
        res.setHeader('Content-Type', 'text/plain');
        res.end('erreur 404');
    });

    app.get('/500', function (req, res) {
        res.setHeader('Content-Type', 'text/plain');
        res.end('erreur 500');
    });
};