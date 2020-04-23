const mongoose = require('mongoose');

function dbConnect() {

    if (process.env.NODE_ENV !== 'test') {

        mongoose.connect('mongodb://127.0.0.1:27017/cryptovote', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        mongoose.connection.once('open', function() {
            console.log('conectado');
        }).on('error', function(error) {
            console.log('Error de Conexion: ' + error);
        })  

    }
}

dbConnect();

