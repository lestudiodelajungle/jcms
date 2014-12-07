/*globals module, require*/
module.exports = function (app) {
    "use strict";
    
    var i,
        noeuds = require("../noeuds.json");

    // integre tout les script de rootage
    for (i in noeuds) {
        if (noeuds.hasOwnProperty(i)) {
            require("./" + noeuds[i])(app);
        }
    }
};