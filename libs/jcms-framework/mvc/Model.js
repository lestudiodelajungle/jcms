/*jslint nomen: true, es5: true*/
/*globals Backbone, require, console, dirRoot, exrts */
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
var MongoClient = require('mongodb').MongoClient;

class Model {
    constructor(name) {
        // promises
        this._db;
        this._col;
        this.name = name;
    }
    connect(base = this.name) {
        // Connection URL. This is where your mongodb server is running.
        let url = "mongodb://localhost:27017/" + base;
        //        let that = this;
        console.log("1");
        this._db = new Promise((resolve, reject) => {
            // Use connect method to connect to the Server
            MongoClient.connect(url, (err, db) => {
                if (err) {
                    console.log("2 connection mongodb !!");
                    reject(err);
                } else {
                    //                    this.db = db;
                    console.log("2 connection mongodb !!");
                    resolve(db);
                }
            });
        });
        return this;
    }
    getDB() {
        return this._db;
    }
    deconnect() {
        if (this.db) {
            return this.db.close();
        }
    }
    select(name) {
        this.collection = name;
        return this;
    }
    getId(id) {
        return this._db.then((db) => {
            console.log("this._col");
            var col = db.collection(this.collection);
            var res = col.findOne({
                "_id": id
            });
            return res;
        });
    }
    getOne(data) {
        return this._db.then((db) => {
            console.log("this._col");
            var col = db.collection(this.collection);
            var res = col.findOne(data);
            return res;
        });
    }
    getWhere(query) {
        return this._db.then((db) => {
            console.log("this._col");
            var col = db.collection(this.collection);
            var res = col.find({}).toArray();
            return res;
        });
    }
    getAll() {
        return this._db.then((db) => {
            console.log("this._col");
            var col = db.collection(this.collection);
            var res = col.find({}).toArray();
            return res;
        });
    }
    create(data) {
        this._db.then((db) => {
            return this._db.collection.save(data);
        });
    }
    update(id, data) {
        this._db.then((db) => {
            return this._db.collection.updateOne({
                "_id": id
            }, data);
        });
    }
    delete(data) {
        this._db.then((db) => {
            return this._db.collection.delete(data);
        });
    }
}
module.exports = Model;
