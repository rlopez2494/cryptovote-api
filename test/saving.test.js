const Usuario = require('../models/Usuario');
const assert = require('assert');

describe('Saving records', function() {

    //Saves to a database
    it('save a record to database', function(done) {

        const newUser = new Usuario({
            nombre: 'Rredondo'
        });

        newUser.save(function(err, data) {
            assert(newUser.isNew === false);
            done();
        })
    })
})