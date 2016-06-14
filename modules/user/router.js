/*globals require, GLOBAL, exports, log, dirRoot*/
var router = require('jcms-framework').Router;
class Router extends router {
    constructor(app, controler, url) {
        super(app, controler, url);
    }

    initRoute() {
        var controler = this.controler;
        this.route.get("/", function (req, res) {
            controler.getUsers().then(function (val) {
                res.render("liste", val);
            });
        });
        this.route.get("/login", function (req, res) {
            res.render("connect");
        });
        this.route.post("/login", function (req, res) {
            res.render('connect');
        });
        this.route.get("/edit/:id", function (req, res) {
            controler.getUser(req.params._id).then(function (val) {
                res.render("edit", val);
            });
        });
        this.route.get("/liste", function () {
            controler.getUsers().then(function (val) {
                res.render("liste", val);
            });
        });
    }
}
module.exports = Router;
