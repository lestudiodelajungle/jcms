/*
	la classe representant le jeu en lui meme, contient des parametre,
	permet de lancer l'appli
	c'est dans cette partit que l'utilisateur doit s'authentifier avant de pouvoir lancer une scene
		_
	   / \		la taille (hauteur et largeur) du canvas doit etre un multiple de 32, ex : 640/480px
	  / | \		si vous changez la taille du tile, il faudrat que la taiile du canvas soit un multiple de la taille du tile
	 /  o  \	
	/_______\	
*/

function RPG(param) {
	"use strict";
	/*globals socket, window, document, console, Core, Scene*/
	this.div = param.canvas || param || "rpg";
	this.width = param.width || 600;
	this.height = param.height || 300;
	this.nbTileX = param.nbTileX || 20;
	this.nbTileY = param.nbTileY || 10;
	this.tailleTile = param.tailleTile || 32;

	this.btnStart = document.getElementById("start");

	this.btnStart.onclick = function () {
		this.loadScene("terrain");
	}.bind(this);

	socket.emit('getid');

	socket.on('id', function (res) {
		this.id = res;
	});
}

RPG.prototype.loadScene = function (nomMap) {
	"use strict";
	//Scene.prototype._ = this;
	this.scene = new Scene(nomMap);
};

RPG.prototype.pause = function () {
	"use strict";
	clearInterval(this.scene.core.loop);
};


window.rpg = new RPG("rpg");

//	window.rpg = new RPG({
//		"div": "rpg",
//		"width": 600,
//		"height": 300,
//		"nbTileX": 20,
//		"nbTileY": 10,
//		"tailleTile" : 32
//	});
