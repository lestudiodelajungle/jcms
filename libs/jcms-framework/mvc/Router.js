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
        // créer toute les routes pour un router donnée
        initRouter(router, list, baseUrl) {
            var baseUrl = baseUrl || "";
            for (var i = 0; i < list.length - 1; i++) {
                var route = list[i];
                this.addRoute(router, route[0], route[1], route[2]);
            }
            this.app.use("/"+baseUrl, this.router.default);
        }
        // créer un nouveau router
        addRouter(name){
            if(this.router[name] == "undefined"){
                this.router[name] = express.Router();
            }
        }
        // ajoute une route à un router
        addRoute(router, type, url, action) {
            router[type](url, action);
        }
        // remove all route of a specified router
        stopAllRoute(router) {

        }
    }
    exports.Router = Router;
}(exports));
