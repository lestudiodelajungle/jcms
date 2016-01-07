/*globals require, GLOBAL, exports, console, dirRoot*/
class Router {
    constructor(controler, auth) {
        var express = require('express');
        this.route = express.Router();
        this.rest = express.Router(); // pas de service rest pour l'index
        this.controler = controler;
        this.auth = auth;

        this.initRoute();
        //this.initRest();
    }

    initRoute() {
        var self = this;
        this.route.get("/:id?", function (req, res) {
            var page = (req.params.id == "undefined" ? "accueil" : req.params.id);
            res.render(self.controler.displayPage(page));
        });

        this.rest.get("/:id?", function (req, res) {
            res.send(self.controler.getPage(req.params.id));
        });
    }
    initRest() {

    }
}
module.exports = Router;
