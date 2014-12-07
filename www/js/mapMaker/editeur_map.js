/*
/////////////////////////////////////////////////////////////////////////////////////////
///////	EDITEUR DE MAP		///////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
 @author : severin
 @mail : sev794@yahoo.fr
 @licence : libre
/////////////////////////////////////////////////////////////////////////////////////////
 aller voir pour un algo autotile
 http://forum.games-creators.org/archive/index.php/t-1966.html
/////////////////////////////////////////////////////////////////////////////////////////
 + editeur // la classe de l'editeur
	 + variable
		 -sound = new Audio();	
		 -xhr = getXMLHttpRequest();
		 -t_tileset // les tilesets (leur nom) ouvert
		 -t_terrain // le tableau qui contient les nom des map ouverte
		 -lesTileset
		 -lesMap
		 -layoutSelect // la couche selectionée
		 -mousex // coordonnée de la souris
		 -mousey // coordonnée de la souris
		 -etat // null: aucune carte charger, 
			erreur: ya une erreur, 
			charger: carte charger
		 -aff_pass  // si on affiche les prioritées ou pas
		 -cartecourente; 
		 -changeLayout
	 + fonctions
		 -getlisteimg
		 -getlistetileset
		 -setlistetileset
	  // -choisirMap
		 -ChangeOnglet // changer d'onglet dans le sidebar gauche
		 -coord
		 -changeLayout
		 -remplirForm
		 -grillage // affiche une grille sur un canvas
		 -loadFile // charge un fichier depuis le serveur
		 -getXMLHttpRequest // requete ajax
		 -msgConsole // affiche un message dans la console mapMaker
		 -fenNewMap // affiche une fennetre/pop-up
		 -fen_openMap
		 - fermer // ferme une fenetre
		 -afficher_img
		 -lire_musique // lis une musique
		 - s = localstorage
//////////////////////////////////////////////////////////////////////////////////////
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
/////////////////////////////////////////////////////////////////////////////////////		
 + Carte // gestion de la carte
	 + variable
		 terrain; // le tableau du terrain
		 canvas; // l'id dom canvas
		 ctx; // = canvas.getContext('2d');
		 debut = {}; //debut de la selection map
		 fin = {}; // fin de la selection map
		 t_selection; // le tableau de la selection
		 nomFicMap; // le nom du fichier json
		 btnNewMap = document.getElementById('btnNewMap');
		 faction = ""; // faction de la ville (pas encore utiliser)
		 info = {}; // nom: nom du terrain, type: gentil/mechent/neutre, tileset: nom du tileset, 
	 + fonctions	
		 - coord // recupere les coord de la souris au click
		 - modifMap // modifie la map
		 - suprTile // suprime un tile de la carte
		 - saveMap // sauvegarde la map sur le serveur
		 - supprimerCarte // supprime la carte du serveur
		 - chargerMap // charge une carte depuis le seveur
		 - dessinerMap // dessine la map a l'ecran
		 - changeNom // change le nom de la map
		 - dessinerTile // dessine un tile sur la carte
		 - nouvel_carte // creer une carte vierge
		 - selectionmap // selectionne des tile sur la carte // marche pas
		 - infoTile
		 - tilePriority
		 - chargerPass
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
//	||||||||||||||||||||||||||||
//  ||||| Base de donnée |||||||
//	||||||||||||||||||||||||||||
////////////////////////////////////////////////////////////////////

                /\         /\
                ||   ___   ||		
                \ \_/   \_/ /   __	
                 \_________/   / /	
                 /   \ /   \__/ /___
                |   0   0   |_  ___/
                |    ___    |/ /	
                 \_________// /		
                     | |   / /		
                 ___/| |\_/_/		
                /   \_ _/   \		
                |/|       |\|		
                |||       |||		
                |||       |||		
                |||       |||		
               /  \---0---/  \		
               \__/       \__/		
                 /|   _   |			
                / |  / \  |			
                \/|  | |  |			
                __|  | |  |__			
                \____/ \____/			

Map {
	"id": 1, // identifiant de la carte
	"info": {
		"nom": "Forest1", // le nom de la carte tel qu'il vat apparaitre dans le jeux
		"type": "neutre", // sa on s'en fout pour le moment
		"tileset": "Forest" // le tileset utilisé par la carte
	},
	"map": {} // les données du terrain
}
//////////////////////////////////////////////////////////////
Tileset {
	"id": // l'identifiant du tileset
	"nom": // le nom du tileset
	"fichier": // le nom de l'image du tileset
	"image": // objet de l'image du tileset
	"passage": {} // objet contenent les passage du tileset
}

*/

