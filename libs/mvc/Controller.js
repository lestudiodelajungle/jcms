/*globals require, module, console, GLOBAL*/
function Controller(modele) {
	"use strict";
	this.modele = require(GLOBAL.dirRoot + "/serveur/modele/" + this.nom);
}

Controller.prototype.connect = function (base) {
	"use strict";
	return this.modele.connect(base);
};

Controller.prototype.from = function (table) {
	"use strict";
	this.modele.from(table);
};

Controller.prototype.create = function (data) {
	"use strict";
	this.modele.create(data);
};

Controller.prototype.selectWhere = function (query) {
	"use strict";
	return this.modele.selectWhere(query);
};

Controller.prototype.selectAll = function () {
	"use strict";
	return this.modele.selectAll();
};

Controller.prototype.updateWhere = function (query, data) {
	"use strict";
	this.modele.updateWhere(query, data);
};

Controller.prototype.updateAll = function (query, data) {
	"use strict";
	this.modele.updateAll(query, data);
};

Controller.prototype.deleteWhere = function (query) {
	"use strict";
	this.modele.deleteWhere(query);
};

Controller.prototype.deleteAll = function (data) {
	"use strict";
	this.modele.deleteAll(data);
};

module.exports.Controller = Controller;
