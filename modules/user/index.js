/*jslint nomen: true, es5: true*/
/*globals module, require, console, dirRoot, exports, __dirname*/

//module.exports.Route = require("./routes").Route;
var Module = require(dirRoot + "/libs/module").Module;

function User(app) {
	"use strict";
    Module.call(this);
	this.app.set('views', __dirname + '/public/view/');
	this.app.use(this.express.static(__dirname + '/public'));

	this.router.get('/user/:id?', function (req, res) {
		console.log(req.params.id);
		//res.render(req.param.id);
		res.render(req.params.id);
	});

	this.app.use('/user', this.router);
}

User.prototype = Object.create(Module.prototype);
User.prototype.constructor = User;

exports.Module = User;
