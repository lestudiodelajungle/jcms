class Database {
    this.db;
    connect() {
        var self = this;
        return this.mongo.connect("mongodb://localhost:27017/jcms").then(function (db) {
            self.db = db;
            return db;
        }).catch(function (err) {
            log.error(err.stack);
            throw new Error(err);
        });
    }
}
