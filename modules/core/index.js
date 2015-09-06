/*jslint nomen: true, es5: true*/
/*globals module, require, console, dirRoot, __dirname, exports*/
var Module = require(dirRoot + "/libs/module").Module,
    express = require('express');
//module.exports.Route = require("./routes").Route;
function Core(app) {
    "use strict";
    this.name = "core";
    Module.call(this);
    this.Tpl = require(dirRoot + "/libs/mvc/template").Template;
    this.express = require('express');
    this.router = this.express.Router();
    this.app = app;

    this.pluginsList = require(dirRoot + "/config/plugins.json"); // liste des module (module)
    this.modules = {};

    this.configure();
    this.loadRoute();
    this.loadModules();
}

Core.prototype = Object.create(Module.prototype);
Core.prototype.constructor = Core;

Core.prototype.configure = function () {
    "use strict";
    // this.register('.html', require('ejs'));
    //this.app.engine('html', this.tpl);
    this.app.engine('html', function (filePath, options, callback) {
        return new this.Tpl(filePath, options, callback);
    });
    this.app.set('views', __dirname + '/public/view/'); // la ou sont les vues
    this.app.set('view engine', 'html'); // On utilise le moteur de template "EJS"
    this.app.set('view options', { // on peut definir quelque variable, app.title -> twop
        layout: "/home/severin/web/cms/www/view/layout.ejs"
            //page: 'truc',
            //title: 'twop'
    }); // Dans tous nos templates

    //this.use(this.express.multipart({ uploadDir: "/" }));
    this.app.use(express.static(__dirname + '/public'));
    this.app.use(express.static(__dirname + '/admin'));
    //this.app.use("/admin*", admin.auth);
};

Core.prototype.loadModules = function () {
    "use strict";
    var i, pluginName, UnModule;
    console.log("--- INFO: nombre \n de plugins : " + this.pluginsList.length);
    /* =============== on charge les plugins =============== */
    if (this.pluginsList.length > 0) {
        for (i = 0; i < this.pluginsList.length; i += 1) {
            pluginName = this.pluginsList[i];
            console.log(dirRoot + "/modules/" + pluginName + "/");
            UnModule = require(dirRoot + "/modules/" + pluginName + "/").Module;
            this.modules[pluginName] = new UnModule(this.app);
            this.modules[pluginName].start();
        }
    }
};

Core.prototype.loadRoute = function () {
    "use strict";
    /* =============== les quelque route par defaut: / , /admin =============== */
    this.router.get('/', function (req, res) {
        res.render(dirRoot + "/modules/core/public/view/home");
    });

    this.router.get('/admin/:modele?/:action?/:id?', function (req, res) {
        res.render(dirRoot + "/modules/core/admin/view/page/" + (req.params.modele || "home"), {
            "admin": true
        });
    });

    this.app.use('/', this.router);
};

exports.Core = Core;
