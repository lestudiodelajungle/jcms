/*globals require, GLOBAL, exports, console, dirRoot*/
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
            self.controler.getUsers().then(function (val) {
                res.render("liste", val);
            });
        });

        // affiche le formulaire d'inscription
        this.route.get("/login", function (req, res) {
            res.render("connect");
        });
        this.route.post("/login", function (req, res) {
            res.render('connect');
        });
        this.route.get("/edit/:id", function (req, res) {
            self.controler.getUser(req.params._id).then(function (val) {
                res.render("edit", val);
            });
        });
        this.route.get("/liste", function () {
            self.controler.getUsers().then(function (val) {
                res.render("liste", val);
            });
        });

        ////////////////////////////////////////////////////////////////
        this.rest.route("/:id?").get(function (req, res) {
            self.controler.getUsers().then(function (val) {
                res.send(val);
            });
        }).post(function (req, res) {
            //console.log(req.body);
            self.controler.addUser(req.body).then(function (val) {
                res.send(val);
            });
        }).put(function (req, res) {
            self.controler.updateUser(req.body).then(function (val) {
                res.send(val);
            });
        }).delete(function (req, res) {
            self.controler.deleteUser(req.body).then(function (val) {
                res.send(val);
            });
        });
    }

    initRest() {

    }
}
module.exports = Router;
