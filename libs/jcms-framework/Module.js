/*jslint newcap: true, nomen: true, plusplus: true, sloppy: true*/
/*globals exports, require, dirRoot, console, RSVP, rsvp, fs, promises, __dirname*/
(function () {
    'use strict';
    var rsvp = require("rsvp"),
        express = require('express');
    class Module {
        constructor(name, app) {
            this.name = name;
            this.app = app;
            var Controler = require(dirRoot+"/modules/" + this.name + "/controler");
            var Router = require(dirRoot+"/modules/" + this.name + "/router");
            this.configTemplate();
            this.controler = new Controler(this.menuAdmin);
            this.router = new Router(this.app, this.controler, "");
            this.app.use(express.static(this.getPath() + '/public'));
            this.app.use(express.static(this.getPath() + '/admin'));
            var tt = this.app.get('views') + "," + this.getPath() + '/public/view/';
            this.app.set('views', tt.split(",")); // la ou sont les vues
            this.menuAdmin = {};
        }

        // relie un router à l'app express
        useRouter() {
            this.app.use("/" + this.name, this.router.default);
//            this.app.use("/api/" + this.name, this.router.rest);
        }

        // rajoute un router à un autre router
        addRouter(){

        }
        // recupere le menu admin
        getAdminMenu(){
            console.log(this);
            return this.router.listRouteAdmin;
        }
        addToAdminPanel() {

        }
        createDatabase() {

        }
        // renvoie le chemin du dossier du module
        getPath() {
            return dirRoot + '/modules/' + this.name;
        }
        initDatabase() {

        }
        install() {

        }
        removeDatabase() {

        }
        removeToAdminPanel() {

        }
        restart() {

        }
        start() {
            console.log("start : " + this.name);
            if (this.router) {
                this.initRoute("default", this.listRouteDefault);
            } else {
                console.log("pas de route pour ce module")
            }
        }
        screenTop() {

        }
        uninstall() {

        }
    }
    exports.Module = Module;

}());
