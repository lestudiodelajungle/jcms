jcms
----

### Details
nom du projet: JCMS
auteur: severin
version: developpement
description: un cms en javascript avec Nodejs et MongoDB

### Introduction
JCMS est un CMS (content manage system) écrit en javascript, tournant sur Nodejs ou io.js, il est inspirer par des cms courant comme wordpress ou drupal, construit autour d'une architecture simple et modulable, il permet d'avoir un systeme simple, flexible, rapide et performent.

Pour plus de detail, visitez le site du projet: http://jcms.severinparthenay.eu

### Licence


### Techno utiliser
jcms est une compilation de couche logiciel et de norme deja existante, le but etant de faliter la prise en main en proposant des technologies qui ont déja fait leur preuve et dont la communautée est plutot active avec une docummentation fournie.


Language: JavaScript (ES6)

Serveur: Node.js ou io.js

Base de donnée: MongoDB

Schemma des modèles: schema JSON (standard)

MVC coté serveur: express.js

Socket: //todo

MVC coté client: Backbone

Gestion DOM: Zepto.js (ou jQuery)


Fonctionalité:
- gestion de module
- API REST Full

### Installation
#### Solution 1 (manuel)
Prérequis:  npm, Nodejs ou io.js

- Télécharger l'archive sur la page github du projet
- decompresser l'archive dans le dossier voulu
- installer des module npm avec commande
''' 
npm install
'''
- lancé le script app.js avec la commande
'''
node --harmony app.js
'''
ps: noter l'utilisation du flag --harmony pour utiliser la norme ES6, inutile avec io.js

#### Solution 2 (Docker)
Prérequis: docker
//todo

### Log
Plusieurs niveau de log sont disponible:

error: 0, affiche les erreur qui empeche le code de fonctionner normalement
warn: 1, affiche les erreur qui n'empeche pas le code de continué
info: 2, affiche les message d'info concernant les script
verbose: 3, affiche les message inutiles
debug: 4, affiche les message concernant un debugage ponctuel
silly: 5, affiche les message encore plus inutiles que verbose

Les logs sont affiché dans la console qui lance le serveur et sont enregister dans un fichier log spécifique (definit dans un fichier config)