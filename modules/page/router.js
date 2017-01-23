/*globals require, GLOBAL, exports, log, dirRoot*/
"use strict";
var router = framework.Router;

class Router extends router {
    constructor(app, controler, url) {
        super(app, controler, url);
        log.log("core:router:constructor");

        this.listRouteDefault = [
            ["get", "/page", this.controler.page]
//            ["get","/admin",this.controler.admin]
        ];
        this.listRouteAdmin = [
            ["get", "/page", this.controler.page]
        ];

        this.addRouter("admin");
        this.initRouter(this.router.admin, this.listRouteAdmin, "page"); // a rattacher au route.admin.page

        this.initRouter(this.router.default, this.listRouteDefault, "page"); // a rattacher a route.default.page
    }
}

module.exports = Router;
