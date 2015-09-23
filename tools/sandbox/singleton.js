var _ = require("underscore");
// Singleton Factory
var Singleton = {
    create: function (Constructor) {
        var _instance;

        function privateConstructor() {
            throw new ReferenceError('Private constructor');
        }

        // using lodash extend #lazy
        return _.extend({}, Constructor, {
            getInstance: function ( /*args*/ ) {
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
};


var Wall = (function (Singleton) { // We should use a DI there

    function Wall(height) {
        this.height = height;
    }

    Wall.prototype.getStatus = function () {
        console.log("Wall is " + this.height + " meters tall");
    };

    Wall.staticMethod = function () {
        return true;
    };

    // The implementation and the singleton creation still needs to be encapsulated
    return Singleton.create(Wall);
})(Singleton);

console.log(Wall.staticMethod()); // true
console.log(Wall.getInstance() === Wall.getInstance()); // true
