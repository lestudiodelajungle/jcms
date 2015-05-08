/*globals module, require*/
module.exports.Route = require("./routes").Route;

/*globals module, require, console*/
//module.exports.Route = require("./routes").Route;
function Page(app) {
	"use strict";
	this.express = require('express');
	this.app = app;
	var i, Module, nomPlugin,
		router = this.express.Router();

	this.ejs = require("ejs");
	var tpl = require(dirRoot + "/libs/mvc/template").Template;


	this.app.set('views', __dirname + '/public/view/'); // la ou sont les vues
	this.app.use(this.express.static(__dirname + '/public'));

	router.get('/:id?', function (req, res) {
		res.render(req.param.id);
	});

	this.app.use('/page', router);
}

exports.Page = Page;