/* jslint nomen: true, devel: true * /
/ * globals require, window, Audio, process, __dirname, code */

function Editeur() {
	"use strict";
	/* globals t_terrain, Carte, editeur, socket, console*/
	this.io = window.io;
	//on recupere l 'objet socket.io
	this.sio = this.io.connect(); // on ouvre un socket
	this.socket = this.sio.socket.of(' / chat '); // on ecoute /chat sur le socket // pas encore utilisé

	this.sound = new Audio(); // on initialise un objet son
	this.xhr = window.getXMLHttpRequest(); // on init l'objet xhr

	this.lesTileset = {}; // collection de tileet
	this.lesMap = {}; // collection de map
	this.map = {}; // la map en cours d'edition

	this.layoutSelect = 0; // la couche en cours d'edition
	//	this.mousex; // coordonnée de la souris
	//	this.mousey; // coordonnée de la souris
	this.etat = null; // null: aucune carte charger, erreur: ya une erreur, charger: signifie qu'une carte est charger (de la carte ouverte)

	this.btnNewMap = document.getElementById('btnNewMap');
	this.btnCouche1 = document.getElementById('couche1');
	this.btnCouche2 = document.getElementById('couche2');
	this.btnCouche3 = document.getElementById('couche3');
	this.btnCouche4 = document.getElementById('couche4');


	//	document.getElementById('idcarte').onchange = function (e) { // event chargement d'une carte
	//		console.info(e.target.selectedIndex);
	//		t_terrain[terrain.lenght] = new Carte(e.target.value);
	//	}

	this.btnNewMap.onclick = function (e) { // event nouvelle carte
		console.info('2 -- ' + this.t_terrain);
		t_terrain[t_terrain.lenght] = new Carte();
	};

	// document.getElementById('supprimerMap').addEventListener("click", this.uneMap.supprimerMap,false);
	// document.getElementById('saveMap').addEventListener("click", this.uneMap.saveMap, false);

	this.btnCouche1.addEventListener("click", this.changeLayout, false);
	this.btnCouche2.addEventListener("click", this.changeLayout, false);
	this.btnCouche3.addEventListener("click", this.changeLayout, false);
	this.btnCouche4.addEventListener("click", this.changeLayout, false);


	document.getElementById('parametre').onclick = function () {
		window.open('option', 'Parametre', 'menubar=no, top=100, left=100, width=300, height=200');
	};

	document.getElementById('openMap').onclick = function () {
		editeur.fenNewMap('formOpenMap');
		//	document.getElementById('fop_idcarte').addEventListener('onClick', this.choisirMap,false);

	};

	socket.on('listeautotile', function (res) {
		console.log('liste auto tile');
		var div = document.getElementsByClassName("selectAutotile"),
			y,
			i;
		div.innerHTML = "";
		for (y = 0; y < div.length; y += 1) {
			for (i = 0; i < res.length; i += 1) {
				div[y].options[div[y].length] = new Option(res[i], res[i]);
			}
		}
	});

	socket.on('listeimg', function (res) {
		console.log('liste image tileset');
		var div = document.getElementById("ficTileset"),
			i;
		div.innerHTML = "";
		for (i = 0; i < res.length; i += 1) {
			div.options[div.length] = new Option(res[i], res[i]);
		}
	});

	socket.on('listetileset', function (res) {

		console.log('liste tileset');
		var div = document.getElementById("fop_idcarte"),
			i;
		div.innerHTML = "";
		for (i = 0; i < res.length; i += 1) {
			console.log(res[i]);
			div.options[div.length] = new Option(res[i], res[i]);
		}
	});
}

