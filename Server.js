/////////////////////////////// v2 /////////////////////////////////////
///////////////////////////////////////////////////////////////////////
// twop: the world online project
// réalisé par: séverin parthenay
// version: developpement
/////////////////////////////////////////////////////////////////////////
/*jslint nomen: true, devel: true */
/*globals require, process, __dirname, code*/

function Serveur() {
    "use strict";
    /*globals require*/
    this.ejs = require('ejs');
    // engine = require('ejs-locals'),
    this.url = require("url");
    this.http = require('http');
    this.fs = require("fs"); // acces aux fichier
    //sio = require('socket.io-sessions'), // session par socket
    this.express = require('express');
    //this.bodyParser = require('body-parser'),
    //this.methodOverride = require('method-override'),
    this.CONFIG = require(__dirname + "/config/config.json"); // on charge la config
    this.Noeud = require(__dirname + "/serveur/classe/Noeud");
    this.lesNoeuds = {};
    //stockage local
    this.store = {};
    this.s = this.store;
}

// initialise les variable et la config du serveur
Serveur.prototype.init = function () {
    "use strict";
    var i, unNoeud;
    this.app = this.express();
    this.configure();
    this.noeuds = require(__dirname + "/config/noeuds.json");

    //this.test2(); /// TEST

    //integre tout les script de rootage
    for (i in this.noeuds) {
        if (this.noeuds.hasOwnProperty(i)) {
            this.lesNoeuds[i] = new this.Noeud(this.noeuds[i], this.app);
        }
    }

    this.start();
};

//////////////////////////////// Configuration du serveur //////////////////////////////////
Serveur.prototype.configure = function () {
    "use strict";
    // this.register('.html', require('ejs'));

    this.app.engine('html', this.ejs.__express);
    this.app.set('views', __dirname + '/www/view'); // la ou sont les vues
    this.app.use(this.express.static(__dirname + '/www'));
    // this.app.set('view engine', 'html');
    // this.app.engine('html', this.ejs.renderFile);

    this.app.set('view engine', 'html'); // On utilise le moteur de template "EJS"
    this.app.set('view options', { // on peut definir quelque variable, app.title -> twop
        layout: "/home/severin/web/cms/www/view/layout.ejs"
        //page: 'truc',
        //title: 'twop'
    }); // Dans tous nos templates
    // this.use(express.multipart({ uploadDir= "public" }));
    //this.app.use(this.bodyParser()); // parser les valeur de formulaire
    //app.use(express.favicon(__dirname + '/www/public/images/favicon.ico')); // le favicon
    //app.use(express.methodOverride());
    //app.use(app.router);
};

///////////// demarage du serveur /////////
Serveur.prototype.start = function () {
    "use strict";
    var server = this.app.listen(3000, '0.0.0.0', function () {
        console.log("Serveur express démarré à l'adresse %s sur le port %d", server.address().address, server.address().port);
    });
    this.server = server;
};

Serveur.prototype.socket = function () {
    "use strict";
    this.io = require('socket.io').listen(this.server);
    this.io.sockets.on('connection', function () { /*parametre: socket*/
        console.log("test");
    });
};



Serveur.prototype.module_exist = function (name) {
    "use strict";
    try {
        require(name);
    } catch (err) {
        if (err.code === 'MODULE_NOT_FOUND') {
            return false;
        }
    }

    return true;
};

Serveur.prototype.test = function () {
    "use strict";
    var mongoose = require('mongoose');

    mongoose.connect('mongodb://localhost/site', function (err) {
        if (err) {
            throw err;
        }
    });

    var schemma = new mongoose.Schema({
        "meta": {
            "charset": String,
            "description": String,
            "title": String,
            "favicon": String,
            "meta_key": Array
        },
        "template": {
            "layout": String,
            "head": String,
            "header": String,
            "body": String,
            "footer": String
        },
        "css": Array,
        "javascript": Array
    });

    var modele = mongoose.model('page', schemma);


    // On crée une instance du Model
    var monCommentaire = new modele({
        "meta": {
            "charset": "utf-8",
            "description": "un projet de jeux en ligne (massivement) multijoueur avec un editeur de carte et de skin",
            "title": "world online project",
            "favicon": "image/favicon.ico"
        },
        "template": {
            "layout": "layout",
            "head": "head",
            "header": "header",
            "body": "accueil",
            "footer": "footer"
        },
        "css": [
            "theme_twop"
        ],
        "javascript": [
            "ejs",
            "backbone-localstore",
            "socket.io",
            "jquery",
            "undescore",
            "backbone",
            "model",
            "route",
            "view",
            "script"
        ]
    });

    // On le sauvegarde dans MongoDB !
    monCommentaire.save(function (err) {
        if (err) {
            throw err;
        }
        console.log('Commentaire ajouté avec succès !');
        // On se déconnecte de MongoDB maintenant
    });

    var query = modele.find(null);
    // peut s'écrire aussi query.where('pseudo', 'Atinux').limit(3);
    query.exec(function (err, comms) {
        if (err) {
            throw err;
        }
        // On va parcourir le résultat et les afficher joliment
        console.log(comms);
    });

    //    var rtest = require(global.dirRoot + "/serveur/database/mongodb");
    //    var test = new rtest.MongoDB("site");
    //    test.connect();
    //    test.new("page", schemma);
    //    test.getAll()
    //    var truc = test.db;
    console.log("test444 : ");
    //test.db = "tesst";
};

Serveur.prototype.test2 = function () {
    "use strict";
    var mongoose = require('mongoose');

    var schemma = new mongoose.Schema({
        "meta": {
            "charset": String,
            "description": String,
            "title": String,
            "favicon": String,
            "meta_key": Array
        },
        "template": {
            "layout": String,
            "head": String,
            "header": String,
            "body": String,
            "footer": String
        },
        "css": Array,
        "javascript": Array
    });

    var rtest = require(global.dirRoot + "/serveur/database/mongodb");
    var test = new rtest.MongoDB("site");
    test.connect();
    test.new("page", schemma);
    test.getAll();
};

GLOBAL.dirRoot = __dirname;
GLOBAL.serveur = serveur = new Serveur();
serveur.init();
