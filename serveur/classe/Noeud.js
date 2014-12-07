/*
 * classe noeud de la partie serveur
 *
 * add = enregistrer coté serveur //admin
 * new = créer coté client //admin
 * get = recuperer a partir du serveur
 * sup = supprimer du serveur //admin
 *
 */
/*
    modifier un noeud:
        quoi: modele, controleur, ou route
        la donnée



*/
function Noeud(nom, app) {
    "use strict";
    this.nom = nom;
    this.nomFormat = this.nom.replace(/^./g, this.nom.substr(0,1).toUpperCase())
    this.type = {};
    this.fichier = {};
    this.fichier.modele = require(GLOBAL.dirRoot + "/serveur/modele/" + this.nomFormat);
    this.fichier.collection = require(GLOBAL.dirRoot + "/serveur/controleur/" + this.nomFormat);
    //this.fichier.vue = require(GLOBAL.dirRoot + "/www/view/" + this.nomFormat);
    this.fichier.route = require(GLOBAL.dirRoot + "/serveur/route/" + this.nomFormat);   

    this.modele = new this.fichier.modele.Modele();
    this.collection = new this.fichier.collection.Controleur(this.modele); // ou controlleur
    this.vue = {};
    this.routes = new this.fichier.route.Route(this.collection, app);
}

Noeud.prototype.init = function () {
    "use strict";

};

Noeud.prototype.save = function () {
    "use strict";

};

Noeud.prototype.newModele = function (modele) {
    "use strict";

};

Noeud.prototype.getModele = function (nom) {
    "use strict";

};

Noeud.prototype.addModele = function (nom) {
    "use strict";

};

Noeud.prototype.supModele = function (nom) {
    "use strict";

};

Noeud.prototype.newCollection = function (collection) {
    "use strict";

};

Noeud.prototype.getCollection = function (nom) {
    "use strict";

};

Noeud.prototype.addCollection = function (nom) {
    "use strict";

};

Noeud.prototype.supCollection = function (nom) {
    "use strict";

};

Noeud.prototype.newVue = function (vue) {
    "use strict";

};

Noeud.prototype.getVue = function (nom) {

};

Noeud.prototype.addVue = function (nom) {
    "use strict";

};

Noeud.prototype.supVue = function (nom) {
    "use strict";

};

Noeud.prototype.newRoute = function (route) {
    "use strict";

};

Noeud.prototype.getRoute = function (nom) {
    "use strict";

};

Noeud.prototype.addRoute = function (nom) {
    "use strict";

};

Noeud.prototype.supRoute = function (nom) {
    "use strict";

};

module.exports = Noeud;