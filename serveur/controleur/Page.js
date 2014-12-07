/*globals require, module, console*/
function Controleur(modele) {
    "use strict";
    this.modele = modele;
}

Controleur.prototype.select = function (id) {
    "use strict";
    return this.modele.select(id);
};

Controleur.prototype.selectWhere = function (clause) {
    "use strict";
    return this.modele.selectWhere(clause);
};

Controleur.prototype.selectAll = function () {
    "use strict";
    return this.modele.selectAll();
};

Controleur.prototype.update = function (id, data) {
    "use strict";
    this.modele.update(id, data);
};

Controleur.prototype.create = function (data) {
    "use strict";
    this.modele.create(data);
};

Controleur.prototype.delete = function (id) {
    "use strict";
    this.modele.delete(id);
};

module.exports.Controleur = Controleur;