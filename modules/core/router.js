class Router {
    constructor(controler) {
        var express = require('express');
        this.route = express.Router();
        this.rest = express.Router(); // pas de service rest pour l'index
        this.controler = controler;

        this.initRoute();
        //this.initRest();
    }
    initRoute() {
        var self = this;
        this.route.get("/", function (req, res) {
            //req.app.set('views', __dirname + '/public/view/');
            res.render("home");
        });
        this.route.get("/admin", function (req, res) {
            //req.app.set('views', __dirname + '/public/view/');
            res.render("admin");
        });

        this.rest.get("/", function (req, res) {
            res.send("home");
        });
    }
    initRest() {

    }
}

module.exports = Router;
