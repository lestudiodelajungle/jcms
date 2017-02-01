var Router = require("../mvc/Router");
var should = require('should');
var express = require("express");

describe('la classe Router', function () {
    var app;
    var router;
    before(function () {
        app = express();
        router = new Router(app, {}, "page")
    });
    // test addRouter
    it('créer un nouveau router', function () {
        router.addRouter("unRouter");

        router.router.unRouter.should.be.equal(new express.Router);
    });
    // test initRouter
    it('doit initialiser un router express et l\'attacher à l\'app', function () {
        var listRoutes = [
            ["get", "/index", this.controler.index]
        ];

        router.initRouter("unRouter", listeRoutes, "base");

    });
    // ajoute une route à un router
    it('ajoute une route à un router', function () {

    })
});
