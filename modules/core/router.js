/*globals require, GLOBAL, exports, log, dirRoot*/
"use strict";
var router = require('jcms-framework').Router;

class Router extends router {
    constructor(app, controler, url) {
        super(app, controler, url);
        log.log("core:router:constructor");
    }
    initRoute() {
        var self = this;
        var route = super.initRoute();
        route.get("/", function (req, res) {
            //req.app.set('views', __dirname + '/public/view/');
            res.render("home");
        });
        route.get("/admin", function (req, res) {
            log.log("get admin");
            //req.app.set('views', __dirname + '/public/view/');
            res.render("admin", {
                layout: "layout/admin",
                data: "truc"
            });
        });
        log.log("core:router:initRoutes");
        return route;
    }
    useRoutes() {
        log.log("use route " + this.baseUrl);
        this.app.use("/", this.initRoute());

        log.log("core:router:useRoutes");
    }
    initRest() {
        this.rest = null;
        log.log("core:router:initRest");
    }
}

module.exports = Router;
