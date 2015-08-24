/*jslint nomen: true, devel: true */
/*globals require, process, __dirname, code, GLOBAL, exports*/
(function () {
	"use strict";
    var serveur,
        config = require(__dirname + "/config/config.json"); // on charge la config

	function Serveur() {
		this.CONFIG = config;
		this.express = require('express');
		this.app = this.express();
		this.bodyParser = require('body-parser');
		this.methodOverride = require('method-override');
		this.cluster = require('cluster');

		this.isMultiThread = false; // pour que l'appli soit multi-thread ou non

		this.args = process.argv.slice(2); // pour recuperer les arguments

		/* le core est un module mais je le separe, mais ca peut changer et etre mis dans module */
		this.core = {};
		this.module = {};

		this.info = {
			"adresse": "",
			"port": "",
			"env": ""
		};

		this.about = {
			"nom": "jcms",
			"version": "beta 0.1",
			"auteur": "severin"
		};
	}

	Serveur.prototype.start = function () {
		var i, cpuCount, idWorker,
			nom = this.about.nom;

		if (this.isMultiThread === true) {
			// gestion du multi-threading
			if (this.cluster.isMaster) {
				console.log("Démarage de l'application : " + nom);

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

			require("./modules/core/").Core(this.app, this.module);
			this.startWorker();

		}

	};

	Serveur.prototype.startWorker = function (idWorker) {
		var server,
			adresse = this.args[0] || "0.0.0.0",
			port = this.args[1] || 3000,
			info = this.info,
			nom = this.about.nom;

		server = this.app.listen(port, adresse, function () {
			var msg = idWorker ? "Cluster " + idWorker + " démarré à l'adresse %s:%d" : "serveur " + nom + " démarré à l'adresse %s:%d";
			console.log(msg,
				server.address().address,
				server.address().port);
			info = {
				"adresse": server.address().address,
				"port": server.address().port
					//		"env": ""
			};
		});
	};


	exports.Serveur = Serveur;


	Object.prototype.toType = function () {
		return ({}).toString.call(this).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
	};

	/* definition des variable global*/
	GLOBAL.dirRoot = __dirname;
	GLOBAL.Promise = require("rsvp"); // pour la gestion des Promise qui n'est par encore implementé partout

	serveur = GLOBAL[config.variable] = new Serveur();

	/* demarrage de l'application*/
	serveur.start();

}());
