/*globals require, describe, it*/

var assert = require("assert");
var model = require("../model");

describe('le modele page', function () {
    "use strict";
    it('doit pouvoir créer un objet backbone', function () {
        var unePage = new model({title: "popo", contenu: "polpoplpo"});
        unePage.sync();
    });
});
