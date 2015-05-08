/*globals module,Backbone */
var Backbone = require("backbone");

Backbone.Validation = require("backbone-validation");

var _ = require("underscore");

Modele = Backbone.Model.extend({
    urlRoot: 'mongodb://localhost:27017/',
    schema: {},
    nom: "",
    initialize: function (nom) {
        "use strict";
        // valorise le schema
        //console.log(nom);
        this.nom = nom;
        this.schema = require("schema/" + this.nom);
    },
    validate: function (attrs, options) {
        "use strict";
    }
});

_.extend(Backbone.Validation.validators, function type(value, attr, customValue, model) {
    "use strict";
    console.log("valeur : "+value);
    console.log("attr : "+attr);
    console.log("custom : "+customValue);
});

module.exports.Modele = Modele;
