/*jslint es6: true, nomen: true, devel: true */
/*globals require, process, __dirname, code, global, exports*/
global.dirRoot = __dirname;
(function (exports, global) {
    "use strict";
    var jcms, dirRoot,
        $$ = require('jcms-framework');
    $$.config = require(__dirname + "/config/config.json"); // on charge la config
    global.$$ = $$;

    class JCMS {
        constructor() {
            global.dirRoot = __dirname;
            this.CONFIG = $$.config;
            this.express = require('express');
            this.app = this.express();
            this.bodyParser = require('body-parser');
            this.methodOverride = require('method-override');
            this.cluster = require('cluster');
            this.isMultiThread = false; // pour que l'appli soit multi-thread ou non
            this.args = process.argv.slice(2); // pour recuperer les arguments
            this.template = require('hbs');
            this.auth = require('passport');
            this.app.auth = this.auth;
            this.pluginsList = require("./config/plugins.json"); // liste des module (module)
            this.modules = {}; // contient les modules

            this.info = {
                "address": "",
                "port": "",
                "env": ""
            };

            this.about = {
                "name": "jcms",
                "version": "beta 0.1",
                "author": "severin"
            };

            this.configure();
        }

        configure() {
            //this.register('.html', require('ejs'));
            //        this.app.engine('html', $$.Template);
            //        this.app.engine('html', function (filePath, options, callback) {
            //            return new $$.Template(filePath, options, callback);
            //        });
            //            this.app.engine('html', function (filePath, options, callback) {
            //                console.log("chemin " + filePath);
            //                return new $$.Template(filePath, options, callback);
            //            });

            this.app.set('view engine', 'html');
            this.app.engine('html', this.template.__express);
            this.app.set("views", []);
            this.app.set('view options', { // on peut definir quelque variable, app.title -> twop
                layout: "/home/severin/web/jcms/modules/core/admin/view/layout.html"
                    //page: 'truc',
                    //title: 'twop'
            }); // Dans tous nos templates
            this.app.use(this.bodyParser.json()); // for parsing application/json
            this.app.use(this.bodyParser.urlencoded({
                extended: true
            })); // for parsing application/x-www-form-urlencoded
            //this.use(this.express.multipart({ uploadDir: "/" }));
            this.app.use(this.express.static(__dirname + '/public'));
            this.app.use(this.express.static(__dirname + '/admin'));

            // Initialize Passport and restore authentication state, if any, from the
            // session.
            this.app.use(this.auth.initialize());
            this.app.use(this.auth.session({
                secret: 'ilovescotchscotchyscotchscotch'
            }));
            var LocalStrategy = require('passport-local').Strategy;
            this.auth.use(new LocalStrategy(
                function (username, password, done) {
                    console.log("tutului");
                    return done();
                }
            ));
        }

        startApp() {
            var i, cpuCount, idWorker;

            if (this.isMultiThread === true) {
                // gestion du multi-threading
                if (this.cluster.isMaster) {
                    console.info("==================================================================== \n" +
                        " \n" +
                        " Bienvenue sur jcms !! \n" +
                        " \n" +
                        " Autheur: Tarzan79 \n" +
                        " Adresse Mail: sev794@yahoo.fr \n" +
                        " Version: en developpement \n" +
                        " \n" +
                        "====================================================================");

                    cpuCount = require('os').cpus().length; // on compte le nb de cpu disponible
                    // on créer un worker pour chaque cpu
                    for (i = 0; i < cpuCount; i += 1) {
                        this.cluster.fork();
                    }
                    //                this.cluster.on('online', function (worker) {
                    //                    console.log('Worker ' + worker.process.pid + ' is online');
                    //                });

                    this.cluster.on('exit', function (worker, code, signal) {
                        console.info('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
                        console.info('Starting a new worker');
                        this.cluster.fork();
                    });
                } else { // pour chaque worker on execute le code si-dessous
                    idWorker = this.cluster.worker.id;
                    this.startModules();
                    this.startServer(idWorker);
                }
            } else {
                console.info("==================================================================== \n" +
                    " \n" +
                    " Bienvenue sur jcms !! \n" +
                    " \n" +
                    " Autheur: Tarzan79 \n" +
                    " Adresse Mail: sev794@yahoo.fr \n" +
                    " Version: en developpement \n" +
                    " \n" +
                    "====================================================================");

                this.startModules();
                this.startServer(idWorker);
            }
        }

        startModules() {
            var i, pluginName, plugin, Module;
            /* =============== on charge les plugins =============== */
            if (this.pluginsList.length > 0) {
                for (i = 0; i < this.pluginsList.length; i += 1) {
                    pluginName = this.pluginsList[i];
                    Module = require(global.dirRoot + "/modules/" + pluginName);
                    plugin = new Module(this.app);
                    this.template.registerPartials(__dirname + "/modules/" + pluginName + "/public/view");
                    this.modules[pluginName] = plugin.start();
                }
            }
            console.info("nombre de plugins : " + this.pluginsList.length);
            this.app.set('view options', { // on peut definir quelque variable, app.title -> twop
                layout: "/home/severin/web/jcms/modules/core/admin/view/layout.html"
                    //page: 'truc',
                    //title: 'twop'
            }); // Dans tous nos templates
        }

        startServer(idWorker) {
            var server,
                address = this.args[0] || "0.0.0.0",
                port = this.args[1] || 3000,
                info = this.info,
                name = this.about.name;

            server = this.app.listen(port, address, function () {
                var msg = idWorker ? "Cluster " + idWorker + " démarré à l'adresse %s:%d" : "serveur " + name + " démarré à l'adresse %s:%d";
                console.info(msg,
                    server.address().address,
                    server.address().port);
                info = {
                    "address": server.address().address,
                    "port": server.address().port
                        //		"env": ""
                };
            });
        }
    }

    exports.JCMS = JCMS;
    /* definition des variable global*/

    var winston = require('winston');

    jcms = global.jcms = new JCMS();
    /* demarrage de l'application*/
    //jcms.configure();
    jcms.startApp();
}(exports, global));


// ce que doit renvoyé un module
//1 - les routes, enfin le router avec des routes definis
//2 - les methodes du controler ou par defaut une classe controleur
//3 - pareils pour le modele/schemma mongoDB

//Pourquoi ?
//1 bah en fait les route y'en a pas vraiment besoin mais faut pour les lancer et les modifier
//2 elle doivent etre accessible pour pouvoir etre utilisé par d'autre modules
//3 aussi pour etre utiliser par d'autre modules

//donc concretement ...
// solution A
//unModule = {
//    router: {},
//    controler: {},
//    schema: {}
//}
