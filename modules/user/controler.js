// module controller page
/*globals require, global, module, define, log*/
"use strict";
var controler = require('jcms-framework').Controler;

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
