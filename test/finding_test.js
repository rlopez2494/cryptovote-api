const Usuario = require('../models/Usuario');
const assert = require('assert');

describe('Finding Records', function() {

    var newUser;
    //Saves to a database before each test
    beforeEach(function(done) {
        newUser = new Usuario({
            nombre: 'Redondo'
        });

        newUser.save(function(err, data) {
            if (err) throw err;
            done();
        })
    })

    
    it('finds one record from the database', function(done) {
        Usuario.findOne({nombre: 'Redondo'}, function(err, data) {
            if (err) throw err;
            assert(data.nombre === 'Redondo');
            done()
        })
    })

    //Finds by ID
    it('finds by id', function(done) {
        Usuario.findById({_id: newUser._id}, function(err, data) {
            if (err) throw err;
            assert(data._id.toString() == newUser._id.toString())
            done()
        })
    })

    //
})