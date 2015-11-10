// module controller page
/*globals require, global, module, define, console*/
(function (global, module, require, undefined) {
    "use strict";

    //    if (typeof define !== 'function') {
    //        var define = require('amdefine')(module);
    //    }

    var Backbone = require('backbone'),
        Model = require('./model')(),
        rsvp = require('rsvp'),
        _ = require('underscore'),
        Page = require("jcms-framework").Controller;

    console.log("test = " + module);

    Page = _.extend(Backbone.Collection.extend({
        model: Model
    }), Page);

    if (typeof module !== "undefined" && module.exports) {
        module.exports = Page;
    }
}((global || window), (module || "undefined"), (require || "undefined")));
