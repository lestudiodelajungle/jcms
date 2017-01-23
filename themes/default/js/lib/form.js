function Form(div) {
	"use strict";
	var defaultAttribut = {
        "type": "",
        "title": "",
        "validators": [],
        "help": "",
        "editorClass": "",
        "editorAttrs": "",
        "fieldClass": "",
        "fieldAttrs": "",
        "template": "",

    };
	this.data = {
        "Text": {
            "type": "",
            "title": "",
            "validators": [],
            "help": "",
            "editorClass": "",
            "editorAttrs": "",
            "fieldClass": "",
            "fieldAttrs": "",
            "template": "",
            "dataType": ""
        },
        "Number": {
            "type": "",
            "title": "",
            "validators": [],
            "help": "",
            "editorClass": "",
            "editorAttrs": "",
            "fieldClass": "",
            "fieldAttrs": "",
            "template": "",

        },
        "Password": {
            "type": "",
            "title": "",
            "validators": [],
            "help": "",
            "editorClass": "",
            "editorAttrs": "",
            "fieldClass": "",
            "fieldAttrs": "",
            "template": "",

        },
        "TextArea": {
            "type": "",
            "title": "",
            "validators": [],
            "help": "",
            "editorClass": "",
            "editorAttrs": "",
            "fieldClass": "",
            "fieldAttrs": "",
            "template": "",

        },
        "Checkbox": {
            "type": "",
            "title": "",
            "validators": [],
            "help": "",
            "editorClass": "",
            "editorAttrs": "",
            "fieldClass": "",
            "fieldAttrs": "",
            "template": "",

        },
        "Checkboxes": {
            "type": "",
            "title": "",
            "validators": [],
            "help": "",
            "editorClass": "",
            "editorAttrs": "",
            "fieldClass": "",
            "fieldAttrs": "",
            "template": "",

        },
        "Hidden": {
            "type": "",
            "title": "",
            "validators": [],
            "help": "",
            "editorClass": "",
            "editorAttrs": "",
            "fieldClass": "",
            "fieldAttrs": "",
            "template": "",

        },
        "Select": {
            "type": "",
            "title": "",
            "validators": [],
            "help": "",
            "editorClass": "",
            "editorAttrs": "",
            "fieldClass": "",
            "fieldAttrs": "",
            "template": "",
            "options": ""
        },
        "Radio": {
            "type": "",
            "title": "",
            "validators": [],
            "help": "",
            "editorClass": "",
            "editorAttrs": "",
            "fieldClass": "",
            "fieldAttrs": "",
            "template": "",

        },
        "Object": {
            "type": "",
            "title": "",
            "validators": [],
            "help": "",
            "editorClass": "",
            "editorAttrs": "",
            "fieldClass": "",
            "fieldAttrs": "",
            "template": "",

        },
        "NestedModel": {
            "type": "",
            "title": "",
            "validators": [],
            "help": "",
            "editorClass": "",
            "editorAttrs": "",
            "fieldClass": "",
            "fieldAttrs": "",
            "template": "",

        },
        "Date": {
            "type": "",
            "title": "",
            "validators": [],
            "help": "",
            "editorClass": "",
            "editorAttrs": "",
            "fieldClass": "",
            "fieldAttrs": "",
            "template": "",

        },
        "DateTime": {
            "type": "",
            "title": "",
            "validators": [],
            "help": "",
            "editorClass": "",
            "editorAttrs": "",
            "fieldClass": "",
            "fieldAttrs": "",
            "template": "",

        },
        "List": {
            "type": "",
            "title": "",
            "validators": [],
            "help": "",
            "editorClass": "",
            "editorAttrs": "",
            "fieldClass": "",
            "fieldAttrs": "",
            "template": "",

        }
	};
	this.div = div; // le div du form
	this.typeInput = ["test", "textarea", "number", "checkbox", "select"]; // liste des input disponible
	this.input = []; // liste des inputs créer
	this.data = {}; // le formulaire en json
}

Form.prototype.init = function () {
	"use strict";
	window.console.log("test");
};

Form.prototype.charger = function (formulaire) { // json --> formulaire
	"use strict";
	/**
	 * effacer tout le formulaire
	 * faire une boucle sur l'objet
	 *      si c'est une option de balise select
	 *      sinon on ajoute simplement
	 *
	 **/
};

Form.prototype.transfrom = function () {
	"use strict";
	/**
	 * parcourire tous les enfants
	 *      ajouter le nom de la balise comme clé
	 *      et le reste dans la valeur
	 * stocker dans this.data
	 **/
};

Form.prototype.envoyer = function () {
	"use strict";
	window.jcms.socket.emit("modele", {
		nomModel: this.data.nom,
		data: this.data
	});
};

Form.prototype.addInput = function (type) { // créer un input
	"use strict";
	var input = document.CreateElement(type);
	this.input.push(input);
};

Form.prototype.addOption = function (select) {
	"use strict";
	// je sais plus
};

Form.prototype.demander = function (input) {
	"use strict";
	input.name = window.prompt("quelle nom pour la balise");
	input.value = window.prompt("quelle valeur par defaut");
	var obligatoire = 0; // je sais plus
};
