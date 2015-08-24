/*jslint nomen: true, es5: true*/
/*globals exports, require, dirRoot, console, RSVP, rsvp, fs, promises, __dirname*/
(function (exports) {
    "use strict";
    //module.exports.Route = require("./routes").Route;
    function Module(app) {
        this.express = require('express');
        this.app = app;
        this.ejs = require("ejs");
        this.app.set('views', __dirname + '/public/view/'); // la ou sont les vues
        this.app.use(this.express.static(__dirname + '/public'));

        var i, nomPlugin,
            router = this.express.Router(),
            tpl = require(dirRoot + "/libs/mvc/template").Template;



        router.get('/:id?', function (req, res) {
            res.render(req.param.id);
        });

        this.app.use('/page', router);
    }

    Module.prototype.install = function (id) {
        this.initDatabase();
    };

    Module.prototype.desinstall = function (id) {
        this.removeDatabase();
    };

    Module.prototype.start = function () {
        this.initRoute();
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

    Module.prototype.initRoute = function () {

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
