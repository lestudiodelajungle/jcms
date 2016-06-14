/*jslint es6: true, nomen: true, devel: true */
/*globals require, process, __dirname, code, global, exports*/
global.dirRoot = __dirname;
global.a = "12345";
(function (exports, global) {
    "use strict";
    var jcms, dirRoot,
        colors = require('colors'),
        winston = require('winston'); // pour ameliorer la console

    class JCMS {
        constructor() {
            console.time("concatenation");
            global.dirRoot = __dirname;
            // on charge la plupart des modules
            this.cluster = require('cluster');
            this.express = require('express');
            this.bodyParser = require('body-parser');
            this.methodOverride = require('method-override');
            this.template = require('hbs');
            this.auth = require('passport');
            this.mongo = require('mongodb').MongoClient;
            // on recupere les fichiers config
            this.CONFIG = require(__dirname + "/config/config.json");
            this.pluginsList = require("./config/plugins.json"); // liste des module (module)

            this.env = "dev";
            this.isMultiThread = false; // mode multi-thread: true/false
            this.args = process.argv.slice(2); // pour recuperer les arguments

            //            this.template.open = '{{';
            //            this.template.close = '}}';

            //            this.app.auth = this.auth;

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
        }

        configure() {
            log.debug("app:configure()");
            this.app = this.express();
            this.app.set('view engine', 'html');
            this.app.engine('html', this.template.__express);
            this.app.set("views", []);
            this.app.set('view options', { // on peut definir quelque variable, app.title -> twop
                layout: "/home/severin/web/jcms/modules/core/public/view/layout/layout.html"
                    //page: 'truc',
                    //title: 'twop'
            }); // Dans tous nos templates
            this.app.use(this.bodyParser.json()); // for parsing application/json
            this.app.use(this.bodyParser.urlencoded({
                extended: true
            })); // for parsing application/x-www-form-urlencoded
            // this.use(this.express.multipart({ uploadDir: "/" }));
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
                    log.info("tutului");
                    return done();
                }
            ));

            this.log = global.log;

            // permet d'affecter les variable local a handlebars
            this.template.localsAsTemplateData(this.app);
            this.app.locals.about = this.about;
            this.app.locals.info = this.info;

        }

        start() {
            log.debug("app:start()");
            this.clusterize();
        }

        clusterize() {
            log.debug("app:clusterrize()");
            var i, cpuCount, idWorker,
                cpuCount = require('os').cpus().length; // on compte le nb de cpu disponible

            if (this.isMultiThread === true) {
                // gestion du multi-threading
                if (this.cluster.isMaster) {
                    this.welcome();

                    // on créer un worker pour chaque cpu
                    for (i = 0; i < cpuCount; i += 1) {
                        this.cluster.fork();
                    }

                    this.cluster.on('online', function (worker) {
                        log.info('Worker ' + worker.process.pid + ' is online');
                    });

                    this.cluster.on('exit', function (worker, code, signal) {
                        log.info('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
                        log.info('Starting a new worker');
                        this.cluster.fork();
                    });
                } else { // pour chaque worker on execute le code si-dessous
                    idWorker = this.cluster.worker.id;
                    this.startApp(idWorker);
                }
            } else {
                this.welcome();
                this.startApp();
            }
        }

        welcome() {
            log.log("verbose", "==================================================================== \n".green +
                " \n" +
                " Bienvenue sur jcms !! \n".green +
                " \n" +
                " Autheur: ".green + "Tarzan79 \n".yellow +
                " Adresse Mail: ".green + "sev794@yahoo.fr \n".yellow +
                " Version:".green + " en developpement \n".yellow +
                " \n" +
                "====================================================================".green);
        }

        startApp(idWorker) {
            log.debug("app:startApp()");
            this.configure();

            ////////////////////////////////////////////////////
            var userRouter = this.express.Router();


            userRouter.route('/')
                .get(function (req, res) {
                    res.status(200)
                        .send('hello users');
                });

            userRouter.route('/:user')
                .get(function (req, res) {
                    res.status(200)
                        .send('hello user ' + JSON.stringify(req.params));
                });


            this.app.use('/user', userRouter);

            ////////////////////////////////////////////////////
            var itemRouter = this.express.Router({
                mergeParams: true
            });


            itemRouter.route('/')
                .get(function (req, res) {
                    res.status(200)
                        .send('hello items from user ' + req.params.userId);
                });

            itemRouter.route('/:itemId')
                .get(function (req, res) {
                    res.status(200)
                        .send('hello item ' + req.params.itemId + ' from user ' + JSON.stringify(req.params));
                });

            userRouter.use('/:userId?/items', itemRouter);

            ////////////////////////////////////////////////////////


            var self = this;
            this.mongo.connect("mongodb://localhost:27017/jcms").then(function (db) {
                self.db = db;
                self.startModules();

                self.startServer();

                self.app.use(function (req, res, next) {
                    if (req.accepts("html")) {
                        res.type("html");
                    }
                    if (req.accepts("json")) {
                        res.type("json");
                    }
                    if (req.accepts("xml")) {
                        res.type("xml");
                    }
                    next();
                });

                //                self.app.use(function (err, req, res, next) {
                //                    res.status(err.status || 500);
                //                    res.status('error').send({
                //                        message: err.message,
                //                        error: err
                //                    });
                //                });

                //                self.app.use(function (req, res, next) {
                //                    var err = new Error('Not Found : ' + req.path);
                //                    err.status = 404;
                //                    next(err);
                //                });


            }).catch(function (err) {
                log.error("erreur: " + err.stack);
                throw new Error(err);

            });
        }

        // sync method
        startModules() {
            log.debug("app:start()");
            var i, pluginName, plugin, Module;
            if (this.pluginsList.length > 0) {
                for (i = 0; i < this.pluginsList.length; i += 1) {
                    pluginName = this.pluginsList[i];
                    Module = require(global.dirRoot + "/modules/" + pluginName);
                    plugin = new Module(pluginName, this.app, this.db);
                    this.template.registerPartials(__dirname + "/modules/" + pluginName + "/public/view");
                    this.modules[pluginName] = plugin.start();
                }
                log.info('info', "nombre de plugins : %s", this.pluginsList.length);
            }

        }

        startServer(idWorker) {
            log.debug("app:startServer");
            var address = this.args[0] || "0.0.0.0",
                port = this.args[1] || 3000,
                info = this.info,
                name = this.about.name;

            this.app.listen(port, address, function () {
                var msg = idWorker ? "Cluster " + idWorker + " démarré à l'adresse %s:%d" : "serveur " + name + " démarré à l'adresse %s:%s";
                log.info(msg, address.yellow, port.toString().yellow);
                info = {
                    "address": address,
                    "port": port
                        //		"env": ""
                };
            });
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    exports.JCMS = JCMS; // au cas ou ce script serai utiliser comme un module
    function isEmpty(obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
            return false;
        }
        return true;
    }

    global.log = require("./libs/log");
    jcms = global.jcms = new JCMS().start();
}(exports, global));


/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
};


// dash to camelCase
String.prototype.toCamel = function () {
    return this.replace(/(\-[a-z])/g, function ($1) {
        return $1.toUpperCase().replace('-', '');
    });
};

// camel to dash (or spinal-case)
String.prototype.toDash = function () {
    return this.replace(/([A-Z])/g, function ($1) {
        return "-" + $1.toLowerCase();
    });
};

//camel to snake_case
String.prototype.toUnderscore = function () {
    return this.replace(/([A-Z])/g, function ($1) {
        return "_" + $1.toLowerCase();
    });
};
