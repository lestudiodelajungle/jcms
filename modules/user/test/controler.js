var should = require('should');

var ctl = require('../controler');
var mdl = require('../model');
var controler = new ctl(new mdl());

describe('la class Controler.User', function () {
    it("recuperer tout les utilisateurs", function (done) {
        return controler.getUsers().then(function (val) {
            val.should.type("object");
            done();
        }).catch(function (err) {
            done(err);
        });
    });
});
