/*globals module, require, console, dirRoot, exports, __dirname*/

var classModule = require('jcms-framework').Module,
    ctl = require("./controler"),
    router = require("./router"),
    express = require('express');

class Page extends classModule {
    constructor(app) {
        super("page", app); // pour appeler le construceur parent, y'en a besoin sinon this n'est pas definis
        this.controler = new ctl();
        this.router = new router(this.controler, app.auth);
    }
};
module.exports = Page;
