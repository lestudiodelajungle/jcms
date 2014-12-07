///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
/*
 + Tilset // gestion du tileset
	 + variable
		 tilesetSelect = nom; // le nom du tileset afficher
		 tileselect; // contient la selection des tiles
		 image;//  l'objet image du tileset
		 debut = {}; // le debut de la selection
		 fin = {}; // la fin de la selection
		 canvas = document.createElement("canvas");
		 document.getElementById("tileset").appendChild(this.canvas);
		 canvas.setAttribute('id', 'canvastilesets');
		 passage = {}; // tableau qui contient les valeur de superposition et de passages
		 ctx = this.canvas.getContext('2d');	// le context du canvas
		 dernierCarreau;
		 carreau;
		 index;
	 + fonctions	
		 - afficher_image // affiche un tileset 
		 - getTilesetName // recupere le nom du tileset
		 - get_t_tileset // recupere le tableau de tile selectionné
		 - selectTile // selectionne un/des tile(s) sur le tileset
		 - chargerPass // charge le tableau de passage du json dans un tableau
		 - modifPass // modifie une valeur de passage
		 - info_tileset // recupere les info dla map
		 - fermerImg
 */
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

function Tileset(nom) {
	"use strict";
	this.canvas = document.createElement("canvas"); // on créer le canvas
	document.getElementById("tileset").appendChild(this.canvas); // on l'attache au div
	this.canvas.setAttribute('id', 'canvastilesets'); // on lui attribut une class
	this.ctx = this.canvas.getContext('2d'); // le context du canvas
	
	this.image = new Image(); //  l'objet image du tileset
	this.passage = {}; // tableau qui contient les valeur de superposition et de passages
	
	this.debut = {}; // coord du point de debut de la selection
	this.fin = {}; // coord du point de fin de la selection
	this.selection = {}; // contient tout les tile selectionner

	document.getElementById('passage').onclick = function (e) {
		var check = document.getElementById('passage').checked;

		if (check === true) {
			this.canvas.removeEventListener("mousedown", this.selectTile, false);
			this.canvas.removeEventListener("mouseup", this.selectTile, false);
		} else {
			this.canvas.addEventListener("mousedown", this.selectTile, false);
			this.canvas.addEventListener("mouseup", this.selectTile, false);
		}
	};

	this.afficher_image(this.tilesetSelect);
}

Tileset.prototype.chargerPassage = function (fichier) {
	"use strict";
	//passage = null;

	//~ // on telecharge le fichier .json
	//~ var xhr = getXMLHttpRequest();
	//~ 
	//~ xhr.open("GET", '/twop/mapMaker/database/' + fichier + '.json', false);
	//~ xhr.send(null);
	//~ if(xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0)){ // Code == 0 en local
	//~ //throw new Error("Impossible de charger la carte nommée \"" + fichier + "\" (code HTTP : " + xhr.status + ").");
	//~ }else{
	//~ var JsonData = xhr.responseText;
	//~ passage = JSON.parse(JsonData);
	//~ }
	//~ 
	//~ 
	//~ // on analyse les donnée recuperée
	//~ 
	//~ 
	//~ if(passage == null || passage === "undefined"){
	var c,
		calc = (this.image.width / 32) * (this.image.height / 32);
	for (c = 0; c < calc; c += 1) {
		var inter = 384 + c;
		this.passage[inter] = [1, 1];
		//	}
	}
};

// affiche un tileset dans un canvas
Tileset.prototype.afficherImage = function (img) {
	"use strict";
	// creation de l'image

	this.image.src = "/twop/rpgjs/Graphics/Tilesets/" + img + ".png";
	this.image.onload = function () {
		this.canvas.width = this.image.width;
		this.canvas.height = this.image.height;
		this.ctx.clearRect(0, 0, canvas.width, canvas.height); // on efface le contenu

		var y, x;
		console.log(this.passage);
		for (y = 0; y < this.canvas.height / 32; y++) {
			for (x = 0; x < this.canvas.width / 32; x++) {
				this.ctx.drawImage(this.image, x * 32, y * 32, 32, 32, x * 32, y * 32, 32, 32);
				var i = ((y * x) + 384);

				//console.log(passage+" - "+passage[1]);

				this.ctx.fillText(this.passage["386"][1], x * 32, y * 32);

			}
		}
		this.chargerPass(img);

		this.info.tileset = img;
		grillage(ctx, 'canvastilesets');
	};
	this.tilesetSelect = this.image;
	this.tileset = this.image;

	this.canvas.addEventListener("mousedown", this.selectTile, false);
	this.canvas.addEventListener("mouseup", this.selectTile, false);
	// canvas.addEventListener("dbclick", this.modifPass, false);
};

