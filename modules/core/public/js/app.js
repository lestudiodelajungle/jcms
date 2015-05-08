function App() {
    "use strict";
    this.io;
    this.socket;
    this.lesNoeuds = {};



    this.init();
}

App.prototype.init = function () {
    "use strict";


};

App.prototype.getNoeud = function (nom /*chaine*/ ) {
    "use strict";

};

App.prototype.newNoeud = function (form /*objet DOM du formulaire*/) {
    "use strict";

};

App.prototype.addNoeud = function (noeud) {
    "use strict";
    this.lesNoeuds[noeud.nom] = noeud;
};

App.prototype.enregistrerNoeud = function () {
    "use strict";

};

// regarde si un noeud est charger
App.prototype.siExiste = function () {
    "use strict";

};

// liste les noeud present
App.prototype.listeNoeud = function () {
    "use strict";

};
