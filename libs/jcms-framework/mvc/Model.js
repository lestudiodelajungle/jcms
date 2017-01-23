/*jslint nomen: true, es5: true*/
/*globals Backbone, require, console, dirRoot, exrts */




module.exports.Model = function (name, schema) {
    'use strict';
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    var nodeSchema = new Schema(schema);

    return mongoose.model(name, nodeSchema);
};
