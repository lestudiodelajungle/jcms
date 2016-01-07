// module controller page
/*globals require, global, module, define, console*/
(function (global, module, require, undefined) {
    "use strict";

    var Backbone = require('backbone'),
        Page = Backbone.Model.extend({
            url: 'mongodb://localhost:27017/jcms'
        });

    Page.prototype.sync = require('backbone-mongo').sync(Page);


    if (typeof module !== "undefined" && module.exports) {
        module.exports = Page;
    }
}((global || window), (module || "undefined"), (require || "undefined")));
