// module model user
/*globals require, global, module, define, log*/
"use strict";
var model = require('jcms-framework').Model;
class Model extends model {
    constructor(db, name) {
        super(db, name);
    }
}
module.exports = Model;
