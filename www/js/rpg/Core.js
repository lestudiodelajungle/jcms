/*
	le coeur du moteur de jeux, centralise tout les truc : image, son, input, etc
	son : ambience, musique, bruitage
*/

var DIRECTION = {
	"BAS": 0,
	"GAUCHE": 1,
	"DROITE": 2,
	"HAUT": 3
};

function Core() {
	"use strict";
	/*globals document, console, Input, KEY_MAP, Map, Personnage, socket, even, Menu, loop, setInterval, window, unrpg, alert, requestAnimationFrame, Image*/

	this.canvas = document.getElementById(this._._.div || ""); // l'ecran principale
	this.ctx = this.canvas.getContext('2d');

	this.buffer = document.createElement("canvas"); // le buffer
	this.buf = this.buffer.getContext("2d");

	this.etat = 'jeux'; // etat du jeux: jeux, menu, pause, combat etc  ...
	this.lesFenetres = [];

	var test = "trucu";

	// this.input = new Input(this);

	this.lePerso = {}; // le personnage
	this.lesPerso = {}; // les autres

	// this.map = {}; // la carte
}

Core.prototype.loadMap = function (name, x, y, dir) {
	"use strict";
	Map.prototype._ = this;
	this.map = new Map({
		"nom": name,
		"tailleTile": this._._.tailleTile
	});
	var direction = dir || 0;
	this.map.addPersonnage(this.loadPlayer());
	this.main();
};

Core.prototype.loadPlayer = function (nom) {
	"use strict";
	var id = this._._.id;
	console.log("id " + id)
	var lejoueur = new Personnage(id, "001-Fighter01", 3, 4, DIRECTION.GAUCHE, nom);

	this.map.player = lejoueur;

	socket.emit('addPlayer', {
		'id': id,
		'nom': lejoueur.nom,
		'x': lejoueur.x,
		'y': lejoueur.y,
		'direct': lejoueur.direction
	});
	return lejoueur;
};

Core.prototype.scene_menu = function (e) {
	"use strict";
	this.canvas.onclick = function (e) {
		even(e);
	};
	this.etat = 'menu';

	this.menu = new Menu();

};

Core.prototype.close = function (obj) {
	"use strict";
	var key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) {
			obj[key] = null;
		}
	}
};

Core.prototype.main = function () {
	"use strict";
	// le traitment

	//this.buf.clearRect(0,0,this.canvas.width, this.canvas.height);
	//this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
	this.buf.restore();
	this.buf.save();
	this.buf.clearRect(0, 0, this.buffer.width, this.buffer.height);
	this.map.dessinerMap(this.buf);

	for (var i = 0; i < this.lesFenetres.lenght; i++) {
		this.lesFenetres[i].rendu();
	}

	// fin du traitement
	this.ctx.drawImage(this.buffer, 0, 0); // on copie le buffer dans le canvas pour l'afficher
	this.buf.restore();
	this.loop = window.requestAnimationFrame(this.main.bind(this));
};

Core.prototype.background = function (nom) {
	"use strict";
	var image = new Image();
	image.src = "/Data/Graphics/Titles/" + nom + ".jpg";
	image.onload = function () {
		this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
		if (!this.complete) {
			throw new Error("Erreur de chargement du background nommé \"" + nom + "\".");
		}
	}.bind(this);
};

Core.prototype.pause = function () {
	"use strict";
	window.cancelAnimationFrame(this.loop);
	this.loop = undefined;
};

Core.prototype.exit = function () {
	"use strict";
	this.canvas.onclick = null;
	window.onkeydown = null;
	window.game = null;
};