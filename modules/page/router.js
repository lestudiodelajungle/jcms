/*globals require, GLOBAL, exports, console, dirRoot*/
(function (exports) {
	"use strict";

	function Route(app) {
		this.app = app;
		this.router = require("express").Router();
		this.router.route("/:page?/:id?")
			.get(function (req, res) {
				res.send("page");
				//res.send(controleur.selectAll(modele, action, param));
			});
		this.app.use('/page', this.router);
	}

	Route.prototype = require(dirRoot + "/libs/mvc/route").Route.prototype; // herite de la classe Route du framework //

	exports.Route = Route;
}(exports));
