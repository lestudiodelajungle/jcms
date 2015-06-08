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

		}
	});


}());
