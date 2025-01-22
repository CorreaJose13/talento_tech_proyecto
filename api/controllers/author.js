'use strict'

var Author = require('../models/mauthor');

async function saveAuthor(req, res) {
    var author = new Author();
    var params = req.body;

    if (params.name && params.surname && params.publication_date_first_book && params.awards && params.birth_date && params.death_date) {
        author.name = params.name;
        author.surname = params.surname;
        author.publication_date_first_book = params.publication_date_first_book;
        author.awards = params.awards;
        author.birth_date = params.birth_date;
        author.death_date = params.death_date;

        try {
            const authorStored = await author.save();
            res.status(200).send({ author: authorStored });
        } catch (err) {
            res.status(500).send({ message: 'Error saving the author' });
        }
    } else {
        res.status(400).send({
            message: 'Please send all required fields'
        });
    }
}

async function getAuthor(req, res) {
    var authorName = req.params.name;

    try {
    
        const author = await Author.findOne({name: authorName});

        if (!author) {
            return res.status(404).send({ message: 'Author does not exist' });
        }

        return res.status(200).send({ author });

    } catch (err) {
        return res.status(500).send({ message: 'Error in the request' });
    }
}

async function getAuthors(req, res) {
    try {
        const authors = await Author.find();

        if (!authors || authors.length === 0) {
            return res.status(404).send({ message: 'No authors found' });
        }

        return res.status(200).send({ authors });

    } catch (err) {
        return res.status(500).send({ message: 'Error in the request' });
    }
}

async function updateAuthor(req, res){
    try{
    var authorName = req.params.name;
    var update = req.body;

    const authorUpdated = await Author.findOneAndUpdate(
        {name: authorName},
         update,
          {new: true}
        ); 

        if(!authorUpdated){
             return res.status(404).send({message: 'Author does not exist'});
    }
    
        return res.status(200).send({author: authorUpdated});
    }catch(err){
        return res.status(500).send({message: 'Error updating the author', error: err.message});
    }
}

async function deleteAuthor(req, res){
    try{
        var authorName = req.params.name;
        const authorDeleted = await Author.findOneAndDelete({name: authorName});

        if(!authorDeleted){
            return res.status(404).send({message: 'Author has not been deleted'});
        }

        return res.status(200).send({author: authorDeleted});
    }catch(err){
        return res.status(500).send({message: 'Error deleting the author', error: err.message});
    }
}


module.exports = {
    saveAuthor,
    getAuthor,
    getAuthors,
    updateAuthor,
    deleteAuthor
}

