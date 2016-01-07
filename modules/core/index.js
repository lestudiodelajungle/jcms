/*jslint nomen: true, es5: true*/
/*globals module, require, console, dirRoot, __dirname, exports*/
var classModule = require('jcms-framework').Module;
var ctl = require("./controler");
var router = require("./router");
var express = require('express');

class Core extends classModule {
    constructor(app) {
        super("core", app); // pour appeler le construceur parent, y'en a besoin sinon this n'est pas definis
        this.controler = new ctl();
        this.router = new router(this.controler);
    }
};

module.exports = Core;
