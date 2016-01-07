
	var map = new Array(); // le tableau a 2 dimension qui represente le "monde"

	var canvas = document.getElementById('rpg');
	var width = canvas.offsetWidth/30;
	var height = canvas.offsetHeight/30;
	var tab = new Array();
	var start = false;

	for(var i =0; i < width;i++){
		tab.push(0);
	}

	for(var i = 0; i < height-1; i++){
		map[i] = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
	}

	var ctx = canvas.getContext('2d');

	grillage(ctx, 'rpg');

	canvas.onclick = function(e){
	    var x = Math.floor((e.pageX - canvas.offsetLeft) / (30));
	    var y = Math.floor((e.pageY - canvas.offsetTop) / (30));
	//   console.log(map[y] + " - " + x + " - " + y);
	//console.log(map[y][x]);
	    if (map[y][x] == 1) {
	        map[y][x] = 0;
	    } else {
		//	console.log(map[y] + " - " + x + " - " + y);
	        map[y][x] = 1;
	    }
		refresh(map, ctx);
	}

	document.getElementById("start").addEventListener("onclick", refresh, false);


	function start() {
	    window.setInterval(refresh, 10);
	}

	// y,x
	function law(y,x){
		var compt = 0;
		var haut = y-1;
		var bas = y+1;
		var gauche = x-1;
		var droite = x+1;;
	//	var y=a;
	//	var x=b;

		if(x == 0){
			gauche = map[0].length-1;
		}

		if(x == map[0].length-1){
			droite = 0;
		}

		if(y == 0){
			haut = map.length-1;
		}

		if(y == map.length-1){
			bas = 0;
		}
		console.log(haut+" - "+bas+"-"+gauche+"-"+droite);
		if(map[y][x] == 1){
			compt = map[haut][gauche]+map[haut][x]+map[haut][droite]+map[y][gauche]+map[y][droite]+map[bas][gauche]+map[bas][x]+map[bas][droite];
			console.log("compt : "+compt);
			if(compt == 2 || compt == 3){
				map[y][x] = 1;
			}else{
				map[y][x] = 0;
			}
		}else{
			compt = map[haut][gauche]+map[haut][x]+map[haut][droite]+map[y][gauche]+map[y][droite]+map[bas][gauche]+map[bas][x]+map[bas][droite];
			console.log("compt : "+compt);
			if(compt == 3){
				map[y][x] = 1;
			}
		}
	}

	function refresh(map, ctx){
	    for (var y = 0; y < map.length; y++) {
	        for (var x = 0; x < map[y].length; x++) {
				if(start == true){
					law(y,x);
				}

				if(map[y][x] == 'undefined'){
					map[y][x] = 0;
				}
				if(map[y][x] == 1){
					ctx.fillStyle = "green";
					ctx.fillRect(x*30, y*30, 30, 30);
				}
				if(map[y][x] == 0){
					ctx.fillStyle = "red";
					ctx.fillRect(x*30, y*30, 30, 30);
				}
			}
	    }
		grillage(ctx, 'rpg');
	}



	function grillage(ctx, id) {
	    if (document.getElementById(id)) {
	        var longeur = document.getElementById(id).offsetHeight;
	        var largeur = document.getElementById(id).offsetWidth;

	        ctx.lineWidth = 0.5;
	        ctx.strokeStyle = "rgb(250,250,250,1)";

	        var nbcolone = largeur / 30;
	        var nbligne = longeur / 30;

	        for (var i = 0; i < nbcolone; i++) {
	            ctx.beginPath();
	            ctx.moveTo(i * 30, 0);
	            ctx.lineTo(i * 30, longeur);
	            ctx.stroke();
	            ctx.closePath();
	        }
	        for (var i = 0; i < nbligne; i++) {
	            ctx.beginPath();
	            ctx.moveTo(0, i * 30);
	            ctx.lineTo(largeur * 30, i * 30);
	            ctx.stroke();
	            ctx.closePath();
	        }
	        ctx.save();
	    }
	}
