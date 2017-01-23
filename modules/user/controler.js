// module Controler page
/*globals require, global, module, define, log*/
"use strict";
var controler = framework.Controler;

class Controler extends controler {
    constructor(model) {
        super();
        this.model = model;
    }
    connectUser() {
        this.model.getUser(id);
    }
}
module.exports = Controler;
