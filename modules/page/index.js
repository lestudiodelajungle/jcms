/*globals module, require, log, dirRoot, exports, __dirname*/

var Module = framework.Module;

class Page extends Module {
    constructor(app) {
        super("page", app); // pour appeler le construceur parent, y'en a besoin sinon this n'est pas definis

    }
};
module.exports = Page;
