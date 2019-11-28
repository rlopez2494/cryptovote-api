const express = require('express');
const router = express.Router();
const Voto = require('../models/Voto').Voto;


//Dummy Data para el registro de votos
const VotoExterno = {
    juntaDirectiva: {
        presidente: "Robert Lopez",
        vicepresidente: "Simon Garcia",
        tesorero: "Noreen Scheffel",
        secretarioGeneral: "Gabriel Ramirez",
        votoLista: "Somos"
    },

    tribunalDisciplinario: {
        presidente: "Robert",
        vicepresidente: "gabriel",
        secretarioGeneral: "ramon",
        votoLista: "no se "
    },

    juntaDirectivaDeCentro: {
        presidente: "Simona",
        vicepresidente: "Noroon",
        tesorero: "Ramon",
        secretarioGeneral: "Gabriela rojas",
        votoLista: "ratita"
    },

    fechaRegistro:"2010-05-24"
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
    console.log(req.body)
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