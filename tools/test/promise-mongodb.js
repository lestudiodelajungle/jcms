/*globals require, app, module, console*/
function Database() {
    "use strict";
    var config = require(GLOBAL.dirRoot + "/config/config.json");
    console.log("labase : " + config.db);
    switch (config.db) {
    case "mysql":
        console.log("base de donnée: MySQL");
        break;
    case "mongodb":
        this.driver = require(GLOBAL.dirRoot + "/serveur/database/mongodb");
        this.bdd = new this.driver.MongoDB("site");
        console.log("base de donnée: MongoDB, Table: " + this.bdd.db);
        break;
    case "sqlite":
        console.log("base de donnée: SQLite");
        break;
        //console.log("base de donnée: MongoDB");
    }

    //console.log("base de donnée: ");
}

Database.prototype.connect = function () {
    "use strict";
    console.log("test2 : " + this.bdd.time);
    this.bdd.connect();
};

// insert
Database.prototype.create = function (p_table, p_data) {
    "use strict";
    var data = p_data,
        table = p_table;
    this.bdd.create(table, data);
};

Database.prototype.select = function (id) {
    "use strict";
    this.bdd.new("page");
    return this.bdd.get(id);
};

Database.prototype.selectWhere = function (table, clause) {
    "use strict";
    this.bdd.get(table, clause);
};

Database.prototype.selectAll = function (p_table) {
    "use strict";
    var table = p_table;
    this.bdd.connect();
    this.bdd.new(table);

    this.bdd.getAll().then(function (response) {
        "use strict";
        console.log("Succès !", response);
    }, function (error) {
        "use strict";
        console.error("Échec !", error);
    });
};

Database.prototype.update = function (table, id, data) {
    "use strict";
    this.bdd.update(table, id, data);
};

Database.prototype.updateAll = function (table, clause, data) {
    "use strict";
    console.log("pas encore dispo");
};

Database.prototype.delete = function (id) {
    "use strict";
    this.bdd.delete(id);
};

Database.prototype.deleteAll = function (table) {
    "use strict";
    this.bdd.deleteAll(table);
};

Database.prototype.close = function () {
    "use strict";
    this.bdd.close();
};

module.exports.Database = Database;
