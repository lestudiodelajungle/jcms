// route du module core
/*globals require, GLOBAL, exports*/
(function (exports) {
	"use strict";

	function Page() {
		this.mongoose = require('mongoose');
		this.model = this.mongoose.model('Page');
		this._ = require('lodash');
	}

	/**
	 * Find article by id
	 */
	Page.prototype.getOne = function (req, res, next, id) {
		this.model.load(id, function (err, page) {
			if (err) return next(err);
			if (!page) return next(new Error('Failed to load page ' + id));
			req.page = page;
			next();
		});
	};

	/**
	 * Create an article
	 */
	Page.prototype.create = function (req, res) {
		var unePage = new this.model(req.body);
		unePage.user = req.user;

		unePage.save(function (err) {
			if (err) {
				return res.status(500).json({
					error: 'Cannot save the page'
				});
			}
			res.json(unePage);


		});
	};

	/**
	 * Update an article
	 */
	Page.prototype.update = function (req, res) {
		var unePage = req.page;

		unePage = _.extend(unePage, req.body);

		unePage.save(function (err) {
			if (err) {
				return res.status(500).json({
					error: 'Cannot update the page'
				});
			}
			res.json(unePage);

		});
	};

	/**
	 * Delete an article
	 */
	Page.prototype.destroy = function (req, res) {
		var unePage = req.page;

		unePage.remove(function (err) {
			if (err) {
				return res.status(500).json({
					error: 'Cannot delete the page'
				});
			}
			res.json(unePage);

		});
	};

	/**
	 * Show an article
	 */
	Page.prototype.show = function (req, res) {
		res.json(req.page);
	};

	/**
	 * List of Articles
	 */
	Page.prototype.all = function (req, res) {
		this.model.find().sort('-created').populate('user', 'name username').exec(function (err, pages) {
			if (err) {
				return res.status(500).json({
					error: 'Cannot list the pages'
				});
			}
			res.json(pages);

		});
	};
}(exports));
