/**
 * Very basic CRUD route creation utility for models.
 * For validation, simply override the model's save method.
 */
/*globals exports*/
(function (exports) {
	"use strict";

	function Controlleur(options) {
		this.model = options.model;
		var path,
			app = options.app,
			pathWithId;

		if (!this.app || !this.model) {
			return;
		}

		path = options.path || '/' + this.model.modelName.toLowerCase();
		pathWithId = path + '/:id';

		//		app.get(path, getListController(model));
		//		app.post(path, getCreateController(model));
		//		app.get(pathWithId, getReadController(model));
		//		app.put(pathWithId, getUpdateController(model));
		//		app.del(pathWithId, getDeleteController(model));
	}

	Controlleur.prototype.errMsg = function (msg) {
		return {
			'error': {
				'message': msg.toString()
			}
		};
	};

	//------------------------------
	// List
	//
	Controlleur.prototype.getListController = function (req, res) {
		//console.log('list', req.body);
		this.model.find({}, function (err, result) {
			if (!err) {
				res.send(result);
			} else {
				res.send(this.errMsg(err));
			}
		});
	};

	//------------------------------
	// Create
	//
	Controlleur.prototype.getCreateController = function (req, res) {
		//console.log('create', req.body);
		var m = new this.model(req.body);
		m.save(function (err) {
			if (!err) {
				res.send(m);
			} else {
				res.send(this.errMsg(err));
			}
		});
	};

	//------------------------------
	// Read
	//
	Controlleur.prototype.getReadController = function (req, res) {
		//console.log('read', req.body);
		this.model.findById(req.params.id, function (err, result) {
			if (!err) {
				res.send(result);
			} else {
				res.send(this.errMsg(err));
			}
		});
	};

	//------------------------------
	// Update
	//
	Controlleur.prototype.getUpdateController = function (req, res) {
		//console.log('update', req.body);
		this.model.findById(req.params.id, function (err, result) {
			var key;
			for (key in req.body) {
				if (req.body.hasOwnProperty(key)) {
					result[key] = req.body[key];
				}
			}
			result.save(function (err) {
				if (!err) {
					res.send(result);
				} else {
					res.send(this.errMsg(err));
				}
			});
		});
	};

	//------------------------------
	// Delete
	//
	Controlleur.prototype.destroy = function (req, res) {
		//console.log('delete', req.body);
		this.model.findById(req.params.id, function (err, result) {
			if (err) {
				res.send(this.errMsg(err));
			} else {
				result.remove();
				result.save(function (err) {
					if (!err) {
						res.send({});
					} else {
						res.send(this.errMsg(err));
					}
				});
			}
		});

	};

	exports.Controlleur = Controlleur;

}(exports));
