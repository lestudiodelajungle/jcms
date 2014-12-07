var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schemma = new Schema({
    "meta": {
        "charset": String,
        "description": String,
        "title": String,
        "favicon": String,
        "meta_key": Array
    },
    "template": {
        "layout": String,
        "head": String,
        "header": String,
        "body": String,
        "footer": String
    },
    "css": Array,
    "javascript": Array
});

module.exports.schemma = schemma;