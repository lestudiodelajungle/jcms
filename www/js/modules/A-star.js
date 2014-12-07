///////////////////////////////////////////////////////////////////////////////
// http://khayyam.developpez.com/articles/algo/astar/
//
///////////////////////////////////////////////////////////////////////////////

function A*(map, obstacle, depart, dest){
	this.map = map;
	this.obstacle = obstacle;

	this.depx = depart.x;
	this.depy = depart.y;
	
	this.destx = dest.x;
	this.testy = dest.y;
	
	this.noeud = {}; // le noeud courant
	this.listeOuverte = new Array(); // les noeud adjacents
	this.listeFermer = {}; // le chemain
	this.distance; // distance a vol d'oiseau
	// On commence par le noeud de départ, c'est le noeud courant	
	this.noeud = {'x': this.dest.x,'y': this.dest.y}; // le noeud courant
	this.getadjacent();

	// si un noeud voisin est déjà dans la liste ouverte, on met à jour la liste ouverte si le noeud dans la liste ouverte a une moins bonne qualité (et on n'oublie pas de mettre à jour son parent)
	
	// sinon, on ajoute le noeud voisin dans la liste ouverte avec comme parent le noeud courant
	// On cherche le meilleur noeud de toute la liste ouverte. Si la liste ouverte est vide, il n'y a pas de solution, fin de l'algorithme
	// On le met dans la liste fermée et on le retire de la liste ouverte
	// On réitère avec ce noeud comme noeud courant jusqu'à ce que le noeud courant soit le noeud de destination.
}

A*.prototype.getadjacent = function(){
	var res = {};

	for(var y = this.noeud.y-1;y<this.noeud.y+1;y++){
		for(var x = this.noeud.x-1;x<this.noeud.x+1;x++){
			if(this.map[this.noeud.y][this.noeud.x] == 'undefined'){
				// existe pas
			}else if(this.obstacle[this.noeud.y][this.noeud.x] != 0){
				// c'est un obstacle
			}else if(this.listeFermer[this.noeud.y+this.noeud.x != 'undefined']{
				// il est deja present dans la liste fermer
			}else if(this.listeOuverte[this.noeud.y+this.noeud.x != 'undefined'){
				if(this.euclide(this.noeud.x, this.noeud.y) > this.euclide()){
				
				}
			}else{
				this.listeOuverte[] = {};
			}
			
			if(this.listeOuverte.length = 0){ // si ya pas de noeud dans la liste ouverte alors ya pas de solution
				return false;
			}
		}
	}
}

A*.prototype.euclide(a,b){
	var result = Math.sqrt(Math.pow(a.x-b.x,2)+Math.pow(a.y+b.y,2));
	return result;
}