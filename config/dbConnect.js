const mongoose = require('mongoose');

function dbConnect() {

    mongoose.connect('mongodb://localhost:27017/cryptovote', 
    {useNewUrlParser: true, useFindAndModify: false});

    mongoose.connection.once('open', function() {
        console.log('conectado');
    }).on('error', function(error) {
        console.log('Error de Conexion: ' + error);
    })  
}

module.exports = dbConnect;

