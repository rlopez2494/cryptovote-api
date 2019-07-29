const express = require('express');
const router = express.Router();
const Voto = require('../models/Voto').Voto;


//Dummy Data para el registro de votos
const VotoExterno = {
    userId: "userId",
    candidatoId: "candiId",
    partidoId: "PartiID",
    timeStamp: 2010-10-10,
    eleccionId: "eleccionID",
};


//GET REQUEST
router.get('/', function(req, res) {

    Voto.find({}, function(err, data) {

        if(err) throw err;
        res.send(data);

    });
    
});

//POST REQUEST
router.post('/', function(req, res) {

    const newVoto = new Voto(VotoExterno);
    
    newVoto.save(function(err, data) {

        if (err) throw err;
        res.send(data);

    });
});

//DELETE REQUEST (Testing)
router.delete('/', function(req, res) {

    Voto.deleteMany({}, function(err, data) {

        if(err) throw err;
        res.send(data);

    });
});

//Exports
module.exports = router;