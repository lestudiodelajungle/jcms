/////////////////////////////////////////////////////////////////
//
// requete et traitement des donnée envoyé et recue
//
/////////////////////////////////////////////////////////////////
function Net_event(socket) {
	"use strict";
	/*globals console, io, alert, map, Personnage, socket, DIRECTION*/
	console.log('test 55');
	this.socket = socket || io.connect('http://127.0.0.1:3000');
	this.collection = {};
}

Net_event.prototype.listeplayer = function (res) {
	"use strict";
	alert("cool");
	var i, perso;
	for (i in res) {
		if (res.hasOwnProperty(i)) {
			if (this.map.personnages[i]) {
				console.log("joueur deplacé" + i);
				perso = this.map.personnages[i];
				this.map.personnages[i].deplacer(res[i].direct, map);
			} else {
				console.log("test 3");
				this.map.addPersonnage(new Personnage(i, "001-Fighter01", res[i].x, res[i].y, res[i].direct, res[i].nom));
			}
		}
	}
};

Net_event.prototype.id = function (res) {
	"use strict";
	socket.on('id', function (res) {
		this.map.player = res;

		var lejoueur = new Personnage(res, "001-Fighter01", 3, 4, DIRECTION.GAUCHE);
		this.map.addPersonnage(lejoueur);
		this.map.player = lejoueur;
		console.log(res);
		socket.emit('addPlayer', {
			'id': res,
			'nom': lejoueur.nom,
			'x': lejoueur.x,
			'y': lejoueur.y,
			'direct': lejoueur.direction
		});
	});
};

Net_event.prototype.on = function (event, func) {
	"use strict";
	this.socket.on(event, this.func);
};

Net_event.prototype.emit = function (event, valeur) {
	"use strict";
	this.socket.emit(event, valeur);
};