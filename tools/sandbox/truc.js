//////////////////////////////////////////////////////////////////////////////////////////////////

// Forme, la classe parente
function Forme() {
    this.x = 0;
    this.y = 0;
}

// Méthode de la classe parente
Forme.prototype.déplacer = function (x, y) {
    console.log("test : "+ this.aa);
    this.x += x;
    this.y += y;
    console.info('Forme déplacée.');
};

// Rectangle - classe fille
function Rectangle() {
    Forme.call(this); // on appelle le constructeur parent
    this.aa = 2;
}

// La classe fille surcharge la classe parente
Rectangle.prototype = Object.create(Forme.prototype);
Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle();

console.log('rect est-il une instance de Rectangle ? ' + (rect instanceof Rectangle)); // true
console.log('rect est-il une instance de Forme ? ' + (rect instanceof Forme)); // true
rect.déplacer(1, 1); // Outputs, 'Forme déplacée.'

//////////////////////////////////////////// exemple 2 ////////////////////////////////////////////

var o;

// on crée un objet avec null comme prototype
o = Object.create(null);


o = {};
// est équivalent à :
o = Object.create(Object.prototype);


// Exemple où on crée un objet avec quelques propriétés
// (On voit ici que le second paramètres fait correspondre les clés
// avec des descripteurs de propriétés.)
o = Object.create(Object.prototype, {
    // toto est une propriété de donnée
    toto: {
        writable: true,
        configurable: true,
        value: 'hello'
    },
    // truc est une propriété d'accesseur/mutateur
    truc: {
        configurable: false,
        get: function () {
            return 10;
        },
        set: function (value) {
                console.log('Définir `o.truc` à', value);
            }
            /* avec les accesseurs ES5n on aura :
                get function() { return 10; },
                set function(value) { console.log('Définir `o.truc` à', value); } */
    }
});


function Constructeur() {}
o = new Constructeur();
// est équivalent à :
o = Object.create(Constructeur.prototype);
// Bien entendu, si la fonction Constructeur possède des instructions
// pour l'initialisation, Object.create() ne pourra pas le reproduire


// on crée un nouvel objet dont le prototype est un nouvel objet vide
// et on y ajoute une propriété 'p' qui vaut 42
o = Object.create({}, {
    p: {
        value: 42
    }
});

// par défaut, les propriétés ne sont PAS
// écrivables, énumérables ou configurables
o.p = 24;
o.p;
// 42

o.q = 12;
for (var prop in o) {
    console.log(prop);
}
// 'q'

delete o.p;
// false

// Pour définir une propriété selon ES3
o2 = Object.create({}, {
    p: {
        value: 42,
        writable: true,
        enumerable: true,
        configurable: true
    }
});

//////////////////////////////////////////// polyfill ////////////////////////////////////////////

if (typeof Object.create != 'function') {
    // Production steps of ECMA-262, Edition 5, 15.2.3.5
    // Reference: http://es5.github.io/#x15.2.3.5
    Object.create = (function () {
        // To save on memory, use a shared constructor
        function Temp() {}

        // make a safe reference to Object.prototype.hasOwnProperty
        var hasOwn = Object.prototype.hasOwnProperty;

        return function (O) {
            // 1. If Type(O) is not Object or Null throw a TypeError exception.
            if (typeof O != 'object') {
                throw TypeError('Object prototype may only be an Object or null');
            }

            // 2. Let obj be the result of creating a new object as if by the
            //    expression new Object() where Object is the standard built-in
            //    constructor with that name
            // 3. Set the [[Prototype]] internal property of obj to O.
            Temp.prototype = O;
            var obj = new Temp();
            Temp.prototype = null; // Let's not keep a stray reference to O...

            // 4. If the argument Properties is present and not undefined, add
            //    own properties to obj as if by calling the standard built-in
            //    function Object.defineProperties with arguments obj and
            //    Properties.
            if (arguments.length > 1) {
                // Object.defineProperties does ToObject on its first argument.
                var Properties = Object(arguments[1]);
                for (var prop in Properties) {
                    if (hasOwn.call(Properties, prop)) {
                        obj[prop] = Properties[prop];
                    }
                }
            }

            // 5. Return obj
            return obj;
        };
    })();
}
