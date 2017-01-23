/*globals document*/
function css() {
    "use strict";
    this.liste = {};
}

css.prototype.load = function (nom) {
    "use strict";
    var elem;
    if (!this.liste[nom]) {
        elem = document.createElement("link");
        elem.href = nom + ".css";
        elem.rel = "stylesheet";
        elem.type = "text/css";
        this.liste[nom] = elem;
    }
    document.querySelector("body").appendChild(elem);
};

css.prototype.unload = function (nom) {
    "use strict";
    document.querySelector("body").removeChild(this.liste[nom]);
};

css.prototype.toogle = function (nom) {
    "use strict";
    if(document.querySelector("body[href='" + nom + "']")){
        document.querySelector("body").removeChild(this.liste[nom]);
    }else{
        document.querySelector("body").appendChild(this.liste[nom]);
    }
};
