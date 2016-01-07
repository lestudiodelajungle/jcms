// module model user
/*globals require, global, module, define, console*/
"use strict";
class Model {
    constructor() {
        this.mongodb = require("mongodb");
        this.mongo = this.mongodb.MongoClient;
        this.url = "mongodb://localhost:27017/jcms";
        this.collection = "";
    }
    connect() {
        var self = this;
        return this.mongo.connect(this.url).then(function (db) {
            self.db = db;
            self.collection = db.collection('user');
            return db;
        });
    }
    close() {
        return this.mongo.close();
    }
    drop() {
        return this.collection.drop();
    }
    getUsers() {
        return this.collection.find().toArray();
    }
    getUser(id) {
        var id = id;
        this.collection = this.db.collection('user');
        return this.collection.findOne({
            "_id": this.mongodb.ObjectID(id)
        });
    }
    addUser(data) {
        return this.collection.insert(data);
    }
    updateUser(data) {
        data._id = this.mongodb.ObjectID(data._id)
        return this.collection.update({
            "_id": data._id
        }, data);
    }
    deleteUser(data) {
        return this.collection.remove(data);
    }
}
module.exports = Model;
