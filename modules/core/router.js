/*globals require, GLOBAL, exports, log, dirRoot*/
"use strict";
var router = framework.Router;

class Router extends router {
    constructor(app, controler, url) {
        super(app, controler, url);

        this.listRouteDefault = [
            ["get", "/index", this.controler.index]
        ];

        this.listRouteAdmin = [
            ["get", "/reglages", this.controler.admin] //TODO
        ];
    }
}

module.exports = Router;
