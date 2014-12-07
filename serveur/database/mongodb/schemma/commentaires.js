var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var commentaireArticleSchema = new mongoose.Schema({
  pseudo : { type : String, match: /^[a-zA-Z0-9-_]+$/ },
  contenu : String,
  date : { type : Date, default : Date.now }
});

var schemma = new mongoose.Schema({
    auteur: Schema.ObjectId,
    contenu: String,
    date: {
        type: Date,
        default: Date.now
    },
    commentaires: [commentaireArticleSchema],
    votes: {
        plus: {
            type: Number,
            min: 0
        },
        moins: {
            type: Number,
            min: 0
        }
    }
});



module.exports.schemma = schemma;