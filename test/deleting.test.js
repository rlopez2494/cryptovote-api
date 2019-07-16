const Usuario = require('../models/Usuario');
const assert = require('assert');

describe('Deleting records from the database', function() {

    var newUser;
    //Saves to a database before each test
    beforeEach(function(done) {
        newUser = new Usuario({
            nombre: 'Redondo'
        });

        newUser.save(function(err, data) {
            done();
        })
    })

    //deleteOne 
    it('deletes one item from database', function(done) {

        Usuario.deleteOne({nombre: 'Redondo'}, function(err, data) {
            console.log(err)
            console.log(data);

            Usuario.find({nombre:'Redondo'}, function(err, data) {   
                console.log(data);  
                assert(!(data.length > 0));
                done()
            })

        })

        
    })
})