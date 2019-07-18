const mongoose = require('mongoose');
const assert = require('assert');
const Eleccion = require('../models/Eleccion');


describe('Eleccion Model Tests', function() {

    var newEleccion;

    it('Saves a record to the database', function(done) {

        //Creating an "Eleccion" mongoose instance

        newEleccion = new Eleccion({
            fechaRegistro: "2019-02-02",
            adminId: "ramon",

            //Nested VotoModel instance
            votos: [{
                userId: 'userid',
                candidatoId: 'candidatoId',
                partidoId: 'partidoId',
                timeStamp: '2019-03-03',
                eleccionId: 'eleccionId'
            }],
            candidatos: [{
                userId: 'userid',
                candidadVotos: 0,

                // Nested PartidoModel instance
                partidos: [{
                    nombre: "Accion Democratica",
                    fechaRegistro: "2012-02-02",
                    imgUrl: "defaultUrl",
                    adminId: "adminIdss"
                }],

                fechaRegistro: "2019-03-02",
                eleccionId: "La id de la eleccion",
                adminId: "el id del admin"
            }]
        })


        //Saving in the database
        newEleccion.save(function(err) {
            if (err) throw err;
            assert(!newEleccion.isNew);
            done();
        })

    })

})