const express = require('express');
const router = express.Router();
const Plancha = require('../../models/Plancha').Plancha;

router.get('/', function(req, res) {
    Plancha.find({}, function (err, data) {
        if (err) throw err;
        res.send(data);
    });
});

router.post('/', function(req, res) {

    newPlancha = new Plancha({
        numero: 4,

        juntaDirectiva: {
            presidente: "Robert Lopez",
            vicepresidente: "Simon ",
            tesorero: "Alberro",
            secretarioGeneral: "mengano"
        },

        tribunalDisciplinario: {
            presidente: "filomeno",
            vicepresidente: "mangorro",
            secretarioGeneral: "chevere"
        },

        juntaDirectivaDeCentro: {
            presidente: "no chevere",
            vicepresidente: "muy cool",
            tesorero: "excelente",
            secretarioGeneral: "capluidb"
        },

        fechaRegistro: "2010-12-12"
        })

    newPlancha.save(function(err, data) {
        if(err) throw err;
        res.send(data);
    });
    
});

router.delete('/', function(req, res) {
    Plancha.deleteMany({}, function(err, data) {
        if (err) throw err;
        res.send(data);
    });
});

module.exports = router;