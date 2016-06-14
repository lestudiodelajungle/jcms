/*jslint nomen: true*/
/*globals module, require, log, dirRoot, __dirname, exports*/
"use strict";
var Module = require('jcms-framework').Module;


var ctl = require("./controler");
var router = require("./router");

var fs = require('fs');

class Core extends Module {
    constructor(name, app, db) {
        super("core", app, db); // pour appeler le construceur parent, y'en a besoin sinon this n'est pas definis
        this.controler = new ctl();
        this.router = new router(this.app, this.controler, this.name);
        log.log("constructeur core");
    }
};

module.exports = Core;
