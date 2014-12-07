/*
	humain = z
	ordi = 90
	90 = action
	player.deplacer(DIRECTION.BAS, map);
*/

function Input(ctx) {
	"use strict";
	/*globals window, document, console*/
	this.ctx = ctx;
	this.clavier = { // lettre => numero
		'A': 65,
		'B': 66,
		'C': 67,
		'D': 68,
		'E': 69,
		'F': 70,
		'G': 71,
		'H': 72,
		'I': 73,
		'J': 74,
		'K': 75,
		'L': 76,
		'M': 77,
		'N': 78,
		'O': 79,
		'P': 80,
		'Q': 81,
		'R': 82,
		'S': 83,
		'T': 84,
		'U': 85,
		'V': 86,
		'W': 87,
		'X': 88,
		'Y': 89,
		'Z': 90,
		'ENTER': 13,
		'ESC': 27,
		'SPACE': 32,
		'LEFT': 37,
		'UP': 38,
		'RIGHT': 39,
		'DOWN': 40
	};

	this.Z = 90;
	this.S = 83;
	this.Q = 81;
	this.D = 68;
	
	window.onkeypress = function (e) {
		this.touche(e);
	}.bind(this);
	console.log('inpuut');
}

Input.prototype.add = function (event, e, action) {
	"use strict";
	console.log('inpuut');
	if (event == 'onkeydown') {
		this.cmd[e] = window;
		this.cmd[e].onkeydown = function (e) {
			//	console.log('touche 2'+e);
			Input.prototype.touche(e);
		};
	} else if (event == 'onclick') {
		this.cmd[e] = window;
		this.cmd[e].onclick = function (e) {
			Input.prototype.mouse(e);
		};
	}
};

Input.prototype.remove = function (event, e, action) {
	"use strict";
	if (e == 'onkeydown') {
		this.cmd[event].onkeydown = null;
	} else if (e == 'onclick') {
		this.cmd[event].onclick = null;
	}
};

Input.prototype.touche = function (event) {
	"use strict";
	var e = event || window.event;
	var key = e.which || e.keyCode;
	console.log('inpuut : ' + key);
	//	var player = unrpg.scene.map.player;
	//	var map = unrpg.scene.map;
	//	console.log('test 3 '+player);
	for (var i in this.cmd) {
		if (this.cmd.hasOwnProperty(i)) {
			for (var j = 0; j < this.cmd[i].length; j++) {
				this.ctx.map.player.deplacer(DIRECTION.BAS, this.ctx.map);
			}
		}
	}

	return false;
}

Input.prototype.mouse = function (e) {
	var x = Math.floor(e.pageX - canvas.offsetLeft);
	var y = Math.floor(e.pageY - canvas.offsetTop);
	for (var i in menu.button) {
		if (menu.button[i]) {
			if (x >= menu.button[i].x && x <= menu.button[i].x + menu.button[i].sx && y >= menu.button[i].y && y <= menu.button[i].y + menu.button[i].sy) {
				console.log(menu.button[i].label);
				fenopen = fenetres[menu.button[i].action] || new Window(1, 1, 75, 75);
			}
		}
	}
};


Input.prototype.menu = function (event) {

};