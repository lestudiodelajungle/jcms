/*
    Connection ready state:
        0 = disconnected
        1 = connected
        2 = connecting
        3 = disconnecting
*/
/*globals module, require, console*/
function MongoDB(db) {
    "use strict";
    this.mongoose = require('mongoose');
    this.db = db;
    this.time = new Date().getTime();
    //    this.schemma;
    //    this.modele;
    //    this.donnees;
    //    this.requete;
    console.log("db ==> " + this.db);
}

MongoDB.prototype.connect = function () {
    "use strict";
    this.mongoose = require('mongoose');
    this.bdd = this.mongoose.createConnection('mongodb://localhost/' + this.db, function (err) {
        if (err) {
            throw err;
        }
        // console.log("mongo connect"+  this.bdd.readyState);
    });
    console.log("mongo connect" + this.bdd.readyState);
};

// permet de creer une nouvelle table/model
MongoDB.prototype.new = function (nom, schemma) {
    "use strict";
    // Création du schéma pour les commentaires
    console.log("nom: " + nom);
    this.schemma = schemma || require(__dirname + '/schemma/page').schemma;
    this.modele = this.bdd.model(nom, this.schemma);
};

//ajoute  une entrée dans la table
MongoDB.prototype.create = function (p_modele, p_data) {
    "use strict";
    var modele = p_modele,
        data = p_data;
    this.new(modele);

    this.noeud = new this.modele(data);

    // On le sauvegarde dans MongoDB !
    this.noeud.save(function (err) {
        if (err) {
            throw err;
        }
        console.log('truc ajouté avec succès !');
    });
    console.log("mongo create");
};

MongoDB.prototype.get = function (id) {
    "use strict";
    console.log("mongo get");
    this.connect();
    this.new("test");
    console.log('test ! 1234' + this.modele);
    var resultat,
        query = this.modele.find(null);
    // peut s'écrire aussi query.where('pseudo', 'Atinux').limit(3);
    query.exec(function (err, comms) {
        if (err) {
            throw err;
        }
        // On va parcourir le résultat et les afficher joliment
        console.log("data: "+comms);
    });
    return resultat;
};

MongoDB.prototype.getAll = function () {
    "use strict";
    var res;
    this.modele.find(null, function (err, data) {
        if (err) {
            throw err;
        }
        res = data
        // console.log(data);
        // comms est un tableau de hash
        //return data;
    });
    console.log("trtr "+res);
    return res;
};

MongoDB.prototype.update = function (id, data) {
    "use strict";
    this.modele.update({
        id: id
    }, data, function (err) {
        if (err) {
            throw err;
        }
        console.log('table modifiés !');
    });
};

MongoDB.prototype.updateAll = function (id, data) {
    "use strict";
    this.modele.update({
        id: id
    }, data, function (err) {
        if (err) {
            throw err;
        }
        console.log('table modifiés !');
    });
};

MongoDB.prototype.delete = function (id) {
    "use strict";
    this.modele.remove({
        id: id
    }, function (err) {
        if (err) {
            throw err;
        }
        console.log('enregistrement supprimés !');
    });
};

MongoDB.prototype.deleteAll = function (table) {
    "use strict";
    this.new(table);

    this.modele.remove(function (err) {
        if (err) {
            throw err;
        }
        console.log('enregistrement supprimés !');
    });
};

MongoDB.prototype.close = function () {
    "use strict";
    this.mongoose.connection.close();
};

module.exports.MongoDB = MongoDB;

/////////////////////////////////////////
/*
    a chaque requete on regarde si une connection est deja ouverte
        si oui fait la requete du style clé: valeur
    sinon on connect et on fait la requete

*/
/*
    $.ajax({
       url : 'page',
       type : 'GET',
       dataType : 'json',
       success : function(html, statut){
           console.log(statut);
           console.log(html);
       },

       error : function(resultat, statut, erreur){
         
       },

       complete : function(resultat, statut){

       }

    });
    */