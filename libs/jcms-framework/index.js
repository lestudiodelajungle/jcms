/*jslint nomen: true, es5: true*/
/*globals global, exports, require, alert, dirRoot, console, rsvp, fs, promises, __dirname*/
(function (exports) {
    "use strict";
    global.dirRoot = "/home/severin/web/jcms";
    exports.dirRoot = "/home/severin/web/jcms";
    exports.Object = require('./Object').Object;
    exports.Module = require("./Module").Module;
    exports.Schema = require("./mvc/Schema").Schema;
    exports.Model = require("./mvc/Model").Model;
    exports.Controler = require("./mvc/Controler").Controler;
    exports.Router = require("./mvc/Router").Router;
    exports.Template = require("./mvc/Template").Template;
})(exports);
