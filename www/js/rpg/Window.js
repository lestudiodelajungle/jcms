// canvas = document.getElementById('rpg');
// ctx = canvas.getContext('2d');
// button = {
// "nom": {
// 'label': label,
// 'x': coordx,
// 'y': coordy,
// 'width': width,
// 'height':height,
// 'action': action
// }
// }
// class window
function Window(ctx, posx, posy, taillex, tailley, title) {
	"use strict";
	/*globals console*/
	this.ctx = ctx;
	this.title = "" || title;
	this.posx = 0 || posx;
	this.posy = 0 || posy;
	this.width = taillex || 100;
	this.height = tailley || 100;
	this.fond = 'grey';
	this.border = 'green';
	this.fondb = 'red';
	this.borderb = 'blue';
	this.ctx.fillStyle = this.fond;

	this.borderWidth = 1;
	this.canvasWidth = 400;
	this.canvasHeight = 300;
	this.width = (this.width * this.canvasWidth) / 100;
	this.height = (this.height * this.canvasHeight) / 100;

	this.ctx.clearRect(0, 0, this.width, this.height);
	this.ctx.fillRect(this.posx, this.posy, this.width, this.height);
	this.button = {};
	this.subwindow = {};
	console.log('nouvelle fenetre');

}

Window.prototype.rendu = function(){
	this.ctx.restore();
	this.ctx.fillStyle = this.fond;
	this.ctx.strokeStyle = this.border;
	this.ctx.rect(this.posx, this.posy, this.width, this.height);
	this.ctx.fillText(this.title, 10, 10, 150);
}

// s = size; c = coordonnées
Window.prototype.addButton = function (nom, label, sx, sy, cx, cy, action) {
	"use strict";
	this.ctx.fillStyle = 'red';
	this.button[nom] = {
		'label': label,
		'x': cx,
		'y': cy,
		'sx': sx,
		'sy': sy
	};
};

Window.prototype.get = function ( /** String */ param) {
	"use strict";
	var i,
		res = {};
	if (param) {
		if (this.hasOwnProperty(param)) {
			res = param;
		}
	} else {
		for (i in this) {
			if (this.hasOwnProperty(i)) {
				res[i] = this[i];
			}
		}
	}
	return res;
};

Window.prototype.set = function (param /** Object, String*/ , value /** String, int*/ ) {
	"use strict";
	var i,
		res = {};
	if (typeof param != {}) {
		if (this.hasOwnProperty(param)) {
			this[param] = value;
		} else {
			console.log("la propriété " + param + " n'existe pas")
		}
	} else {
		for (i in param) {
			if (this.hasOwnProperty(i)) {
				this[i] = param[i];
			} else {
				console.log("la propriété : " + +" n'existe pas")
			}
		}
	}
};



// 0 - largeur
// 70 - 100