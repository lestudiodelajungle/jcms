/*jslint nomen: true, es5: true*/
/*globals module, require, console, dirRoot, exports, __dirname*/

//module.exports.Route = require("./routes").Route;
var Module = require(GLOBAL.dirRoot + "/libs/module").Module;

function Page(app) {
	"use strict";
    this.name = "page";
    Module.call(this, app);
	this.app.set('views', __dirname + '/public/view/');
	this.app.use(this.express.static(__dirname + '/public'));

	this.router.get('/:id?', function (req, res) {
		console.log(req.params.id);
		//res.render(req.param.id);
		res.render(req.params.id);
	});

	this.app.use('/page', this.router);
}

Page.prototype = Object.create(Module.prototype);
Page.prototype.constructor = Page;

exports.Module = Page;
