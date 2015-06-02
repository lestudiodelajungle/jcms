/*jslint nomen: true, es5: true*/
/*globals module, require, console, dirRoot, exports, __dirname*/

//module.exports.Route = require("./routes").Route;

function Page(app) {
	"use strict";
	this.express = require('express');
	this.app = app;
	var i, Module, nomPlugin,
		router = this.express.Router(),
		tpl = require(dirRoot + "/libs/mvc/template").Template;

	this.ejs = require("ejs");

	this.app.set('views', __dirname + '/public/view/'); // la ou sont les vues
	this.app.use(this.express.static(__dirname + '/public'));

	router.get('/:id?', function (req, res) {
		console.log(req.params.id);
		//res.render(req.param.id);
		res.render(req.params.id);
	});

	this.app.use('/page', router);
}

exports.Module = Page;
