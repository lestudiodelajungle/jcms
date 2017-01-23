
// module Controler page
/*globals require, global, module, define, log*/
var ctl = framework.Controler;
var menu = {}; //TODO regler ce probleme; je devrait pas avoir besoin de ca, mais un "menu": this.menu ne marche pas

class Controler {
    constructor(leMenu) {
        menu = leMenu;
    }
    index(req, res) {
        console.log('======----=======------======----=====----====----===----=====----=====-----=====----=====');
        res.render("block/index", {
            "layout": "layout",
            "menu": menu
        });
    }
    admin(req, res) {
        res.render("block/admin-index", {
            "layout": "admin",
            "menu": menu
        });
    }
}
module.exports = Controler;
