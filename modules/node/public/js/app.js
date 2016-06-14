/*globals Backbone, Route*/
(function () {
	"use strict";

	function Noeud() {

	}

	Noeud.prototype.init = function () {
		// init des modeles et collection

		this.modele = Backbone.Model.extend({
			urlRoot: "/noeud"
		});

		this.collection = Backbone.Collection.extend({
			url: "/noeud",
			model: this.modele
		});

		// demarer le routeur
		this.router = new Route();
		Backbone.history.start();
	};
}());
