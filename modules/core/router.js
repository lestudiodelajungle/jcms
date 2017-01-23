/*globals require, GLOBAL, exports, log, dirRoot*/
"use strict";
var router = framework.Router;

class Router extends router {
    constructor(app, controler, url) {
        super(app, controler, url);
        log.log("core:router:constructor");

        this.listRouteDefault = [
            ["get", "/index", this.controler.index]
//            ["get","/admin",this.controler.admin]
        ];
        this.listRouteAdmin = [
//            ["get", "/", this.controler.admin],
//            ["get", "/index", this.controler.admin],
            ["get", "/reglages", this.controler.admin] //TODO
        ];
        this.addRouter("admin");

    }
}

module.exports = Router;
