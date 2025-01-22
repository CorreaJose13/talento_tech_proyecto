const mongoose = require('mongoose');

const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bp = require('body-parser');
const cors = require('cors');

const hostname = 'localhost';
const port = 3000;

////// CONEXIÓN MONGODB

var bdURL = 'mongodb://127.0.0.1:27017/proyecto_final';
mongoose.connect(bdURL);

// CONFIG EVENTOS CONEXIÓN

mongoose.connection.on('connected', function(){ 
    console.log("Conexión a mongodb se realizo en: " + bdURL);
});
mongoose.connection.on('error', function(err){
    console.log("Error en la conexión a mongodb: " + err);
});
mongoose.connection.on('disconnected', function(msg){
    console.log("Desconexión realizada con exito: " + msg);
});

// DESCONEXIÓN NODE A MONGODB

process.on('SIGINT', function(){
    mongoose.connection.close(function(){
        console.log("Conexión a mongodb terminada por finalizacion del servidor");
        process.exit(0);
    });
});

const app = express();

var author_routes = require('./routes/rauthor');
var book_routes = require('./routes/rbook');

app.use(morgan('dev'));
app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true })); 


//rutas
app.use('/api', author_routes);
app.use('/api', book_routes);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


