'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = Schema({
    isbn: String,
    title: String,
    author: {type: String, ref: 'Author'},
    edition_date: Date,
    num_pages: String,
    total_copies: String,
    available_copies: String,
    synopsis: String,
    presentation_type: String,
    literature_type: String
    
});

module.exports = mongoose.model('Book', BookSchema);