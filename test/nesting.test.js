const mongoose = require('mongoose');
const Usuario = require('../models/Usuario');
const assert = require('assert');

describe('Nesting elements', function() {

    beforeEach(function(done) {
        mongoose.connection.collections.usuarios.drop(function() {
            done()
        })
    })
    var newUser;

    it('creates nested book', function(done) {
        newUser = new Usuario({
            nombre: 'Robert', 
            libros:[{titulo: 'Caballo blanco', tiempo: 30}]
        });

        newUser.save(function(err, data) {
            Usuario.findOne({nombre: data.nombre}, function(err, data) {
                assert(data.libros.length === 1);
                done()
            })
        })
    })

    it('Updates book property', function(done) {

        newUser = new Usuario({
            nombre: 'Robert', 
            libros:[{titulo: 'Caballo blanco', tiempo: 30}]
        });

        newUser.save(function(err, data) {
            if (err) throw err;

            Usuario.findOne({nombre: data.nombre}, function(err, data) {
                if (err) throw err;

                data.libros.push({titulo: 'Caballo Negro', tiempo: 40});

                data.save(function(err, data) {
                    if (err) throw err;

                    Usuario.findOne({nombre: data.nombre}, function(err, data) {
                        if (err) throw err;

                        assert(data.libros.length === 2);
                        done();
                    })
                })
            })
        })
    })
})