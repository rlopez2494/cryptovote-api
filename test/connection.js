const mongoose = require('mongoose')

//connect before tests
before(function(done) {

    //Connect
    mongoose.connect('mongodb://localhost:27017/cryptovote', {useNewUrlParser: true, useFindAndModify: false})

    //Callback
    mongoose.connection.once('open', function() {
        console.log('connected');
        done();
    }).on('error', function(error) {
        console.log('connection error: ' + error);
    })
})

beforeEach(function(done) {
    mongoose.connection.collections.usuarios.drop(function() {
        done();
    })
})