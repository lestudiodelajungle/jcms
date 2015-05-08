/*globals module, require, console*/
//module.exports.Route = require("./routes").Route;
function Core(app) {
	"use strict";
	this.express = require('express');
	var i, Module, nomPlugin,
		router = this.express.Router();

	this.app = app;
	/*  -- la grosse partie qui configure le serveur --  */
	// this.register('.html', require('ejs'));

	var tpl = require(dirRoot + "/libs/mvc/template").Template;

	//this.app.engine('html', this.tpl);

	this.app.engine('html', function (filePath, options, callback) { // define the template engine
		return new tpl(filePath, options, callback);
	});

	this.app.set('views', __dirname + '/public/view/'); // la ou sont les vues
	this.app.use(this.express.static(__dirname + '/public'));
	this.app.set('view engine', 'html'); // On utilise le moteur de template "EJS"
	this.app.set('view options', { // on peut definir quelque variable, app.title -> twop
		layout: "/home/severin/web/cms/www/view/layout.ejs"
			//page: 'truc',
			//title: 'twop'
	}); // Dans tous nos templates
	//this.use(this.express.multipart({ uploadDir: "/" }));

	this.listePlugins = require(dirRoot + "/config/plugins.json"); // liste des plugins
	this.modules = {};

	console.log("--- INFO: nombre \n de plugins : " + this.listePlugins.length);

	// les quelque route par defaut: / , /admin

	router.get('/', function (req, res) {
		res.render("home");
	});

	router.get('/admin', function (req, res) {
		res.send('im the admin page!');
	});

	this.app.use('/', router);

	if (this.listePlugins.length > 0) {
		for (i = 0; i < this.listePlugins.length; i += 1) {
			nomPlugin = this.listePlugins[i];

			console.log(dirRoot + "/modules/" + nomPlugin + "/");
			Module = require(dirRoot + "/modules/" + nomPlugin + "/").Route;
			this.modules[nomPlugin] = new Module(this.app);
		}
	}
}

exports.Core = Core;
