/*globals module, require, log, dirRoot, exports, __dirname*/

var Module = require('jcms-framework').Module,
    ctl = require("./controler"),
    router = require("./router");

class Page extends Module {
    constructor(app, db) {
        super("page", app); // pour appeler le construceur parent, y'en a besoin sinon this n'est pas definis
        this.controler = new ctl();
        this.router = new router(this.app, this.controler, this.name);
        console.log("================> " + this.parentNode);
    }
};
module.exports = Page;
