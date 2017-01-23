(function () {
	"use strict";

	function App() {

	}

	App.prototype.init = function () {

	};

	App.prototype.chargerModule = function (nom) {
		require(nom);
	};

}());
