/*globals require, console*/
function mysql(db) {
    "use strict";
    this.mysql = require('mysql');
    this.connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'sev1598753',
        database: db
    });
}

mysql.prototype.create = function () {
    "use strict";
    var post = {
            id: 1,
            title: 'Hello MySQL'
        },
        query = this.connection.query('INSERT INTO posts SET ?', post, function (err, result) {
            // Neat!
        });
    console.log(query.sql);
};

mysql.prototype.selectOne = function (table, id) {
    "use strict";
    this.connection.connect();

    this.connection.query('SELECT * FROM ' + table + " WHERE id=" + id, function (err, rows, fields) {
        if (err) {
            throw err;
        }
    });

    this.connection.end();
};

mysql.prototype.selectAll = function (table) {
    "use strict";
    this.connection.connect();

    this.connection.query('SELECT * FROM ' + table, function (err, rows, fields) {
        if (err) {
            throw err;
        }
    });

    this.connection.end();
};

mysql.prototype.update = function (table, id, data) {
    "use strict";
    this.connection.connect();

    var i,
        req = "UPDATE " + table + " SET title = :title";
    for (i in data) {
        req += i + " = :" + i + ",";
    }
    sql = sql.substring(0, sql.length - 1);

    this.connection.query(sql, data);

    this.connection.end();
};

mysql.prototype.delete = function () {
    "use strict";
    this.connection.end();
};



/*

    //===================== CONNECTION A LA BASE DE DONNEE =======================//
    if (this.CONFIG.db === "mongodb") { //==================== connection mongoDB
        console.log("");
    } else if (this.CONFIG.db === "mysql") { //================= connection MySQL
        var mysql = require('mysql'); //chargement du module mysql
        this.connection = mysql.createConnection({ // identifient MySQL
            host: 'localhost',
            user: 'root',
            password: 'lajungle',
            database: 'blog_jw'
        }).connect(function (err) { // connexion a la base de donnée mysql
            if (err) {
                console.log("Échec de la connexion avec le serveur mysql \n" +
                    "code - " + err.code + "\n   résolution - démarrez le serveur mysql");
            } else {
                console.log('Connection avec le serveur mysql etabli');
            }
        });
    } else {
        console.warn("aucune base de donnée selectionné");
    }
    
    */