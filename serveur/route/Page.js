/*
|-----------------------------------------------|
|  TYPE  |    URL    | ACTION                   |
|-----------------------------------------------|
|  GET   | :id?      | affiche la page          |-\____ affiche seulement la page
|  GET   | /         | affiche page d'accueil   |-/     mais renvoie pas de donné
|  GET   | page/     | recupere tte les pages   |
|  GET   | page/:id? | recupere la page         |
|  POST  | page/     | créer une page           |
|  PUT   | page/:id? | modifie une page         |
| DELETE | page/:id? | supprime une page        |
|-----------------------------------------------|
*/
/*jslint nomen: true, devel: true */
/*globals module, require, console, __dirname*/
function Route(controleur, app) {
    "use strict";
    this.controleur = controleur;
    this.EJS = require("ejs");
    var that = this;
    app.get("/:id?", function (req, res) {
        console.log("rest " + req.params.id);
        var page = req.params.id || "accueil",
            data = that.controleur.select(page);

        res.render('page/' + page + '.html', function (err, html) {
            // Second rendu.
            res.render('layout.html', {
                data: data,
                body: html
            });
        });
    });
    app.route("/page/:id?")
        .get(function (req, res) { // respond with "Hello World!" on the homepage
            // Premier rendu.
            var data,
                page = req.params.id,
                data = controleur.select(page);

            if (page == "") {
                page = "all";
            }

            console.log("page: -" + page + "-");
            if (page == "all") {
                console.log("toute les page");
                data = controleur.selectAll();
            } else {
                console.log("page: " + page);
                data = controleur.select(page);
            }
            //console.log(data);
            res.send(data);
        })
        .post(function (req, res) { // accept POST request on the homepage
            console.log('Got a POST request' + res);
            controleur.create(req.param('id'));
        })
        .put(function (req, res) { // accept PUT request at /user
            console.log('Got a PUT request at /user');
            var page = req.params.id || "all";

            if (page == "all") {
                controleur.updateAll(data);
            } else {
                controleur.update(page, data);
            }

        })
        .delete(function (req, res) { // accept DELETE request at /user
            console.log('Got a DELETE request at /user');
            var page = req.params.id || "all";

            if (page == "all") {
                controleur.deleteAll();
            } else {
                controleur.delete(page);
            }
        });
}

Route.prototype.get = function(req, res){
    "use strict";
    
};

Route.prototype.getPage = function(req, res){
    "use strict";
    
};

Route.prototype.postPage = function(req, res){
    "use strict";
    
};

Route.prototype.putPage = function(req, res){
    "use strict";
    
};

Route.prototype.deletePage = function(req, res){
    "use strict";
    
};

module.exports.Route = Route;