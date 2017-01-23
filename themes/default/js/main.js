/*	script charger par require.js,
	c'est le premier script qui est charger
	il initialise la variable jcms = new JCMS() à partir de "new MVC()""
*/
(function () {
	"use strict";
	/*globals $, window, EJS, Router,location, document, Backbone, require, exports, console, process  */

	var path = {
		// librairie
		'jQuery': 'lib/jquery',
		'zepto': 'lib/zepto',
		'ejs': 'lib/ejs', // templates
		'bootstrap': 'lib/bootstrap',
		'hulk': 'lib/hulk',

		// MVC
		'underscore': 'lib/underscore',
		'backbone': 'lib/backbone',

		// partie publique
		'model': 'modeles/model',
		'route': 'routes/route',
		'view': 'vues/view',
		'collection': 'collections/collection',

		// rpg
		'rpg': 'rpg',
		'tile': 'rpg/Tileset',
		'scene': 'rpg/Scene',
		'core': 'rpg/Core',
		'map': 'rpg/Map',
		'perso': 'rpg/Personnage',
		'window': 'rpg/Window',
		'menu': 'rpg/Scene_menu',
		'sound': 'rpg/Sound',
		'input': 'rpg/Input',
		'network': 'rpg/Network',
		'manette': '',

        //l'editeur
		'editeur_map': 'mapMaker/editeur_map',
		'tileset': 'mapMaker/Tileset',
		'carte': 'mapMaker/Carte',

		'form': 'lib/form',
		'panneau': 'panneau', // main parti admin
		'app': 'app', // main parti public
		'tabs': 'lib/simpletabs',
		'socket': '../../socket.io/socket.io', // temps réel
		'localstorage': 'lib/backbone-localstorage', //localstorage
		'backbone-forms': 'lib/backbone-form',
		'list': 'lib/list.min',
        'nav': 'modules/nav'
	},
	shim = {
		'jQuery': {
			exports: '$'
		},
		'underscore': {
			exports: '_'
		},
		'zepto': {
			exports: '$'
		},
		"backbone": {
			deps: ['underscore', 'jQuery'], // remetre jquery plutot que zepto si ya des probleme
			exports: 'Backbone'
		},
		"localstorage": {
			deps: ['backbone']
		},
		"backbone-forms": {
			deps: ['backbone']
		},
		"list": {
			deps: ['backbone']
		},
		"bootstrap": {
			deps: ['jQuery']
		},
		"app": {
			deps: ['socket', 'jQuery', 'model', 'collection', 'route', 'view']
		},
		"hulk": {
			deps: ['jQuery']
		},
		"model": {
			deps: ['backbone', 'localstorage']
		},
		"collection": {
			deps: ['backbone', 'localstorage']
		},
		"route": {
			deps: ['backbone', 'localstorage']
		},
		"adroute": {
			deps: ['backbone', 'localstorage']
		},
		"view": {
			deps: ['backbone', 'localstorage']
		},
		"adview": {
			deps: ['backbone', 'localstorage']
		},
		"editeur_map": {
			deps: ['tileset', 'carte', 'tabs', 'socket']
		},
		"rpg": {
			deps: ['core', 'network', 'tile', 'map', 'scene', 'perso', 'menu', 'window', 'input']
		}
	};

	require.config({
		//baseUrl: "./www",
		paths: path,
		shim: shim
	});

	// on charge MVC
	require(['nav', 'form', 'jQuery', 'ejs', 'localstorage', 'hulk', 'backbone-forms', 'bootstrap'], function () {

	});
}());
