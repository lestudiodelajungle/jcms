var Model = require("./mvc/Model");
// methode 1
var m = new Model("test");
//m.connect("test")
//    .then((db) => {
//        m.select("page");
//        return m.getAll()
//    })
//    .then((res) => {
//        console.log(res);
//        m.deconnect();
//    })
//    .catch((error) => {
//        console.log(error);
//    });

// methode 2

//var db = m.connect("test");
//
//var col = db.then((db) => {
//    m.db = db;
//    m.select("page");
//    return m.getAll();
//});
//
//
//col.then((res) => {
//    console.log(res);
//});



//var db = m.connect("test");
//
//var col = db.then((db) => {
//    m.select("page");
//    return m.getAll();
//});
//
//
//
//col.then((res) => {
//    console.log(res);
//});

m.connect();

m.select("page");

m.getAll().then((res)=>{
    console.log(res);
});

m.deconnect();

