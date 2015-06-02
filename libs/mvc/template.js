/*
	cette classe sert à généré un template à partir de certaine données
*/
/*jslint nomen: true, es5: true*/
/*globals exports, require, dirRoot, console, RSVP, rsvp, fs, promises*/
(function (exports) {
	"use strict";
	var rsvp = require("rsvp"),
		fs = require("fs"),
		ejs = require("ejs");
	/**
	 * constructeur
	 */
	function Template(filePath, options, callback) {
		this.liste = []; //require(dirRoot + "/config/template.json"); // liste des bloc
		this.bloc = []; // liste les contenu des bloc
		this.html = ""; // le rendu final


		var promises,
			layoutpath,
			data = options,
			t2 = "tututut";
		this.layoutpath = dirRoot + '/modules/core/public/view/layout.html';


		if (options.admin && options.admin === true) {

			this.layoutpath = dirRoot + '/modules/core/admin/view/layout.html';
		}
		this.init(filePath);
		layoutpath = this.layoutpath;
		console.log("toto+ " + this.layoutpath);
		promises = this.liste.map(this.loadFile);
		rsvp.all(promises).then(function (files) {
			// proceed - files is array of your files in the order specified above.

			var t1 = ejs.render(files[1]); //la vue
			data = {
				body: t1,
				filename: layoutpath
			};

			t2 = ejs.render(files[0], data); //layout.html

			return callback(null, t2);
		}).catch(function (reason) {
			console.log(reason); // something went wrong...
			return callback(null, reason);
		});

		//return callback(null, "zezeze");
	}



	Template.prototype.init = function (filePath) {
		console.log(this.layoutpath);
		this.liste.push(this.layoutpath);
		this.liste.push(filePath);
	};
	/*
		Template.prototype.init2 = function (liste) {
			var i;
			for (i in liste) {
				if (liste.hasOwnProperty(i)) {
					if (liste[i].toType() === "object") {
						this.init(liste[i]);
					} else {
						this.bloc.push(this.loadFile(liste[i]));
					}
				}
			}
		};
	*/
	Template.prototype.loadFile = function (path) {
		console.log("path: " + path);
		return new rsvp.Promise(function (resolve, reject) {
			fs.readFile(path, 'utf8', function (error, data) {
				if (error) {
					reject(error);
				}
				resolve(data);
			});
		});
	};

	/**
	 * ajoute un bloc de contenu à la liste de bloc
	 * @param {Number} ordre place à laquelle ont doit placer le nouveau bloc
	 * @param {String} bloc  bloc de texte ou le nom du fichier
	 */
	Template.prototype.ajouterBloc = function (bloc) {

	};

	/**
	 * supprimer un bloc de la liste
	 * @param {Number} id numero du ploc à supprimer
	 */
	Template.prototype.supprimerBloc = function (id) {

	};

	/**
	 * genere le template a partir du tableau de bloc
	 * @returns {String} html de la page
	 */
	Template.prototype.generer = function () {

		return this.html;
	};

	exports.Template = Template;
}(exports));

/*

	/-layout
		/-head
		/-header
		/-aside left
		/-content
		/-aside right
		/-footer


	--->

	{
		layout: {
			head
			header
			wrapper: {
				aside left
				content
				aside right
			}
			footer
		}
	}

	-->


	{
		"layout": "view/layout.html",
		"head": "view/head.html",
		"wrapper": {
			"aside left": "view/aside.html",
			"content": "view/content.html",
			"aside right": "view/aside.html"
		},
		"footer": "view/footer.html"
	}



	il faut dabord charger la view et lui inserer les données
	ensuite on charge le layout et on lui insere les données, dont le premier rendu

	var fs = require('fs'); // this engine requires the fs module

	app.engine('ntl', function (filePath, options, callback) { // define the template engine
	  fs.readFile(filePath, function (err, content) {
		if (err) return callback(new Error(err));
		// this is an extremely simple template engine
		var rendered = content.toString().replace('#title#', '<title>'+ options.title +'</title>')
		.replace('#message#', '<h1>'+ options.message +'</h1>');
		return callback(null, rendered);
	  })
	});

	app.set('views', './views'); // specify the views directory
	app.set('view engine', 'ntl'); // register the template engine



*/