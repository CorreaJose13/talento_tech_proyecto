'use strict'

var express = require('express');
var AuthorController = require('../controllers/author') ;

var api = express.Router();

api.post('/saveAuthor', AuthorController.saveAuthor);
api.get('/author/:name', AuthorController.getAuthor);
api.get('/authors', AuthorController.getAuthors);
api.put('/updateAuthor/:name', AuthorController.updateAuthor);
api.delete('/deleteAuthor/:name', AuthorController.deleteAuthor);


module.exports = api;