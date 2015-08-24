/*jslint nomen: true, es5: true*/
/*globals module, require, console, dirRoot, __dirname, exports*/
var Module = require(dirRoot + "/libs/module").Module;
//module.exports.Route = require("./routes").Route;
function Core(app, modules) {
    "use strict";
    var i, UnModule, nomPlugin,
        express = require('express'),
        router = express.Router(),
        Tpl = require(dirRoot + "/libs/mvc/template").Template;
    this.app = app;
    this.modules = modules;
    this.listePlugins = require(dirRoot + "/config/plugins.json"); // liste des plugins
    //this.modules = {};
    console.log("juste pour tester : " + this.truc);
    // this.register('.html', require('ejs'));
    //this.app.engine('html', this.tpl);
    this.app.engine('html', function (filePath, options, callback) {
        return new Tpl(filePath, options, callback);
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

    console.log("--- INFO: nombre \n de plugins : " + this.listePlugins.length);

    /* =============== les quelque route par defaut: / , /admin =============== */
    router.get('/', function (req, res) {
        res.render(dirRoot + "/modules/core/public/view/home");
    });

    router.get('/admin/:modele?/:action?/:id?', function (req, res) {
        res.render(dirRoot + "/modules/core/admin/view/page/" + (req.params.modele || "home"), {
            "admin": true
        });
    });

    this.app.use('/', router);

    /* =============== on charge les plugins =============== */
    if (this.listePlugins.length > 0) {
        for (i = 0; i < this.listePlugins.length; i += 1) {
            nomPlugin = this.listePlugins[i];

            console.log(dirRoot + "/modules/" + nomPlugin + "/");
            UnModule = require(dirRoot + "/modules/" + nomPlugin + "/").Module;
            this.modules[nomPlugin] = new UnModule(this.app);
        }
    }
}

Core.prototype = Object.create(Module.prototype);

exports.Core = Core;
