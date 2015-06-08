/*globals Backbone*/
(function () {
	"use strict";

	var Route = Backbone.Router.extend({
		routes: {
			"page": "liste",
			"page/:id": "lirePage",
			"page/:action/:id": "",
			"admin": ""
		},
		lirePage: function () {

		},
		listePage: function () {
			// on charge les données
			this.
			// on charge le template
			// on les assemble
		},
		modifierPage: function(){

		},
		creerPage: function(){

		},
		supprimerPage: function(){

		}
	});
}());
