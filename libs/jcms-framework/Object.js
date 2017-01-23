/*jslint nomen: true, es5: true*/
/*globals exports, require, dirRoot, console, RSVP, rsvp, fs, promises, __dirname*/
(function (exports) {
	"use strict";
	Object.prototype.toType = function () {
		//console.log(({}).toString.call(this).match(/\s([a-zA-Z]+)/)[1].toLowerCase());
		return ({}).toString.call(this).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
	};
	Object.prototype.exist = function (target) {
		var res;
		if (typeof (target) === "function") {
		    res = true;
		} else {
		    res = false;
		}
		return (res);
	};
	exports.Object = Object;

	// dash to camelCase
	String.prototype.toCamel = function () {
	    return this.replace(/(\-[a-z])/g, function ($1) {
		return $1.toUpperCase().replace('-', '');
	    });
	};
	// camel to dash (or spinal-case)
	String.prototype.toDash = function () {
	    return this.replace(/([A-Z])/g, function ($1) {
		return "-" + $1.toLowerCase();
	    });
	};
	//camel to snake_case
	String.prototype.toUnderscore = function () {
	    return this.replace(/([A-Z])/g, function ($1) {
		return "_" + $1.toLowerCase();
	    });
	};
	exports.String = String;

}(exports));
