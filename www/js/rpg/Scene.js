// http://mrdoob.github.io/three.js/editor/
/*
	une scene represente la carte, les pnj, le joueur, les musique, les events, etc ...
	charge les autre classe.
	creer le terrain
	
	les differante type de son : bgm, bgs, me, se
		musique de fond // les musique du jeux
		effet sonore en fond // (pluie, orage, vent etc ..)
		son evenement // les son produit par les events (porte, coffre)
		son systeme // bruit curseur, des bouton et autre
*/
function Scene(nomMap) {
	"use strict";
	/*globals document, console, Input, KEY_MAP, Map, Personnage, socket, even, Menu, loop, setInterval, window, unrpg, alert, Image, Core*/
	this.background = null;
	this.musique = {
		"bg": null,
		"me": null
	};
	// Create sub-class and extend base class.
	Core.prototype._ = this;
	this.core = new Core(nomMap);

	//	this.core.background("001-Title01");
	this.core.loadMap("terrain", 2, 5, 0);

	document.onkeypress = function (event) {
		var e = event || window.event,
			key = e.which || e.keyCode;
		console.log('test 3 ' + this.core.map.player);
		switch (key) {
		case 38:
		case 122:
		case 119:
		case 90:
		case 87: // Flèche haut, z, w, Z, W
			this.core.map.player.deplacer(3, this.core.map);
			break;
		case 40:
		case 115:
		case 83: // Flèche bas, s, S
			this.core.map.player.deplacer(0, this.core.map);
			break;
		case 37:
		case 113:
		case 97:
		case 81:
		case 65: // Flèche gauche, q, a, Q, A
			this.core.map.player.deplacer(1, this.core.map);
			break;
		case 39:
		case 100:
		case 68: // Flèche droite, d, D
			this.core.map.player.deplacer(2, this.core.map);
			break;
		default:
			console.log(key);
			// Si la touche ne nous sert pas, nous n'avons aucune raison de bloquer son comportement normal.
			return true;
		}
		return false;
	}.bind(this);
}