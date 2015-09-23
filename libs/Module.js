/*jslint nomen: true, es5: true*/
/*globals exports, require, dirRoot, console, RSVP, rsvp, fs, promises, __dirname*/
(function (exports) {
    "use strict";
    //module.exports.Route = require("./routes").Route;
    var $$ = require("jcms-framework");
    function Module(app, router) {
        this.express = require('express');
        this.app = app;
        this.ejs = require("ejs");
        this.app.set('views', __dirname + '/public/view/'); // la ou sont les vues
        this.app.use(this.express.static(__dirname + '/public'));
        this.bdd = ""; // nom du sgbd (mysql, mongodb, sqlite, etc)
        this.router = router || this.express.Router();

        var i, nomPlugin,
            tpl = require(dirRoot + "/libs/mvc/Template").Template;



        //        this.router.get('/:id?', function (req, res) {
        //            res.render(req.param.id);
        //        });


    }

    Module.prototype.install = function (id) {
        this.initDatabase();
    };

    Module.prototype.uninstall = function (id) {
        this.removeDatabase();
    };

    Module.prototype.start = function () {
        if ($$.exist(this.configure)) {
            this.configure();
        }
        if ($$.exist(this.loadRoute)) {
            this.loadRoute();
        }
        if ($$.exist(this.initRoute)) {
            this.initRoute();
        }
    };

    Module.prototype.stop = function () {

    };

    Module.prototype.restart = function () {

    };

    Module.prototype.addToAdminPanel = function () {

    };

    Module.prototype.removeToAdminPanel = function () {

    };

    Module.prototype.initDatabase = function () {

    };

    Module.prototype.removeDatabase = function () {

    };

    Module.prototype.initRoute = function (schemma) {
        this.router.get('/' + this.nom, function (req, res) {
            this.controleur.getAll();
        });
        this.router.get('/' + this.nom + "/:id", function (req, res) {
            this.controleur.get(id);
        });
        this.router.post('/' + this.nom, function (req, res) {
            this.controleur.new();
        });
        this.router.put('/' + this.nom + "/:id", function (req, res) {
            this.controleur.edit();
        });
        this.router.delete('/' + this.nom + "/:id", function (req, res) {
            this.controleur.suppr();
        });

        this.app.use('/page', this.router);
    };

    Module.prototype.new = function (data) {

    };

    Module.prototype.get = function (id) {

    };

    Module.prototype.getAll = function () {

    };

    Module.prototype.update = function (id, data) {

    };

    Module.prototype.del = function (id) {

    };

    exports.Module = Module;
}(exports));
