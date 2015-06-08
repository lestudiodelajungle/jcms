/*globals Backbone, Route*/
(function () {
	"use strict";

	function Page() {

	}

	Page.prototype.init = function () {
		// init des modeles et collection

		this.modele = Backbone.Model.extend({
			urlRoot: "/page"
		});

		this.collection = Backbone.Collection.extend({
			url: "/page",
			model: this.modele
		});

		// demarer le routeur
		this.router = new Route();
		Backbone.history.start();
	};
}());
