const mongoose = require('mongoose');
const assert = require('assert');

before(function(done) {

    mongoose.connect('mongodb://localhost:27017/cryptovote', 
    {useNewUrlParser: true, useFindAndModify: false});

    mongoose.connection.once('open', function() {
        console.log('conectado');
        done()
    }).on('error', function(error) {
        console.log('Error de Conexion: ' + error);
    })

})

beforeEach(function(done) {
    mongoose.connection.collections.usuarios.drop(function() {
        done()
    })
})
    

    

    
