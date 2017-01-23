/*jslint es6: true, nomen: true, devel: true */
/*globals require, process, __dirname, code, global, exports*/
global.dirRoot = __dirname;
global.a = "12345";
global.log = require("./libs/log");
global.framework = require('./libs/jcms-framework');


(function (exports, global) {
    "use strict";
    var jcms, dirRoot,
        colors = require('colors'),
        winston = require('winston'); // pour ameliorer la console

    class JCMS {
        /**
         * charge la plupart des module pour nodejs
         * et les fichier de config
         */
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
            this.core = {};

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

        /**
         * configure principalement le module Express
         */

        configure() {
            log.debug("app:configure()");
            this.app = this.express();
//            this.app.set('view engine', 'html');
//            this.app.engine('html', this.template.__express);
//            this.app.set("views", []);
//            this.app.set('view options', { // on peut definir quelque variable, app.title -> twop
//                layout: "/home/severin/web/jcms/modules/core/public/view/layout/layout.html"
//                    //page: 'truc',
//                    //title: 'twop'
//            }); // Dans tous nos templates
            this.app.use(this.bodyParser.json()); // for parsing application/json
            this.app.use(this.bodyParser.urlencoded({
                extended: true
            })); // for parsing application/x-www-form-urlencoded
            // this.use(this.express.multipart({ uploadDir: "/" }));
//            this.app.use(this.express.static(__dirname + '/public'));
//            this.app.use(this.express.static(__dirname + '/admin'));

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


            this.app.locals.about = this.about;
            this.app.locals.info = this.info;

        }

        /**
         * lance le tout
         */
        start() {
            log.debug("app:start()");
            this.clusterize();
        }

        /**
         * créer des cluster pour chaque thread du cpu
         */
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

        /**
         * lance une instance de l'application
         */
        startApp(idWorker) {
            log.debug("app:startApp()");
            this.configure();
            var core = require(global.dirRoot + "/modules/core");
            this.core = new core(this.app);
            this.startServer(idWorker);
        }


        /**
         * demarre le serveur express
         * @param {number} idWorker le worker sur lequel lancer le serveur
         */
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

    /**
     * determine si un objet est vide ou non
     * @param   {object} obj objet à traiter
     * @returns {boolean}  true si c'est vide
     */
    function isEmpty(obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop))
            return false;
        }
        return true;
    }
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



