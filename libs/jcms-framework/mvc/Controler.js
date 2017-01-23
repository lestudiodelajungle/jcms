/*globals require, module, console, GLOBAL*/

class Controler {
    contructor() {
        this.modele = modele; // bon en fait c'est le schema et non le model
    }
    connect(base) {
        return this.modele.connect(base);
    }
    from(table) {
        this.modele.from(table);
    }
    create(data) {
        this.modele.create(data);
    }
    selectWhere(req, res) {

        return this.modele.get(req, res);
    }
    selectAll() {
        return this.modele.selectAll();
    }
    updateWhere(query, data) {
        this.modele.updateWhere(query, data);
    }
    updateAll(query, data) {
        this.modele.updateAll(query, data);
    }
    deleteWhere(query) {
        this.modele.deleteWhere(query);
    }
    deleteAll(data) {
        this.modele.deleteAll(data);
    }
}

exports.Controler = Controler;
