// module controller page
/*globals require, global, module, define, log*/

class Controler {
    constructor() {

    }
    displayPage(name) {
        return name;
    }
    getPage(name) {
        log.log(JSON.stringify(require("./public/view/" + name + ".html")));
        //return {content: require("./public/view/" + name + ".html")};
    }
    displayAdmin() {

    }
}
module.exports = Controler;
