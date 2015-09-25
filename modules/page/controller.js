// route du module core
/*globals require, GLOBAL, exports*/
(function (exports) {
    "use strict";

    function Page() {
        this.mongoose = require('mongoose');
        this.model = this.mongoose.model('Page');

    }

    Page.prototype.display = function () {

    };

    Page.prototype.new = function () {

    };

    Page.prototype.modify = function () {

    };

    Page.prototype.update = function () {

    };

    Page.prototype.delete = function () {

    };

    Page.prototype.create = function () {

    };

    exports.Page = Page;
}(exports));
