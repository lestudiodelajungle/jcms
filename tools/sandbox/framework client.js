/*jslint nomen: true, es5: true*/
/*globals global, exports, require, alert, dirRoot, console, rsvp, fs, promises, __dirname*/

var $$,
    _ = require("underscore"),
    Framework = function (query) {
        "use strict";
        return new Framework.core.init(query);
    };

Framework.core = Framework.prototype = {
    constructor: Framework,
    _elements: [],

    init: function (query) {
        "use strict";
        if (query && typeof query === "string") {
            var element,
                elements = document.querySelectorAll(query);
            for (element in elements) {
                if (elements.hasOwnProperty(element)) {
                    this._elements.push(element);
                }
            }
        }
        return this;
    }
};

Framework.core.init.prototype = Framework.core;
//$$ = global.Framework = global.$$ = Framework;

Framework.extend = Framework.core.extend = function () {
    "use strict";
    var key, method,
        target = null,
        donor = null,
        length = arguments.length;

    target = length === 1 ? this : arguments[0];
    donor = length === 1 ? arguments[0] : arguments[1];

    for (key in donor) {
        if (donor.hasOwnProperty(key)) {
            method = donor[key];
            if (!donor.hasOwnProperty(method)) {
                target[key] = method;
            }
        }
    }
    return target;
};

$$.extend(Framework.core, {
    exist: function (target) {
        "use strict";
        return (typeof (target) === "function") ? alert(target.name + ' existe') : alert(target + ' n\'existe pas');
    },
    toType: function () {
        "use strict";
        return ({}).toString.call(this).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    },
    app: function () {
        "use strict";
        return require("../Server.js").Server;
    },
    Singleton: {
        create: function (Constructor) {
            "use strict";
            var _instance;

            function privateConstructor() {
                throw new ReferenceError('Private constructor');
            }

            // using lodash extend #lazy
            return _.extend({}, Constructor, {
                getInstance: function () {
                    if (!_instance) {
                        _instance = Object.create(Constructor.prototype, {
                            constructor: {
                                get: privateConstructor
                            }
                        }); // create object with private constructor
                        Constructor.apply(_instance, arguments); // apply constructor
                    }
                    return _instance;
                }
            });
        }
    },
    log: function (msg) {
        "use strict";
        console.log(msg);
    },
    warn: function (msg) {
        "use strict";
        console.log(msg);
    },
    info: function (msg) {
        "use strict";
        console.log(msg);
    },
});
module.exports = Framework;