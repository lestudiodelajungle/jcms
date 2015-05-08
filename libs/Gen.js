/*global document, console, alert*/
/*
	le modèle représente les attribut du nœud,
	et le mieux serai d'utiliser des modèle backbone


	================== les méthodes a traité au minimum ===================
	- get nœud			récupère un nœud
	- get nœud id		récupère le nœud de l'id correspondant
	- get nœud where	récupère les nœuds correspondant a la clause where
	- post nœud		créer une nouvelle entité de nœud
	- put id			modifie le nœud "id"
	- delete id			supprime le nœud "id"
	======================================================================
*/
// Génère un nœud
function Gen(nom, model, selecteur) {
	"use strict";
	var ifData = false;

	this.selecteur = selecteur;

	return {
		nom: "",
		modele: model

	};
}

Gen.prototype.all = function () {
	"use strict";
	return {
		"modele": this.modele(),
		"collection": this.collection(),
		"route": this.route(),
		"vue": this.vue()
	};
};


Gen.prototype.collection = function () {
	"use strict";

};

Gen.prototype.modele = function () {
	"use strict";
	function Modele() {
		"use strict";
		this.table = "cms";
		var r = require("../database/");
		this.bdd = new r.Database(this.table);
		this.base = "site";
		this.table = "page";
	}

	Modele.prototype.select = function (id) {
		"use strict";
		this.bdd.connect(this.base);
		var result = this.bdd.select(this.table, id);
		this.bdd.close();
		return result;
	};

	Modele.prototype.selectWhere = function (clause) {
		"use strict";
		this.bdd.connect(this.base);
		var result = this.bdd.selectWhere(this.table, clause);
		this.bdd.close();
		return result;
	};

	Modele.prototype.selectAll = function () {
		"use strict";
		this.bdd.connect(this.base);
		return this.bdd.selectAll(this.table);
	//    this.bdd.close();
	//    return result;
	};

	Modele.prototype.update = function (id, data) {
		"use strict";
		this.bdd.connect(this.base);
		this.bdd.update(id, data);
		this.bdd.close();
	};

	Modele.prototype.create = function (data) {
		"use strict";
		this.bdd.connect();
		this.bdd.create(data);
		this.bdd.close();
	};

	Modele.prototype.delete = function (id) {
		"use strict";
		this.bdd.connect();
		this.bdd.delete(id);
		this.bdd.close();
	};
};

Gen.prototype.route = function () {
	"use strict";
	this.selecteur = this.selecteur || "id"; // "id" ou "nom" ou autre; optionnel
	var that;
	var fonction = function (controleur, app) {
		this.app = app;
		this.controleur = controleur;
		that = this;
	};

	fonction.prototype.app.route("/" + this.nom + "/:" + this.selecteur + "?")
		.get(function (req, res) {
			var select = req.params[this.selecteur],
				data = that.controleur.select(select);

			if (select == "") {
				select = "all";
			}

			console.log("select: -" + select + "-");

			if (select == "all") {
				console.log("toute les noeuds");
				data = new Promise(function (resolve) {
					resolve(that.controleur.selectAll());
				});
			} else {
				data = new Promise(function (resolve) {
					resolve(that.controleur.select(select));
				});
			}

			data.then(function (truc) {
				console.log(truc);
				res.send(truc);
			});
		})
		.post(function (req, res) { // accept POST request on the homepage
			console.log('Got a POST request' + res);
			that.controleur.create(req.param(this.selecteur));
		})
		.put(function (req, res) { // accept PUT request at /user
			console.log('Got a PUT request at /user');
			var page = req.params.id || "all";

			if (page == "all") {
				that.controleur.updateAll(res.data);
			} else {
				that.controleur.update(page, res.data);
			}

		})
		.delete(function (req, res) { // accept DELETE request at /user
			console.log('Got a DELETE request at /user');
			var page = req.params.id || "all";

			if (page == "all") {
				that.controleur.deleteAll();
			} else {
				that.controleur.delete(res.page);
			}
		});
	return fonction;
};

Gen.prototype.vue = function () {
	"use strict";

};
