jcms
====

=== details ===
nom du projet: JCMS
auteur: severin
version: developpement
description: un cms en javascript avec Nodejs et MongoDB

=== INTRODUCTION ===
JCMS est comme son nom l'indique un CMS (content manage system) écris entièrement en JavaScript
l'idée m'es venu lors du develloppement d'un autre projet ou j'avais besoin d'un serveur nodejs
et d'un site pour l'encadrer, et je ne voulais pas utiliser deux serveurs pour faire fonctionner
le tout (php pour le site et nodejs pour le jeux).

le systeme de JCMS repose sur le principe de noeuds (un peu comme drupal) en effet chaque model
de donnée peut etre considéré comme un noeud, un noeud peu tres bien etre un article, une page,
un client.

un noeud est constitué de plusieurs propriété qui sont elle même representé par un index (son nom)
et par une valeur qui peuvent etre une chaine, un nombre, une date, voir une liste de valeur ou
meme un autre noeud.


- Exemple de fonction anonyme 

/*globals exports*/
(function (exports) {
	"use strict";

}(exports));

jcms est une compilation de framework et de quelque script fait maison

Serveur: node.js
MVC coté serveur: express.js
MVC coté client: Backbone
Base de donnée: MongoDB
Schemma des modele: schema JSON (standard)

Fonctionalité:
- gestion de module
- API REST Full


niveau de log
warn: affiche les erreur
debug: affiche les info de debugage
info: affiche les info/event du serveur