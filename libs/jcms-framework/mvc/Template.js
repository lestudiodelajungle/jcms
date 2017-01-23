/* cette classe sert à généré un template à partir de certaine données */
/*jslint nomen: true, es5: true*/
/*globals exports, require, dirRoot, console, RSVP, rsvp, fs, promises*/
(function (exports) {
    "use strict";
    var rsvp = require("rsvp"),
        fs = require("fs"),
        ejs = require("ejs");

    function Template(filePath, options, callback) {
        this.list = []; //require(dirRoot + "/config/template.json"); // liste des bloc
        this.block = []; // liste les contenu des bloc
        this.html = ""; // le rendu final

        //console.log("tata + " + filePath);
        var promises,
            layoutPath,
            data = options,
            t2 = "tututut";
        this.layoutPath = dirRoot + '/modules/core/public/view/layout.html';


        if (options.admin && options.admin === true) {

            this.layoutPath = dirRoot + '/modules/core/admin/view/layout.html';
        }

        this.init("/" + filePath);
        layoutPath = this.layoutPath;
        // console.log("toto+ " + this.layoutPath);
        promises = this.list.map(this.loadFile);
        rsvp.all(promises).then(function (files) {
            // proceed - files is array of your files in the order specified above.

            var t1 = ejs.render(files[1]); //la vue
            data = {
                body: t1,
                filename: layoutPath
            };

            t2 = ejs.render(files[0], data); //layout.html

            return callback(null, t2);
        }).catch(function (reason) {
            console.log(reason); // something went wrong...
            return callback(null, reason);
        });

        //return callback(null, "zezeze");
    }



    Template.prototype.init = function (filePath) {
        this.list.push(this.layoutPath);
        this.list.push(filePath);
    };
    /*
        Template.prototype.init2 = function (liste) {
        var i;
        for (i in liste) {
        if (liste.hasOwnProperty(i)) {
        if (liste[i].toType() === "object") {
        this.init(liste[i]);
        } else {
        this.bloc.push(this.loadFile(liste[i]));
        }
        }
        }
        };
        */
    Template.prototype.loadFile = function (path) {
        return new rsvp.Promise(function (resolve, reject) {
            fs.readFile(path, 'utf8', function (error, data) {
                if (error) {
                    reject(error);
                }
                resolve(data);
            });
        });
    };

    /**
     * ajoute un bloc de contenu à la liste de bloc
     * @param {Number} ordre place à laquelle ont doit placer le nouveau bloc
     * @param {String} bloc  bloc de texte ou le nom du fichier
     */
    Template.prototype.addBlock = function (bloc) {

    };

    /**
     * supprimer un bloc de la liste
     * @param {Number} id numero du ploc à supprimer
     */
    Template.prototype.delBloc = function (id) {

    };

    /**
     * genere le template a partir du tableau de bloc
     * @returns {String} html de la page
     */
    Template.prototype.generate = function () {

        return this.html;
    };

    exports.Template = Template;
}(exports));

/*
	/-layout
		/-head
		/-header
		/-aside left
		/-content
		/-aside right
		/-footer
	--->
	{
		layout: {
			head
			header
			wrapper: {
				aside left
				content
				aside right
			}
			footer
		}
	}
	-->
	{
		"layout": "view/layout.html",
		"head": "view/head.html",
		"wrapper": {
			"aside left": "view/aside.html",
			"content": "view/content.html",
			"aside right": "view/aside.html"
		},
		"footer": "view/footer.html"
	}
*/
