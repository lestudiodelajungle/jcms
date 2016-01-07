// module controller page
/*globals require, global, module, define, console*/
"use strict";
class Controler {
    constructor(model) {
        this.model = model;
    }
    connectUser() {
        this.model.getUser(id);
    }
    getUsers() {
        var self = this;
        return this.model.connect().then(function (val) {
            return self.model.getUsers();
        }).catch(function (err) {
            console.log("controler user, lecture impossible : " + err);
        });
    }
    getUser() {
        return this.model.getUser();
    }
    addUser(data) {
        var self = this;
        var data = data;
        return this.model.connect().then(function (val) {
            return self.model.addUser(data);
        }).catch(function (err) {
            console.log("controler user, ajout impossible : " + err);
        });
    }
    updateUser(data) {
        var self = this;
        var data = data;
        return this.model.connect().then(function (val) {
            return self.model.updateUser(data);
        }).catch(function (err) {
            console.log("controler user, modification impossible : " + err);
        });
    }
    deleteUser(data) {
        var self = this;
        var data = data;
        return this.model.connect().then(function (val) {
            return self.model.deleteUser(data);
        }).catch(function (err) {
            console.log("controler user, suppression imposible : " + err);
        });
    }
}
module.exports = Controler;
