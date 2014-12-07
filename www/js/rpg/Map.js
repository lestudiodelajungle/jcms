/*jshint forin: true */
function Map(param) {
	"use strict";
	/*globals getXMLHttpRequest, JSON, document, Tileset, socket, Personnage, console*/
	// Création de l'objet XmlHttpRequest
	var xhr = getXMLHttpRequest(),
		mapJsonData,
		mapData;
	xhr.open("GET", '/Data/Maps/' + param.nom + '.json', false);
	xhr.send(null);
	if (xhr.readyState !== 4 || (xhr.status !== 200 && xhr.status !== 0)) { // Code == 0 en local
		throw new Error("Impossible de charger la carte nommée \"" + param.nom + "\" (code HTTP : " + xhr.status + ").");
	}
	mapJsonData = xhr.responseText;
	mapData = JSON.parse(mapJsonData);

	this.personnages = {}; // les autres

	//this.player; // le joueur 
	this.event = []; // les pnj

	this.tileset = new Tileset(mapData.info.tileset, param.tailleTile);
	this.terrain = mapData.map;

	socket.on('listePlayer', function (res) {
		var i;
		console.log("liste player");
		for (i in res) {
			if (res.hasOwnProperty(i)) {
				if (this.personnages[i]) {
					console.log("joueur deplacé" + i);
					//	var perso = personnages[i];
					this.personnages[i].deplacer(res[i].direct, this);
				} else {
					console.log("test 3");
					this.addPersonnage(new Personnage(i, "001-Fighter01", 3, 3, res[i].direct, res[i].nom));
				}
			}
		}
	});
}

Map.prototype.getHauteur = function () {
	"use strict";
	return this.terrain.length;
};

Map.prototype.getLargeur = function () {
	"use strict";
	return this.terrain[0].length;
};

Map.prototype.dessinerMap = function () {
	"use strict";
	var y, x, l, m, c, r, i, ligne, k, j;
	var ctx = this._.buf;

	ctx.restore();
	//context.translate(this.player.x * 32, this.player.y * 32);
	for (y = this.player.y - 5, l = this.player.y + 5; y < l; y += 1) { // ligne 
		ligne = this.terrain[y];
		m = y * 32;
		if (typeof ligne === "undefined") {
			continue;
		}
		for (x = this.player.x - 10, c = this.player.x + 10; x < c; x += 1) { // collone
			if (typeof ligne[x] === "undefined") {
				x = x < this.player.x ? -x : x;
				m = m < this.player.y ? -m : m;
				this.tileset.dessinerTile(1068, ctx, x * 32, m);
			} else {
				for (r = 0; r < 3; r += 1) {
					this.tileset.dessinerTile(ligne[x][0], ctx, x * 32, m);
				}
			}

		}
	}

	for (i in this.personnages) {
		if (this.personnages.hasOwnProperty(i)) {
			this.personnages[i].dessinerPersonnage(ctx);
		}
	}

};

Map.prototype.addPersonnage = function (perso) {
	"use strict";
	this.personnages[perso.id] = perso;
};