function s(valeur1, valeur2){
	if(!valeur2){
		return localStorage[valeur1];
	}else if(veleur1){
		localStorage[valeur1] = valeur2;
		return true;
	}else{
		console.log('erreur localstorage');
		return false;
	}
}


// var s = new localstorage();
// s('dfdf')