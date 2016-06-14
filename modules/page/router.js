/*globals require, GLOBAL, exports, log, dirRoot*/
var router = require('jcms-framework').Router;
class Router extends router {
    constructor(app, controler, url) {
        super(app, controler, url);
    }
    initRoute() {
        var self = this;
        this.route.get("/test", function (req, res) {
            res.send("<!DOCTYPE html> < html >< head ><!-- En-tête de la page -->< meta charset = 'utf-8' / >< title > Titre < /title> < /head>< body ><!-- Corps de la page -->bla bla bla !!!< /body> < /html>");
        });

        this.route.get("/:id?", function (req, res) {
            var page = (req.params.id == "undefined" ? "accueil" : req.params.id);
            res.render(self.controler.displayPage(page), {
                "title": req.params.id
            });
        });

        this.rest.get("/:id?", function (req, res) {
            res.send(self.controler.getPage(req.params.id));
        });
    }
    initRest() {

    }
}
module.exports = Router;