Editeur.prototype.choisirMap = function () { // permet de choisir une carte
	this.map.chargerMap();
	unTileset.info_tileset();
	remplirForm();
}

Editeur.prototype.nouvel_carte = function (formu) {
	"use strict";
	this.info = {};
	this.terrain = null;

	var formu = document.getElementById('formulaireNewCarte');
	var nom = formu.elements['nomCarte'].value;
	var hauteur = formu.elements['hauteur'].value;
	var largeur = formu.elements['largeur'].value;
	var taille_tile = formu.elements['tailletile'].value;
	var tileset = formu.elements['idtileset'].value;
	var musique = formu.elements['idBgm'].value;

	this.afficher_image(tileset);

	if (hauteur == null || hauteur < 20) {
		hauteur = 20;
	}

	if (largeur == null || largeur < 20) {
		largeur = 20;
	}

	var hauteur_px = hauteur * 32;
	var largeur_px = largeur * 32;

	// on creer le canvas et on l'attache
	this.canvas = document.createElement("canvas");
	this.canvas.width = largeur_px;
	this.canvas.height = hauteur_px;
	document.getElementsByTagName("currentTab")[0].appendChild(this.canvas);
	this.canvas.setAttribute('id', 'conteiner');
	ctx = this.canvas.getContext('2d');

	//~ canvas.addEventListener('dblclick', this.coord, false);
	//~ 
	//~ canvas.addEventListener('click', this.modifMap, false);

	this.canvas.addEventListener("mousedown", this.selectionmap, false);
	this.canvas.addEventListener("mouseup", this.selectionmap, false);
	this.canvas.addEventListener('dblclick', this.coord, false);

	// canvas.addEventListener('click', suprTile, false);

	//l'overflow de <section> pour pas que le canvas depasse
	var div_section = document.getElementById('page');
	div_section.style.width = this.canvas.width + 20;
	div_section.style.height = this.canvas.height + 30;
	div_section.style.maxWidth = '800px';
	div_section.style.maxHeight = '400px';
	div_section.style.overflow = 'auto';
	var nb_tiles = largeur * hauteur;
	this.terrain = [];

	// on creer les 3 dimensions du tableau avec des null
	for (var i = 0; i < hauteur; i++) {
		this.terrain[i] = new Array();
		for (var g = 0; g < largeur; g++) {
			this.terrain[i][g] = [null, null, null];
		}
	}

	//table = document.createElement("table");
	this.info.nom = nom;
	//div.appendChild(table);
	this.msgConsole('carte créer');
	return {
		nom: nom,
		hauteur: hauteur,
		largeur: largeur,
		taille_tile: taille_tile
	};
};

