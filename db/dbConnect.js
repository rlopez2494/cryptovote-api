const mongoose = require('mongoose');

function dbConnect() {
    mongoose.connect(process.env.MONGODB_URL, {
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

dbConnect();

