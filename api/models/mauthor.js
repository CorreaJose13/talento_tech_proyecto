'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AuthorSchema = Schema({
    name: {type: String, unique: true},
    surname: String,
    publication_date_first_book: Date,
    awards: String,
    birth_date: Date,
    death_date: Date
});

module.exports = mongoose.model('Author', AuthorSchema);