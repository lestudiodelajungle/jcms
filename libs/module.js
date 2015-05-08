/*globals exports, require, dirRoot, console, RSVP, rsvp, fs, promises*/
(function (exports) {
	"use strict";
	//module.exports.Route = require("./routes").Route;
	function Module(app) {
		this.express = require('express');
		this.app = app;
		var i, nomPlugin,
			router = this.express.Router(),
			tpl = require(dirRoot + "/libs/mvc/template").Template;

		this.ejs = require("ejs");
		this.app.set('views', __dirname + '/public/view/'); // la ou sont les vues
		this.app.use(this.express.static(__dirname + '/public'));

		router.get('/:id?', function (req, res) {
			res.render(req.param.id);
		});

		this.app.use('/page', router);
	}

	Module.prototype.addToAdminPanel = function () {

	};

	exports.Module = Module;
}(exports));
