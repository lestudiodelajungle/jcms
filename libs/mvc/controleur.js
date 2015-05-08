/*globals require, module, console*/
function Controleur(modele) {
    "use strict";
    this.modele = require(GLOBAL.dirRoot + "/serveur/modele/" + this.nom);
}

Controleur.prototype.connect = function (base) {
    "use strict";
    return this.modele.connect(base);
};

Controleur.prototype.from = function(table){
    "use strict";
    this.modele.from(table);
};

Controleur.prototype.create = function (data) {
    "use strict";
    this.modele.create(data);
};

Controleur.prototype.selectWhere = function (clause) {
    "use strict";
    return this.modele.selectWhere(clause);
};

Controleur.prototype.selectAll = function () {
    "use strict";
    return this.modele.selectAll();
};

Controleur.prototype.updateWhere = function (clause, data) {
    "use strict";
    this.modele.updateWhere(clause, data);
};

Controleur.prototype.updateAll = function (clause, data) {
    "use strict";
    this.modele.updateAll(clause, data);
};

Controleur.prototype.deleteWhere = function (clause) {
    "use strict";
    this.modele.deleteWhere(clause);
};

Controleur.prototype.deleteAll = function (data) {
    "use strict";
    this.modele.deleteAll(data);
};

module.exports.Controleur = Controleur;