Editeur.prototype.chargerMap = function (nom) {
	"use strict";
	console.info(tileset);
	this.tileset = new Tileset(tileset);
	this.info = {};
	this.terrain = null;

	// on telecharge le fichier .json
	var xhr = getXMLHttpRequest();
	xhr.open("GET", '../Data/Maps/' + nomMap + '.json', false);
	xhr.send(null);
	if (xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0)) // Code == 0 en local
		throw new Error("Impossible de charger la carte nommée \"" + nomMap + "\" (code HTTP : " + xhr.status + ").");
	var mapJsonData = xhr.responseText;

	// on analyse les donnée recuperée //
	var mapData = JSON.parse(mapJsonData);
	this.terrain = mapData.map;

	this.info = mapData.info || {
		"nom": nomMap,
		"type": "neutre",
		"tileset": ""
	};
	console.log(this.info.nom);

	var hauteur_px = this.terrain[1].length;
	var largeur_px = this.terrain.length;

	// on creer le canvas et on l'attache //
	this.canvas = document.createElement("canvas");
	this.canvas.width = largeur_px * 32;
	this.canvas.height = hauteur_px * 32;
	document.getElementById("page").appendChild(canvas);
	this.canvas.setAttribute('id', 'conteiner');

	this.canvas.addEventListener("mousedown", this.selectionmap, false);
	this.canvas.addEventListener("mouseup", this.selectionmap, false);
	this.canvas.addEventListener('dblclick', this.coord, false);
	//	canvas.addEventListener('click', modifMap, false);
	//	canvas.addEventListener('click', gettileset, true);

	ctx = this.canvas.getContext('2d');

	//l'overflow de <section> pour pas que le canvas depasse
	var div_section = document.getElementById('page');
	div_section.style.width = this.canvas.width + 20;
	div_section.style.height = this.canvas.height + 30;
	div_section.style.maxWidth = '55%';
	div_section.style.maxHeight = '70%';
	div_section.style.overflow = 'auto';
	var nb_tiles = largeur * hauteur;
	msgConsole(this.info.nom + ' > carte charger')
	dessinerMap();
	etat = 'charger';
	//~ i = largeur
	//~ j = hauteur	
}; // fin

Editeur.prototype.saveMap = function () {
	"use strict";
	var xhr = getXMLHttpRequest(); // on instencie la requete xhr
	//alert(js_array_to_php_array (terrain));
	// on verifie qu'on a bien la page
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
			alert(xhr.responseText); // C'est bon \o/
			//	alert(terrain.nom+" enregistrer");
			msgConsole(this.terrain.nom + ' > sauvgarder');
		}
	};

	var donnee = JSON.stringify(this.terrain);
	var infomap = JSON.stringify(this.info);
	var prop = JSON.stringify(passage);
	xhr.open("POST", "include/enregistrerMap.php", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send("donneeMap=" + donnee + "&infomap=" + infomap + "&nom=" + this.info.nom + "&prop=" + prop);
	//	console.log(donnee);
}

Carte.prototype.supprimerMap = function () {
	"use strict";
	if (confirm('etes vous sur de vouloir supprimer')) {
		var xhr = getXMLHttpRequest(); // on instencie la requete xhr
		var i = document.getElementById('idcarte').selectedIndex;
		var fichier = document.getElementById('idcarte').options[i].value;
		// on verifie qu'on a bien la page
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
				msgConsole(fichier + ' > supprimer');
			}
		};

		xhr.open("POST", "delmap.php", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send("fichier=" + fichier);
	} else {
		return false;
	}
	etat = null;
}

Editeur.prototype.setListeTileset = function (data) { // sur le client
	"use strict";
	this.LISTE_TILESET = data;
};

Editeur.prototype.getlistetileset = function () { // vers le serveur
	"use strict";
	socket.emit('getFichierTileset', function (socket) {
		console.log('test :' + socket);
		socket.on('listeFicTileset', function (res) {
			console.info('liste tileset :' + res);
			window.editeur.setListeTileset(res);
			return res;
		});
	});
};

Editeur.prototype.ChangeOnglet = function (onglet, contenu) {
	"use strict";
	document.getElementById('content_1').style.display = 'none';
	document.getElementById('content_2').style.display = 'none';
	document.getElementById('content_3').style.display = 'none';
	document.getElementById(contenu).style.display = 'block';

	document.getElementById('tab_1').className = '';
	document.getElementById('tab_2').className = '';
	document.getElementById('tab_3').className = '';
	document.getElementById(onglet).className = 'active';
};

Editeur.prototype.coord = function (e, div) {
	"use strict";
	var canvas = div || e.target,
		mousex = Math.floor(e.pageX - canvas.offsetLeft + canvas.scrollLeft),
		mousey = Math.floor(e.pageY - canvas.offsetTop + canvas.scrollTop),
		x = Math.floor(mousex / 32),
		y = Math.floor(mousey / 32);
	return {
		"x": x,
		"y": y
	};
};

