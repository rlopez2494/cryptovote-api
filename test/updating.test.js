const Usuario = require('../models/Usuario');
const assert = require('assert');

describe('Updating Records', function() {

    var newUser;
    //Generate Char
    beforeEach(function(done) {
        newUser = new Usuario({nombre: 'Robert', fechaNacimiento: 21 });

        newUser.save(function(err, data) {

            if (err) throw err;
            done()

        })
    })

    it('updates one record on the database', function(done) {

        Usuario.findOneAndUpdate({nombre: 'Robert'}, {nombre: 'Carmen'}, function() {
            
            Usuario.findOne({_id: newUser._id}, function(err, data) {
                if (err) throw err;
                assert(data.nombre === 'Carmen')
                done()
            })
        })
    })

    it('increments by 1 all fechaNacimiento properties', function(done) {

        Usuario.updateMany({}, {$inc: {fechaNacimiento: 1}}, function(err, data) {
            
            Usuario.findOne({nombre: 'Robert'}, function(err, data) {
                
                assert(data.fechaNacimiento === 22)
                done()
            })
        })
    })
})