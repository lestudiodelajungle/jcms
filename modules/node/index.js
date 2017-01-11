///*globals module, require, log, dirRoot, exports, __dirname*/
var Module = require('jcms-framework').Module;
var Model = require('jcms-framework').Model;
var ctl = require("./controler");
//var mdl = require("./model");
var router = require("./router");

class Node extends Module {
    constructor(name, app, db) {
        super("node", app); // pour appeler le construceur parent, y'en a besoin sinon this n'est pas definis
        //this.model = new Model(db, "node");
        this.controler = new ctl(this.model);
        this.router = new router(this.app, this.controler, this.name);
    }
    start() {
        log.info("start module : " + this.name.yellow);
        this.router.useRoutes();

        this.initTpl();
        this.initAllNodes();
    }
    initAllNodes() {
        var self = this;
        this.controler.getAll().then(function (val) {
            for (var i = 0; i < val.length; i++) {
                if (val[i].name != "undefined") {
                    //log.info(val[i]);
                    //self.useRoute("/" + this.name + "/" + val[i].name, this.initNodeRoute());
                    //self.useRoute("/api/" + self.name + "s" + "/node/" + val[i].name, self.router.initNodeRest(val[i].name));
                    log.debug("node:index:name ==> " + val[i].name + " --- " + val.length);
                    self.router.initNodeRest(val[i].name)

                }
            }
        });
    }
};

module.exports = Node;

// this.useRoute("/api/" + this.baseUrl + "s", this.initRest());
