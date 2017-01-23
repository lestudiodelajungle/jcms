/*jslint nomen: true, sloppy: true*/
/*globals require, dirRoot, exports*/
/**
 * Handles blog posts.
 */
var $$ = require("../index");

function Schema(name) {
    this.name = name;
    this.mongoose = require('mongoose');

    this.mongoose.connection.on('onOpen', function () {});

    //this.connect();
    this.initModel();
}

Schema.prototype.connect = function () {
    // this.mongoose.disconnect();
    // db = mongoose.createConnection('mongodb://user:pass@localhost:port/database', opts);
    this.mongoose.createConnection('mongodb://localhost/test', function (err) {
        if (err) {
            throw err;
        }
    });
};

Schema.prototype.deconnect = function () {
    return this.mongoose.disconnect();
};

Schema.prototype.initModel = function () {
    var Schema = this.mongoose.Schema;
    this.modelSchema = new Schema(require(global.dirRoot + "/modules/" + this.name + "/schema/" + this.name + ".json"));
    this.modelSchema.index({
        date: -1
    });

    // Create post object from schema
    this.Model = this.mongoose.model(this.name, this.modelSchema);
    //console.log(this.Model.find({}, 'date author title'));
};

/**************************************************************
 * API Functions
 **************************************************************/

/**
 * Gets all posts, sorted in reverse order by date, then renders the post
 * template, writing the posts into the template.
 *
 * @param {Object} req Request object.
 * @param {Object} res Response object.
 */
Schema.prototype.getAll = function (req, res) {

    // Find all posts, sorted desc by date. Return plain JSON objects (not
    // mongoose objects) by specifying lean(true). Return all fields but content.
    this.Model.find({}).exec(function (err, models) {
        if (err) {
            console.log("erreuuur " + err);
            return;
        }

        console.log("les modeles : " + models);
    });
};

/**
 * Gets the content for a specific post and returns as JSON.
 * Expected to be called via AJAX request.
 *
 * @param {Object} req Request object.
 * @param {Object} res Response object.
 */
Schema.prototype.get = function (req, res) {
    // Make sure a post ID was provided
    if (!req.params.modelId) {
        res.send(400, 'Missing Model ID');
        return;
    }

    // Get the document for the single post
    this.Model.findById(req.params.ModelId, 'content').lean(true).exec(function (err, model) {
        if (err) {
            res.send(500, 'Database Error. Could not get model.');
            return;
        }

        res.set('Content-Type', 'text/json');
        res.json(model);
    });
};

/**
 * Saves a new model. Expected to be called via AJAX request.
 *
 * @param {Object} req Request object.
 * @param {Object} res Response object.
 */
Schema.prototype.save = function (req, res) {
    var model;
    //    if (req.body._id) {
    //        model = new this.Model(req.body);
    //
    //        this.Model.modify({
    //            _id: req.body._id
    //        }, {
    //            '$set': {
    //                title: req.body.title,
    //                author: req.body.author,
    //                content: req.body.content
    //            }
    //        }, function (err) {
    //
    //            res.set('Content-Type', 'text/json');
    //            res.json({
    //                _id: req.body._id,
    //                modified: true
    //            });
    //        });
    //
    //    } else {

    model = new this.Model(req.body);

    model.save(function (err) {
        if (err) {
            res.send(500, 'Database Error. Could not save model.');
            return;
        }

        res.set('Content-Type', 'text/json');
        res.json(model);
    });
    //    }
};

Schema.prototype.remove = function (req, res) {
    //TODO
};

exports.Schema = Schema;
