/*jslint nomen: true, devel: true */
/*globals require, process, __dirname, code, GLOBAL, exports*/
(function (exports, global) {
    "use strict";
    var server,
        config = require(__dirname + "/config/config.json"); // on charge la config

    function Server() {
        GLOBAL.dirRoot = __dirname;
        this.CONFIG = config;
        this.express = require('express');
        this.app = this.express();
        this.bodyParser = require('body-parser');
        this.methodOverride = require('method-override');
        this.cluster = require('cluster');

        this.isMultiThread = false; // pour que l'appli soit multi-thread ou non

        this.args = process.argv.slice(2); // pour recuperer les arguments

        /* le core est un module mais je le separe, mais ca peut changer et etre mis dans module */
        //this.core = {};
        //this.module = {};


    }

    Server.prototype.info = {
        "address": "",
        "port": "",
        "env": ""
    };

    Server.prototype.about = {
        "name": "jcms",
        "version": "beta 0.1",
        "author": "severin"
    };

    Server.prototype.start = function () {
        var i, cpuCount, idWorker,
            name = this.about.name;

        if (this.isMultiThread === true) {
            // gestion du multi-threading
            if (this.cluster.isMaster) {
                console.log("Démarage de l'application : " + name);

                cpuCount = require('os').cpus().length; // on compte le nb de cpu disponible
                // on créer un worker pour chaque cpu
                for (i = 0; i < cpuCount; i += 1) {
                    this.cluster.fork();
                }
            } else { // pour chaque worker on execute le code si-dessous
                idWorker = this.cluster.worker.id;
                this.startWorker(idWorker);
            }
        } else {

            this.core = require("./modules/core/").Core;
            this.core = new this.core(this.app, this.express.Router());
            this.core.start(); // fonctionne comme un module
            this.core.loadModules();
            this.startWorker(idWorker);

        }

    };

    Server.prototype.startWorker = function (idWorker) {
        var server,
            address = this.args[0] || "0.0.0.0",
            port = this.args[1] || 3000,
            info = this.info,
            name = this.about.name;

        server = this.app.listen(port, address, function () {
            var msg = idWorker ? "Cluster " + idWorker + " démarré à l'adresse %s:%d" : "serveur " + name + " démarré à l'adresse %s:%d";
            console.log(msg,
                server.address().address,
                server.address().port);
            info = {
                "address": server.address().address,
                "port": server.address().port
                    //		"env": ""
            };
        });
    };

    exports.Server = Server;

    /* definition des variable global*/
    server = global.server = new Server();
    /* demarrage de l'application*/
    server.start();
}(exports, global));
