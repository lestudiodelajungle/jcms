/*globals Backbone, Route*/
(function () {
	"use strict";

	function App() {
		this.listeModules = ["page", "noeud"]; // liste des modules

	}

	App.prototype.init = function () {
		// init des modeles et collection


		// demarer le routeur
		this.router = new Route();
		Backbone.history.start();
	};

	App.prototype.loadModule = function (nom) {

		this.modules[nom] = leModule;
	};

}());