Editeur.prototype.changeLayout = function (e) {
	"use strict";
	var couche = 'couche' + e;
	document.getElementById('couche1').parentNode.className = '';
	document.getElementById('couche2').parentNode.className = '';
	document.getElementById('couche3').parentNode.className = '';
	document.getElementById('couche4').parentNode.className = '';
	//console.log(e.target.parentNode);
	e.target.parentNode.className = "coucheactive";
	var msg = parseInt(e.target.name) + 1;
	if (e.target.name == 3) {
		msg = "event";
	}
	this.msgConsole("couche " + msg + " selectionner");
	this.layoutSelect = parseInt(e.target.name);
	//console.log(parseInt(layoutSelect)+1);
};

Editeur.prototype.remplirForm = function () {
	"use strict";
	if (document.getElementById('fop_idcarte')) {
		document.getElementById('fop_idcarte').value = "";
		var form = document.getElementById('formOpenMap');
		form.elements['nomCarte'].value = this.nomFicMap;
		form.elements['largeur'].value = terrain.lenght;
		form.elements['hauteur'].value = s.terrain[1].lenght;
		form.elements['idtileset'].value = tileset;
	} else {
		console.log('fop_idcarte n\'est pas present');
	}
};

// dessine une grille sur un canvas
Editeur.prototype.grillage = function (ctx, id) {
	"use strict";
	if (document.getElementById(id)) {
		var longeur = document.getElementById(id).offsetHeight,
			largeur = document.getElementById(id).offsetWidth;

		ctx.lineWidth = 0.5;
		ctx.strokeStyle = "rgb(0,0,0,1)";

		var nbcolone = largeur / 32;
		var nbligne = longeur / 32;
		for (var i = 0; i < nbcolone; i++) {
			ctx.beginPath();
			ctx.moveTo(i * 32, 0);
			ctx.lineTo(i * 32, longeur);
			ctx.stroke();
			ctx.closePath();
		}
		for (var i = 0; i < nbligne; i++) {
			ctx.beginPath();
			ctx.moveTo(0, i * 32);
			ctx.lineTo(largeur * 32, i * 32);
			ctx.stroke();
			ctx.closePath();
		}
		ctx.save();
	}
};


Editeur.prototype.loadFile = function (file) {
	"use strict";
	var xhr = getXMLHttpRequest(); // on instencie la requete xhr

	// on verifie qu'on a bien la page
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
			//  alert(xhr.responseText); // C'est bon \o/
			//document.write = xhr.responseText;

		}
	};

	xhr.open("GET", "include/" + file + ".php", true);
	xhr.send(null);
};

