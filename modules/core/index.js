/*jslint nomen: true*/
/*globals module, require, log, dirRoot, __dirname, exports*/
"use strict";
var Module = framework.Module;
var express = require('express');
var path = require('path');
var template = require("hbs");

class Core extends Module {
    constructor(app) {
        super("core", app); // pour appeler le construceur parent, y'en a besoin sinon this n'est pas definis
        this.app = app;
        this.modules = {};
        this.pluginsList = require("../../config/plugins.json"); // liste des module (module)
        this.template = template;

        this.app.use(express.static(__dirname + '/public'));
        // petite gestion pour les erreurs html
        this.app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.status('error').send({
                message: err.message,
                error: err
            });
        });


        this.menuAdmin.core = {
            "page": "/page"
        };
        //        this.app.use(function (req, res, next) {
        //            var err = new Error('Not Found : ' + req.path);
        //            err.status = 404;
        //            next(err);
        //        });
        ////    fin des petite erreur (ca marche pas)  /////
        log.log("constructeur core");
        this.configTemplate();
        this.startModules();
    }

    configTemplate() {
        this.template = require("hbs");
        this.app.set('view engine', '.html');
        this.app.engine('html', this.template.__express);
        this.app.set("views", __dirname + "/public/view");
        this.template.registerPartials(__dirname + '/public/view/block');
        this.template.registerPartials(__dirname + '/public/view/admin');
        this.app.set('views', path.join(__dirname, "/public/view"));
        //        this.app.set('view options', { // on peut definir quelque variable, app.title -> twop
        //            layout: "/layout.html"
        //                //page: 'truc',
        //                //title: 'twop'
        //        }); // Dans tous nos templates
        this.template.localsAsTemplateData(this.app);
    }
    startModules() {
        log.debug("app:start()");
        var i, pluginName, plugin, Module;
        if (this.pluginsList.length > 0) {
            for (i = 0; i < this.pluginsList.length; i += 1) {
                pluginName = this.pluginsList[i];
                Module = require(global.dirRoot + "/modules/" + pluginName);
                plugin = new Module(this.app);
                this.template.registerPartials(__dirname + "/modules/" + pluginName + "/public/view");
                this.modules[pluginName] = plugin.start();
                this.menu = plugin.getAdminMenu();
            }
            log.info('info', "nombre de plugins : %s", this.pluginsList.length);
        }
    }
    startModule(name) {
        Module = require(global.dirRoot + "/modules/" + pluginName);
        plugin = new Module(this.app);
        this.template.registerPartials(__dirname + "/modules/" + pluginName + "/public/view");
        this.modules[pluginName] = plugin.start();
    }
};

module.exports = Core;
