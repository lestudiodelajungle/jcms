/*globals require, GLOBAL, exports, console, dirRoot*/
(function (exports) {
	"use strict";

	function Route(app) {
		this.app = app;
		this.router = require("express").Router();
		this.router.route("/:modele?/:id?")
			.get(function (req, res) {
				res.send("nono");
				//res.send(controleur.selectAll(modele, action, param));
			});
		this.app.use('/noeud', this.router);
	}

	Route.prototype = require(dirRoot + "/libs/mvc/Router").Route.prototype; // herite de la classe Route du framework //

	exports.Route = Route;
}(exports));