Editeur.prototype.getXMLHttpRequest = function () {
	"use strict";
	var xhr = null;

	if (window.XMLHttpRequest || window.ActiveXObject) {
		if (window.ActiveXObject) {
			try {
				xhr = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
		} else {
			xhr = new XMLHttpRequest();
		}
	} else {
		alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
		return null;
	}

	return xhr;
};


Editeur.prototype.msgConsole = function (msg) {
	"use strict";
	// definition de l'heure
	var jour = new Date();
	var heure = jour.getHours();
	var min = jour.getMinutes();
	// creation des noeuds
	var divconsole = document.getElementById('console');
	var texte = document.createTextNode(heure + ":" + min + " : " + msg);
	var p = document.createElement('p');
	var p2 = document.createElement('small');
	p.appendChild(p2);
	p2.appendChild(texte);
	divconsole.insertBefore(p, divconsole.firstChild);
};

Editeur.prototype.fenNewMap = function (nom) {
	"use strict";
	var popup = document.getElementById('popup');

	// le contenu
	var result = new EJS({
		url: 'views/' + nom
	}).render({
		title: 'ouvrir carte',
		hash: location.hash
	});
	document.getElementById('popup').innerHTML = result;
	//remplirForm();

	// le style
	document.getElementById('filter').style.display = "block"
	popup.style.display = "";
	popup.style.left = ((window.innerWidth - popup.offsetWidth) / 2) + 'px';
	popup.style.top = ((window.innerHeight - popup.offsetHeight) / 2) + 'px';

	//	this.getlisteimg();
	this.getlistetileset();
	//for()
	// document.getElementById('').onclick = function(){
	// this.choisirMap();
	// }
	//this.remplirForm();
};

Editeur.prototype.fen_openMap = function (nom) {
	"use strict";
	var popup = document.getElementById('popup');

	// le contenu
	var result = new EJS({
		url: '../block/' + nom
	}).render({
		title: 'ouvrir carte',
		hash: location.hash
	});
	document.getElementById('popup').innerHTML = result;
	// le style
	document.getElementById('filter').style.display = "block"
	popup.style.display = "";
	popup.style.left = ((window.innerWidth - popup.offsetWidth) / 2) + 'px';
	popup.style.top = ((window.innerHeight - popup.offsetHeight) / 2) + 'px';

};

Editeur.prototype.fermer = function () {
	popup.style.display = "none";
	document.getElementById('filter').style.display = "none";
};

Editeur.prototype.afficher_img = function (img) {
	//console.log(img);
	var div = document.getElementById("tilesetChoisi");
	if (div.firstChild)
		div.removeChild(div.firstChild);
	document.getElementById("formu").style.verticalAlign = 'top';

	var image = document.createElement("img");
	image.setAttribute('src', "../rpgjs/Graphics/Tilesets/" + img + ".png");
	image.setAttribute('alt', img);
	console.log(document.getElementById('popup').offsetHeight);
	div.style.height = '300px';
	div.style.overflow = 'auto';
	div.appendChild(image);
};


//addEventListener('');
Editeur.prototype.lire_musique = function (on) {
	"use strict";
	// faudrait rajouter detection du navigateur pour changer le format en fonction

	var musique = document.getElementById('choisirMusique').value
	sound.src = "../rpgjs/audio/BGM/" + musique + ".ogg";


	if (on == "off") {
		sound.play();
		document.getElementById('btnLire').value = "on";
	} else {
		sound.pause();
		document.getElementById('btnLire').value = "off";
	}
};

function update(e) {
	"use strict";
	var bar = document.getElementById(e.target.id);
	var avant = bar.previousSibling;
	var apres = bar.nextSibling;

	if (e.target.className == 'verti') { // pour la barre vertical
		avant.offsetWidth = e.pageX - avant.offsetLeft;
		apres.offsetX = e.pageY + 2;
	}
	if (e.target.className == 'honri') { // pour la barre honrizontal
		avant.offsetHeight = e.pageY - avant.offsetTop;
		apres.offsetY = e.pageY + 2;
	}

}


function fermersep(bar) {
	console.log(bar.id);

	if (bar.id == 'flechegauche') {
		if (document.getElementById("asideleft").style.display == "none") {
			document.getElementById("asideleft").style.display = "inline-block";
		} else {
			document.getElementById("asideleft").style.display = "none";
		}
	} else if (bar.id == 'flechedroite') {
		if (document.getElementById("sideright").style.display == "none") {
			document.getElementById("sideright").style.display = "inline-block";
		} else {
			document.getElementById("sideright").style.display = "none";
		}
	} else if (bar.id == 'flechebas') {

	}
}

(function () {
	"use strict";
	alert();
	kmrSimpleTabs.init();
	window.editeur = new Editeur();
	console.log("editeur map charger");

	//	var e = document.getElementsByClassName('fleche');
	//	console.log(JSON.stringify(e));
	//	for (var i = 0; i < e.length; i++) {
	//		e[i].onclick = function (e) {
	//			console.log('sparateur');
	//			fermersep(e.target);
	//		}
	//	}
	//	window.onresize = function () {
	//		var tata = document.getElementById('sideright').offsetLeft - document.getElementById('asideleft').offsetWidth - 10;
	//		document.getElementById('corp').style.width = tata + "px";
	//	}
})();