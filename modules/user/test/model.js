var should = require('should');

var mdl = require('../model.js');
var model = new mdl();

describe('la class Model.User', function () {
    before(function () {
        return model.connect();
    });
    //    beforeEach(function () {
    //        return model.drop();
    //    });
    it("peut ajouter un utilisateur", function () {
        return model.connect().then(function (val) {
            return model.addUser({
                _id: model.mongodb.ObjectID("46836e12e64e2ac426b36bac"),
                name: 'severin parthenay',
                age: 24,
                roles: ['admin', 'moderator', 'god']
            });
        });
    });
    it("peut recuperer tout les utilisateur", function (done) {
        return model.getUsers().then(function (val) {
            val.should.type("object");
            done();
        }).catch(function (err) {
            done(err);
        });
    });
    it("peut recuperer un utilisateur en fonction de l'id", function (done) {
        return model.getUser("46836e12e64e2ac426b36bac").then(function (val) {
            val.should.type("object");
            done();
        }).catch(function (err) {
            done(err);
        });

    });
//    it("peut supprimer un utilisateur", function () {
//        return model.deleteUser({
//            _id: model.mongodb.ObjectID("46836e12e64e2ac426b36bac"),
//            name: 'severin parthenay',
//            age: 24,
//            roles: ['admin', 'moderator', 'god']
//        });
//    });
});
