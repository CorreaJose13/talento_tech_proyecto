'use strict'

var Book = require('../models/mbook');

async function saveBook(req, res) {
    var book = new Book();
    var params = req.body;

    if (params.isbn && params.title && params.author && params.edition_date && params.num_pages && params.total_copies && params.available_copies && params.synopsis && params.presentation_type && params.literature_type) {
        book.isbn = params.isbn;
        book.title = params.title;
        book.author = params.author;
        book.edition_date = params.edition_date;
        book.num_pages = params.num_pages;
        book.total_copies = params.total_copies;
        book.available_copies = params.available_copies;
        book.synopsis = params.synopsis;        
        book.presentation_type = params.presentation_type;
        book.literature_type = params.literature_type;

        try {
            const bookStored = await book.save();
            res.status(200).send({ book: bookStored });
        } catch (err) {
            res.status(500).send({ message: 'Error saving the book' });
        }
    } else {
        res.status(400).send({
            message: 'Please send all required fields'
        });
    }
}

async function getBook(req, res) {
    var bookIsbn = req.params.isbn;

    try {
    
        const book = await Book.findOne({isbn: bookIsbn});

        if (!book) {
            return res.status(404).send({ message: 'Book does not exist' });
        }

        return res.status(200).send({ book });

    } catch (err) {
        return res.status(500).send({ message: 'Error in the request' });
    }
}

async function getBooks(req, res) {
    try {
        const books = await Book.find();

        if (!books || books.length === 0) {
            return res.status(404).send({ message: 'No books found' });
        }

        return res.status(200).send({ books });

    } catch (err) {
        return res.status(500).send({ message: 'Error in the request' });
    }
}

async function updateBook(req, res){
    try{
    var bookIsbn = req.params.isbn;
    var update = req.body;

    const bookUpdated = await Book.findOneAndUpdate(
        {isbn: bookIsbn},
         update,
          {new: true}
        ); 

        if(!bookUpdated){
             return res.status(404).send({message: 'Book does not exist'});
    }
    
        return res.status(200).send({book: bookUpdated});
    }catch(err){
        return res.status(500).send({message: 'Error updating the book', error: err.message});
    }
}

async function deleteBook(req, res){
    try{
        var bookIsbn = req.params.isbn;
        const bookDeleted = await Book.findOneAndDelete({isbn: bookIsbn});

        if(!bookDeleted){
            return res.status(404).send({message: 'Book has not been deleted'});
        }

        return res.status(200).send({book: bookDeleted});
    }catch(err){
        return res.status(500).send({message: 'Error deleting the book', error: err.message});
    }
}

module.exports = {
    saveBook,
    getBook,
    getBooks,
    updateBook,
    deleteBook
}

