////////////////////////////////////////////////////////////////////////////////
//             exemple pris sur internet
////////////////////////////////////////////////////////////////////////////////
function get(url) {
    "use strict";
    // Renvoie une nouvelle promesse.
    return new Promise(function (resolve, reject) {
        // Fais le boulot XHR habituel
        var req = new XMLHttpRequest();
        req.open('GET', url);

        req.onload = function () {
            // Ceci est appelé même pour une 404 etc.
            // aussi vérifie le statut
            if (req.status == 200) {
                // Accomplit la promesse avec le texte de la réponse
                resolve(req.response);
            } else {
                // Sinon rejette avec le texte du statut
                // qui on l’éspère sera une erreur ayant du sens
                reject(Error(req.statusText));
            }
        };

        // Gère les erreurs réseau
        req.onerror = function () {
            reject(Error("Erreur réseau"));
        };

        // Lance la requête
        req.send();
    });
}


get('story.json').then(function (response) {
    "use strict";
    console.log("Succès !", response);
}, function (error) {
    "use strict";
    console.error("Échec !", error);
});
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//------------ classe A -----------------------------
function bdd(param) {

}

bdd.prototype.getAll = function () { // retourne une promesse
    return new Promise(function (resolve, reject) {
        // code asynchrone a executé
    });
}
//---------------- classe B ------------------------------------------
function modele() {
    // attribut
}

modele.prototype.getAll = function () {
    var bdd = new bdd();
    bdd.connect();
    var result = bdd.getAll(); // result est une promesse

    return new Promise(result); // retourne la promesse
}

//---------------- classe C ------------------------------------------
function controleur() {
    // attribut
}

controleur.prototype.getAll = function () {
    var modele = new modele();
    modele.getAll();
    var result = test.getAll(); // result est une promesse

    return new Promise(result);
}

//--------------- MAIN ------------------------------------------------
var controle = new controleur();
controle.connect();

controle.getAll().then(function (response) {
    "use strict";
    console.log("Succès !", response);
}, function (error) {
    "use strict";
    console.error("Échec !", error);
});
//--------------------------------------------------------------
