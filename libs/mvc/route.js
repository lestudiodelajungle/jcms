/*
    Classe Route

    structure des url

    methode     URL             format donnée       action
    get         /modele/id      JSON                lire
    post        /modele/id      rien                creer
    put         /modele         rien                modifier
    delete      /modele/id      rien                supprimer

*/
/*jslint nomen: true, devel: true */
/*globals module, require, console, __dirname, GLOBAL, exports*/

/**
 * [[Description]]
 * @param {String} nom : nom du modele
 * @param {Object} app : objet Express.app
 */

(function (exports) {
	"use strict";

	function Route() {
		this.test = "jcms";
	}

	/**
	 * arrete l'ecoute des routes
	 */

	Route.prototype.allStop = function () {
		this.app.route(this.url)
			.all(null)
			.get(null)
			.post(null)
			.put(null)
			.del(null);
	};

	/**
	 * [[Description]]
	 * @param {Object} req  [[Description]]
	 * @param {Object} res  [[Description]]
	 * @param {Object} next [[Description]]
	 */



	exports.Route = Route;

}(exports));
