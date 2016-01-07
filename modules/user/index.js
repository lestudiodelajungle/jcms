///*globals module, require, console, dirRoot, exports, __dirname*/
var classModule = require('jcms-framework').Module;
var ctl = require("./controler");
var mdl = require("./model");
var router = require("./router");
var express = require('express');

class User extends classModule {
    constructor(app) {
        super("user", app); // pour appeler le construceur parent, y'en a besoin sinon this n'est pas definis
        this.model = new mdl();
        this.controler = new ctl(this.model);
        this.router = new router(this.controler, app.auth);

        this.app.use("/user/login", function (req, res, next) {
            console.log("peritti");

            next();
        });
    }
};

module.exports = User;
