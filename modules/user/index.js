///*globals module, require, log, dirRoot, exports, __dirname*/
var Module = framework.Module;
var Model = framework.Model;
var ctl = require("./controler");
//var mdl = require("./model");
var router = require("./router");

class User extends Module {
    constructor(app, db) {
        super("user", app); // pour appeler le construceur parent, y'en a besoin sinon this n'est pas definis
        this.model = new Model(db, "user");
        this.controler = new ctl(this.model);
        this.router = new router(app, this.controler, this.name, app.auth);

        this.app.use("/user/login", function (req, res, next) {
            log.log("peritti");

            next();
        });
    }
};

module.exports = User;
