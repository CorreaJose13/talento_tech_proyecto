'use strict'

var express = require('express');
var BookController = require('../controllers/book') ;

var api = express.Router();

api.post('/saveBook', BookController.saveBook);
api.get('/book/:isbn', BookController.getBook);
api.get('/books/', BookController.getBooks);
api.put('/updateBook/:isbn', BookController.updateBook);
api.delete('/deleteBook/:isbn', BookController.deleteBook);

module.exports = api;