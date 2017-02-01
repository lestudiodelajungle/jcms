var Model = require("../mvc/Model");
var should = require('should');

var model;

beforeEach(function () {
    model = new Model("test");
});
describe('la classe Model', function () {
    describe('Model#connect', function () {
        it("doit retourner une promise", function () {
            var p = model.connect("test").then((db)=>{
                (p instanceof Promise).should.be.true();
                db.close();
            });
        });
    });


    describe("Model#getDB", function () {
        //        before(function () {
        //            model.connect("test");
        //        });
        it("doit retourner un object Db", function () {
            console.log("============= ");
            model.connect('test')
                .then(function () {
                    console.log("=============>>> ");
                    model.deconnect();
                    done();
                })
        });
    });


    //    describe("Model#select", function () {
    //        before(function (done) {
    //            t = model.connect("test");
    //            done();
    //        });
    //        it("retourne un object Collection", function (done) {
    //            t.then(function (db) {
    //                model.db = db;
    //                model.select("page").should.be.type("object");
    //                model.deconnect();
    //                done();
    //            });
    //        });
    //    });

    //    describe("Model#create", function () {
    //        before(function (done) {
    //            t = model.connect("test");
    //            done();
    //        });
    //        it("creer un model", function (done) {
    //            t.then(function (db) {
    //                console.log("====> ");
    //                model.db = db;
    //                model.collection = model.select("page");
    //                model.create({
    //                    hello: 'world_no_safe'
    //                });
    //                model.deconnect();
    //                done();
    //            });
    //        });
    //    });
    //    describe("Model#getAll", function () {
    //        before(function (done) {
    //            t = model.connect("test");
    //            done();
    //        });
    //        it("rescuperer tout", function (done) {
    //            t.then(function (db) {
    //                model.db = db;
    //
    //                model.collection = model.select("page");
    //                console.log("res : "+ model.collection);
    ////                done();
    //            })
    //            .then(function(){
    //                model.getAll();
    //            })
    //            .then(function(res){
    //                console.log("===> "+res);
    //                done();
    //            });
    //        });
    //    });
});
