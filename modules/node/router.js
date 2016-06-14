/*globals require, GLOBAL, exports, log, dirRoot*/
var router = require('jcms-framework').Router;
var express = require('express');
class Router extends router {
    constructor(app, controler, url) {
        super(app, controler, url);
    }
    useRoutes() {
        log.info("use route " + this.baseUrl);
        this.useRoute("/" + this.baseUrl, this.initRoute());
        this.useRoute("/api/" + this.baseUrl + "s", this.initRest());
    }
    initRest() {
        var rest = super.initRest();
        var controler = this.controler;
        rest.post("/validate", function (req, res) {
            log.info("validate node");
            res.send(controler.validate(req.body.data, req.body.schema));
        });

        return rest;
    }
    initNodeRoute(name) {
        var controler = this.controler;
        var route = express.Router();
        route.route("/:id?").get(function (req, res) {
            log.info("get all nodes");
            controler.getAll(req.body).then(function (val) {
                res.rend(val);
            });
        }).post(function (req, res) {
            log.info("add new node");
            controler.addNew(req.body).then(function (val) {
                res.rend(val);
            });
        }).put(function (req, res) {
            controler.update(req.body).then(function (val) {
                res.rend(val);
            });
        }).delete(function (req, res) {
            controler.delete(req.body).then(function (val) {
                res.rend(val);
            });
        });
        return route;
    }
    initNodeRest(name) {
        // name = name || this.name;
        var controler = this.controler,
            node = express.Router({
                "mergeParams": true
            });
        node.route('/:ide?').all(function (req, res, next) {
            next();
        }).get(function (req, res) {
            log.info("Router:node:get all nodes " + JSON.stringify(req.params));
            if (req.params.id !== undefined) {
                controler.getOne(req.params.id).then(function (val) {
                    log.info("node get one " + name);
                    res.send(val);
                });
            } else {
                res.send(req.params);
                controler.getAll().then(function (val) {
                    log.info("node get all " + name);
                    res.send(val);
                });
            }
        }).post(function (req, res) {
            log.info("add new node");
            //            controler.addNew(req.body).then(function (val) {
            //                res.send(val);
            //            });
            res.send("ok !!" + req.params.ide);
        }).put(function (req, res) {

            controler.update(req.body).then(function (val) {
                res.send(val);
            });
        }).delete(function (req, res) {
            log.info("delete a node");
            controler.delete(req.body).then(function (val) {
                res.send(val);
            });
        });

        this.rest.use("/:id?/" + name + "s", node);
        log.info("init node rest : " + name.yellow);
        return node;
    }
}
module.exports = Router;
