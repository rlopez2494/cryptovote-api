const express = require('express');
const router = express.Router();
const Eleccion = require('../../models/Eleccion')

router.get('/', function(req, res) {

    Eleccion.find({}, function(err, data) {

        if (err) throw err;
        res.send(data);

    });
});


router.post('/', function(req, res) {
    //Creating an "Eleccion" mongoose instance
console.log('elecciones');
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
    });


    //Saving in the database
    newEleccion.save(function(err, data) {
        if (err) throw err;
        res.send(data);
    });
});

router.delete('/', function(req, res) {
    Eleccion.deleteMany({}, function(err, data) {
        if (err) throw err;
        res.send(data)
    })
})

module.exports = router;