function Event(){
	var global = {}; // les event global a tout le jeux
	var events = {}; // les event de la map
}


Event.prototype.add = function(perso,action){
	events[perso.id] = action
}

Event.prototype.exec = function(perso,action){
	for(var i in action){
		call(events[perso.id].action.i)
	}
}

Event.prototype.box = function(msg){
	alert(msg);
}