Tileset.prototype.getNomTileset = function () {
	"use strict";
	return tilesetSelect;
};

Tileset.prototype.selectionnerTile = function (e) {
	"use strict";
	// calcul pour trouver le num du carreau x+(y*8)+1
	// position relative de la souris dans le canvas tileset
	var x = Math.floor((e.pageX - this.canvas.offsetLeft + this.canvas.scrollLeft) / (32));
	var y = Math.floor((e.pageY - this.canvas.offsetTop + this.canvas.scrollTop) / (32));
	//console.log(x+' - >'+canvas1.scrollTop);
	// on redessine tout 
	this.ctx.clearRect(0, 0, canvas.width, canvas.height);
	this.ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
	//grillage(ctx, 'canvastilesets');

	// on regarde dabord si on appui ou si on relache
	if (e.type == "mousedown") {
		debut.x = x * 32;
		debut.y = y * 32;
		fin.x = x * 32;
		fin.y = y * 32;
		index = 0;
		// var carreau =  debut.x/32+1+((debut.y/32)*8); // pour connaitre le l'id du carreau avec les coord du debut du carré
		//if(x==0)x=1;

		carreau = (x + 1) + (y * 8);
		/////////////////////////////////
		//console.log(x+' - '+y+' -> '+carreau);
		/////////////////////////////////

		canvas.addEventListener('mousemove', this.selectTile, false);
	} else if (e.type == "mousemove") {
		// quand on relache la souris on stock les carreau dans le tableau
		//fin.x = x*32;
		if (debut.x - fin.x >= 32 || debut.x - fin.x <= -32) {
			if (fin.x < debut.x) {
				debut.x -= 32;
			} else {
				fin.x = x * 32;
			}
		}
		if (debut.y - fin.y >= 32 || debut.y - fin.y <= -32) {
			if (fin.y < debut.y) {
				debut.x -= 32;
			} else {
				fin.y = y * 32;
			}
		}

	} else {
		fin.x = x * 32;
		fin.y = y * 32;
		canvas.removeEventListener('mousemove', this.selectTile, false);

		var nbcarlarg = ((fin.x / 32) % 8 - (debut.x / 32) % 8) + 1;
		var nbcarhaut = ((fin.y / 32 - debut.y / 32) % 8) + 1;
		t_tileset = {};
		for (var haut = 0; haut < nbcarhaut; haut++) {
			t_tileset[haut] = new Array();

			for (var larg = 0; larg < nbcarlarg; larg++) {
				Ncarreau = carreau + larg + haut * 8;
				t_tileset[haut][larg] = Ncarreau + 383;
				//console.log(Ncarreau+" -> "+ t_tileset[haut][larg]);
			}
		}

		if (fin.x < debut.x) {
			debut.x += 32;
			fin.x -= 32;
		}

		if (fin.y < debut.y) {
			debut.y += 32;
			fin.y -= 32;
		}
	}

	// le nb de carreaux largeur (fin.x-debut.x)/2
	// premier id: (debut.x/32)*((debut.y/32)+1)

	ctx.lineWidth = 2;
	ctx.strokeStyle = "rgb(0,0,0,1)";
	ctx.beginPath();
	ctx.moveTo(debut.x, debut.y);
	ctx.lineTo(fin.x + 32, debut.y);
	ctx.lineTo(fin.x + 32, fin.y + 32);
	ctx.lineTo(debut.x, fin.y + 32);
	ctx.lineTo(debut.x, debut.y);
	ctx.stroke();
	ctx.closePath();

	dernierCarreau = carreau;
};


Tileset.prototype.modifierPassage = function (id, valeur) {
	"use strict";
	passage[id] = valeur;
};

Tileset.prototype.infoTileset = function () {
	"use strict";
	nbTileHaut = tilesetSelect.height / 32;
	nbTileLarg = tilesetSelect.width / 32;
	var element = document.getElementById('content_1');

	document.getElementById('largeur').textContent += "largeur : " + nbTileLarg + " tiles \n";
	document.getElementById('hauteur').textContent += "hauteur : " + nbTileHaut + " tiles \n";
	//console.log(this.tilesetSelect.height);
};

// canvas.addEventListener("onMouseOver", selectTile, true);	
Tileset.prototype.fermerImage = function () {
	"use strict";
	tilesetSelect = "";
	tileset = "";
};