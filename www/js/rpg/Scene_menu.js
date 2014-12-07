function Menu() {
	"use strict";
	jeux = 'menu';

	this.fenetre = new Window(1, 1, 75, 75);
	unrpg.scene.fenetres['main'] = this.fenetre;
	this.fenetre.addButton('objet', 'objet', 60, 20, 5, 10);
	this.fenetre.addButton('quitter', 'quitter', 60, 20, 5, 40);
	this.render(unrpg.scene.ctx);
}

Menu.prototype.main = function () {
	"use strict";
}

Menu.prototype.objet = function () {
	"use strict";
}

Menu.prototype.action = function (action) {
	"use strict";
}

Menu.prototype.render = function (ctx) {
	"use strict";
	ctx.fillStyle = this.fenetre.fond;
	ctx.clearRect(0, 0, this.fenetre.width, this.fenetre.height);
	ctx.fillRect(this.fenetre.posx, this.fenetre.posy, this.fenetre.width, this.fenetre.height);
	ctx.strokeStyle = 'green';
	ctx.strokeRect(this.fenetre.posx, this.fenetre.posy, this.fenetre.width - 1, this.fenetre.height - 1);

	// les boutton
	var t = 0;
	for (var i in this.fenetre.button) {
		this.fenetre.button[i];
		ctx.fillStyle = this.fenetre.fondb;
		ctx.fillRect(this.fenetre.button[i].x, this.fenetre.button[i].y, this.fenetre.button[i].sx, this.fenetre.button[i].sy);
		ctx.strokeStyle = this.fenetre.borderb;
		ctx.strokeRect(this.fenetre.button[i].x - 1, this.fenetre.button[i].y - 1, this.fenetre.button[i].sx + 1, this.fenetre.button[i].sy + 1);
		ctx.fillStyle = 'black';
		ctx.fillText(this.fenetre.button[i].label, this.fenetre.button[i].x + 7, this.fenetre.button[i].y + 12);
		t++;
	}
}

Menu.prototype.close = function (obj) {
	"use strict";
	for (key in obj) {
		obj[key] = null;
	}
}