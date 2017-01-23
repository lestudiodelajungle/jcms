/*jslint nomen: true, devel: true */
/*globals module, require, console, __dirname, GLOBAL, exports*/
(function (exports) {
    "use strict";
    var express = require('express');
    class Router {
        constructor(app, controler, url) {
            this.app = app;
            this.controler = controler;
            this.url = url;
            this.router = {};
            this.router.default = express.Router();
            this.router.restfull = express.Router();
            this.router.admin = express.Router();
        }
        // create all route for a specified router
        initRouter(router, list, baseUrl) {
            var baseUrl = baseUrl || "";
            for (var i = 0; i < list.length - 1; i++) {
                var route = list[i];
                this.addRoute(router, route[0], route[1], route[2]);
            }
            this.app.use("/"+baseUrl, this.router.default);
        }
        // create new router
        addRouter(name){
            if(this.router[name] == "undefined"){
                this.router[name] = express.Router();
            }
        }
        // add route into a specified router
        addRoute(router, type, url, action) {
            router[type](url, action);
        }
        // remove all route of a specified router
        stopAllRoute(router) {

        }
    }
    exports.Router = Router;
}(exports));
