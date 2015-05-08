// route du module core
/*globals require, GLOBAL, exports*/
(function (exports) {
	"use strict";

	function Route(app) {
		this.app = app;

		if (this.app.get('env') === 'development') {

			this.app.use(function (err, req, res, next) {
				res.status(err.status || 500);
				res.render('error', {
					message: err.message,
					error: err
				});
			});

		}

		// production error handler
		// no stacktraces leaked to user
		this.app.use(function (err, req, res, next) {
			res.status(err.status || 500);
			res.render('error', {
				message: err.message,
				error: {}
			});
		});

		this.ClassModel = require(GLOBAL.dirRoot + "/modules/noeud/modele");
		this.ClassCollection = require(GLOBAL.dirRoot + "/modules/noeud/controleur");

		this.app.get("/", function (req, res) {
			res.send("papaaaa");
			//res.send(controleur.accueil());
		});
		this.app.get("/accueil", function (req, res) {
			res.send("papaaaa");
		});
		this.app.get("/admin", function (req, res) {
			res.send("papaaaa");
		});
		//this.app.get("/admin", res)
	}

	// si on veut que cette classe herite de la classe Route du framework //
	Route.prototype = Object.create(GLOBAL.serveur.mvc.route.prototype);

	exports.Route = Route;
}(exports));
