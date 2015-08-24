/*jslint nomen: true, es5: true*/
/*globals exports, require, dirRoot, console, RSVP, rsvp, fs, promises, __dirname*/
(function (exports) {
	"use strict";
	function Framework(app) {

	}

    Framework.prototype.toType = function () {
		return ({}).toString.call(this).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
	};

	exports.Module = Framework;
}(exports));
