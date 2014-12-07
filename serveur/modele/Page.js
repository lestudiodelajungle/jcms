/*globals require, module, console*/
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
    var result = this.bdd.selectAll(this.table);
    this.bdd.close();
    return result;
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

module.exports.Modele = Modele;