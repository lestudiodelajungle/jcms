
// module Controler page
/*globals require, global, module, define, log*/
var ctl = framework.Controler;
var menu = {}; //TODO regler ce probleme; je devrait pas avoir besoin de ca, mais un "menu": this.menu ne marche pas

class Controler extends ctl{
    constructor(leMenu) {
        super(leMenu);
    }
    index(req, res) {
        render(res, "block/admin-index", {});
    }
    admin(req, res) {
        render(res, "block/admin-index", {
            "layout": "admin",
            "menu": menu
        });
    }
    render(res, tmp, data){
        res.render(tmp, data);
    }
}
module.exports = Controler;
