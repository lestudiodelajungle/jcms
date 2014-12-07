function Tileset(url, tailleTile) {
	"use strict";
	/*globals Image*/
	// Chargement de l'image dans l'attribut image
	this.tailleTile = tailleTile;
	console.log("taille tile : " + tailleTile);
	this.image = new Image();
	this.image.referenceDuTileset = this;
	this.image.src = "/Data/Graphics/Tilesets/" + url + ".png";
	this.image.onload = function () {
		this.referenceDuTileset.largeur = this.width / 32;
		if (!this.complete) {
			throw new Error("Erreur de chargement du tileset nommé \"" + url + "\".");
		}
	};

}

// Méthode de dessin du tile numéro "numero" dans le contexte 2D "context" aux coordonnées x et y
Tileset.prototype.dessinerTile = function (numero, context, xDestination, yDestination) {
	"use strict";
	var xSourceEnTiles = numero % this.largeur;
	if (xSourceEnTiles === 0) {
		xSourceEnTiles = this.largeur;
	}
	var ySourceEnTiles = Math.ceil(numero / this.largeur),
		xSource = (xSourceEnTiles - 1) * 32,
		ySource = (ySourceEnTiles - 1) * 32;
	context.drawImage(this.image, xSource, ySource, 32, 32, xDestination, yDestination, 32, 32);
};

Tileset.prototype.noir = function (context, xDestination, yDestination) {
	"use strict";
	context.rect(xDestination, yDestination, 32, 32);
};