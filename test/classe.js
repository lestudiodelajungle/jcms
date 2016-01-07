var myValues = [1, 2, 3, 4, 5];

var squared = myValues.map(x => x * x);
console.log(squared); //-> [1, 4, 9, 16, 25]

//définition d'un function qui permet de déterminer si n nombre est pair
var even = (x) => x % 2 == 0;
var evenValues = myValues.filter(even);
console.log(evenValues); //-> [2, 4]
