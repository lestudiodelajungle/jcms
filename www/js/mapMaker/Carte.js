/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
// + Carte // gestion de la carte
// + variable
// terrain; // le tableau du terrain
// canvas; // l'id dom canvas
// ctx; // = canvas.getContext('2d');
// debut = {}; //debut de la selection map
// fin = {}; // fin de la selection map
// t_selection; // le tableau de la selection
// nomFicMap; // le nom du fichier json
// btnNewMap = document.getElementById('btnNewMap');
// faction = ""; // faction de la ville (pas encore utiliser)
// info = {}; // nom: nom du terrain, type: gentil/mechent/neutre, tileset: nom du tileset, 
// + fonctions	
// - coord // recupere les coord de la souris au click
// - modifMap // modifie la map
// - suprTile // suprime un tile de la carte
// - saveMap // sauvegarde la map sur le serveur
// - supprimerCarte // supprime la carte du serveur
// - chargerMap // charge une carte depuis le seveur
// - dessinerMap // dessine la map a l'ecran
// - changeNom // change le nom de la map
// - dessinerTile // dessine un tile sur la carte
// - nouvel_carte // creer une carte vierge
// - selectionmap // selectionne des tile sur la carte // marche pas
// - infoTile
// - tilePriority
// - chargerPass
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

function Carte(nom, largeur, hauteur, tileset, fm) {
	"use strict";
	this.id;
	this.canvas; // l'id dom canvas
	this.ctx = this.canvas.getContext('2d');
	
	this.debut = {}; // coord du point de debut de la selection
	this.fin = {}; // coord du point de fin de la selection
	this.selection = {}; // contient tout les tile selectionner

	// this.nomFicMap; // le nom du fichier json
	this.info = {}; // nom: nom du terrain, type: gentil/mechent/neutre, tileset: nom du tileset, 
	
	if (typeof nom == 'undefined') {
		editeur.fenNewMap('formOpenMap');
	} else {
		console.log('nom  ---> ' + nom);
		this.chargerMap(nom);
	}

	var lien = document.createElement('a');
	lien.href = '#';
	lien.innerHTML = nom;
	var onglet = document.createElement('li');
	onglet.appendChild(lien);
	var divonglet = document.getElementById('ongletCarte');
	divonglet.appendChild(onglet);
	var page = document.createElement('div');
	var divtab = document.getElementById('tabber17');
	var tab = document.createElement('div');
	tab.className = 'simpleTabsContent';
	divtab.appendChild(tab);
	kmrSimpleTabs.init();
}

Carte.prototype.dessinerMap = function () { // dessine la map dans la canvas
	"use strict";
	for (var l = 0; l < 3; l++) {
		for (var i = 0; i < this.terrain.length; i++) {
			for (var j = 0; j < this.terrain[0].length; j++) {
				var id = this.terrain[i][j][l];
				if (id != null) {
					if (id < 384) {
						// console.log(id);
						id = 384;
					}
					this.dessinerTile(id, this.ctx, i * 32, j * 32);
				}
			}
		}
	}
	Editeur.prototype.grillage(ctx, 'conteiner');
}

Carte.prototype.changeNom = function (nom) { // change le nom de la carte
	"use strict";
	this.terrain.nom = document.getElementById('iptnomcarte').value;
	this.msgConsole("nom de la carte : " + this.terrain.nom);
}

Carte.prototype.dessinerTile = function (numero, ctx, xDestination, yDestination) { // dessine un tile
	"use strict";
	var numero = numero - (384);
	canvas = document.getElementById('conteiner');
	if (numero < 0) {
		numero = 1;
	}
	var xSourceEnTiles = numero % this.tileset.width;
	if (xSourceEnTiles == 0) xSourceEnTiles = this.tileset.width;
	// if(ySourceEnTiles == 0) ySourceEnTiles = tileset.height;
	var ySourceEnTiles = Math.floor(numero / 8);
	//if( Math.floor(numero / 8) == 0) ySourceEnTiles = 0;
	var xSource = xSourceEnTiles % 8 * 32;
	var ySource = ySourceEnTiles * 32;

	this.ctx.drawImage(this.tileset, xSource, ySource, 32, 32, xDestination, yDestination, 32, 32);
}

Carte.prototype.infoTile = function (e) { // donne des information sur un carreau de la carte
	"use strict";
	var mousex = Math.floor(e.pageX - this.canvas.offsetLeft + this.canvas.scrollLeft);
	var mousey = Math.floor(e.pageY - this.canvas.offsetTop + this.canvas.scrollTop);

	var x = Math.floor(mousex / 32);
	var y = Math.floor(mousey / 32);

	alert("coordonné : " + mousex + "-" + mousey + "\n" +
		"en carreau : " + x + "-" + y + "\n" +
		"canvas : click :" + x + "-" + y + "\n" +
		"contenu : " + this.terrain[x][y] + "\n" +
		"tileset ");
}

