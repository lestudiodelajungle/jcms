/*globals require, module, console, GLOBAL*/

class Controler {
    contructor(model, menu) {
//        this.modele = modele; // bon en fait c'est le schema et non le model
        this.menu = menu;
        this.model = model;
    }
    render(data){

    }
    connect(base) {
        this.modele.connect(base);
    }
    select(table) {
        this.modele.select(table);
    }
    create(data) {
        this.modele.create(data);
    }
    selectId(){
        return this.modele.getOne(req, res);
    }
    selectWhere(req, res) {
        return this.modele.getWhere(req, res);
    }
    selectAll() {
        return this.modele.getAll();
    }
    update(query, data) {
        this.modele.update(query, data);
    }
//    updateAll(query, data) {
//        this.modele.updateAll(query, data);
//    }
    delete(query) {
        this.modele.deleteWhere(query);
    }
//    deleteAll(data) {
//        this.modele.deleteAll(data);
//    }
}

exports.Controler = Controler;
