// module controller page
/*globals require, global, module, define, console*/

class Controler {
    constructor() {

    }
    displayPage(name) {
        return name;
    }
    getPage(name) {
        console.log(JSON.stringify(require("./public/view/" + name + ".html")));
        //return {content: require("./public/view/" + name + ".html")};
    }
    displayAdmin() {

    }
}
module.exports = Controler;