Carte.prototype.modifier = function (e) { // modifie la map
	"use strict";
	// console.log('modifmap : '+e)
	console.log(document.getElementById('gomme').checked);
	var canvasmap = document.getElementById('page');
	var coordx = Math.floor(e.pageX - canvasmap.offsetLeft + canvasmap.scrollLeft);
	var coordy = Math.floor(e.pageY - canvasmap.offsetTop + canvasmap.scrollTop);
	var t_tile_selectionner = t_tileset;

	var x = Math.floor(coordx / 32);
	var y = Math.floor(coordy / 32);

	for (var id in t_tile_selectionner) {
		for (var di in t_tile_selectionner[id]) {
			var tilex = x + Math.floor(parseInt(di));
			var tiley = y + Math.floor(parseInt(id));
			console.log(document.getElementById('gomme').checked);
			if (document.getElementById('gomme').checked == true) {
				this.terrain[tilex][tiley][layoutSelect] = null;
			} else {
				this.terrain[tilex][tiley][layoutSelect] = t_tileset[id][di];
			}
			//console.log(terrain[tilex][tiley][layoutSelect] );
		}
	}
	dessinerMap();
}

Carte.prototype.suprTile = function () { // supprime les tiles de la selection
	"use strict";
	var canvasmap = document.getElementById('page');
	var coordx = Math.floor(e.pageX - canvasmap.offsetLeft + canvasmap.scrollLeft);
	var coordy = Math.floor(e.pageY - canvasmap.offsetTop + canvasmap.scrollTop);


	var x = Math.floor(coordx / 32);
	var y = Math.floor(coordy / 32);

	for (var id in t_tile_selectionner) {
		for (var di in t_tile_selectionner[id]) {
			var tilex = x + Math.floor(parseInt(di));
			var tiley = y + Math.floor(parseInt(id));
			this.terrain[tilex][tiley][layoutSelect] = null;
		}
	}
	dessinerMap();
}

Carte.prototype.selectTile = function (e) { // selectionne un ou plusieur tile(s)
	"use strict";
	// calcul pour trouver le num du carreau x+(y*8)+1
	canvas = document.getElementById('conteiner');
	div = document.getElementById('page');
	// position relative de la souris dans le canvas tileset
	var x = Math.floor((e.pageX - canvas.offsetLeft + div.scrollLeft) / (32));
	var y = Math.floor((e.pageY - canvas.offsetTop + div.scrollTop) / (32));

	// on redessine tout 
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// on regarde dabord si on appui ou si on relache
	if (e.type == "mousedown") {

		this.debut.x = x * 32;
		this.debut.y = y * 32;
		this.fin.x = x * 32 + 32;
		this.fin.y = y * 32 + 32;
		index = 0;
		// var carreau =  debut.x/32+1+((debut.y/32)*8); // pour connaitre le l'id du carreau avec les coord du debut du carré
		carreau = x + (y * 8) + 1;
		canvas.addEventListener('mousemove', this.selectionmap, false);
		modifMap(e);
		this.dessinerMap();
	} else if (e.type == "mousemove") {
		if (x < debut.x || x > fin.x) {
			if (fin.x < debut.x) {
				debut.x -= 32;
			} else {
				fin.x = x * 32;
			}
			modifMap(e);
		}
		if (y < debut.y || y > fin.y) {
			if (fin.y < debut.y) {
				if (fin.y - y * 32 >= 32) {
					debut.y -= 32;
				}
			} else {
				if (fin.y - y * 32 >= 32) {
					fin.y = y * 32;
				}
			}
			modifMap(e);
		}
	} else {
		fin.x = x * 32;
		fin.y = y * 32;
		canvas.removeEventListener('mousemove', this.selectionmap, false);
		modifMap(e);

		var nbcarlarg = ((fin.x / 32) % 8 - (debut.x / 32) % 8) + 1;
		var nbcarhaut = ((fin.y / 32 - debut.y / 32) % 8) + 1;
		t_selection = {};
		for (var haut = 0; haut < nbcarhaut; haut++) {
			t_selection[haut] = new Array();
			for (var larg = 0; larg < nbcarlarg; larg++) {
				Ncarreau = carreau + larg + haut * 8;
				t_selection[haut][larg] = Ncarreau + 383 + 8;
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
}

Carte.prototype.remplirForm = function () { // remplie un formulaire selon les attribut de la carte
	"use strict";
	if (document.getElementById('fop_idcarte')) {
		document.getElementById('fop_idcarte').value = "";
		var form = document.getElementById('formOpenMap');
		form.elements['nomCarte'].value = nomFicMap;
		form.elements['largeur'].value = this.terrain.lenght;
		form.elements['hauteur'].value = s.terrain[1].lenght;
		form.elements['idtileset'].value = tileset;
	} else {
		console.log('fop_idcarte n\'est pas present');
	}
}