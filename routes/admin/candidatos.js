const express = require('express');
const router = express.Router();
const Candidato = require('../../models/Candidato').Candidato;

router.get('/', function(req, res) {
    Candidato.find({}, function (err, data) {
        if (err) throw err;
        res.send(data);
    });
});

router.post('/', function(req, res) {

    newCandidato = new Candidato({
        userId: '',
        candidadVotos: 0,
        partidos: [{
            nombre: 'Podemos',
            fechaRegistro: '1987-12-12',
            imgUrl: 'imgurl',
            adminId: 'adminId'
        }],
        fechaRegistro: '2010-12-12',
        adminId: ''
    })

    newCandidato.save(function(err, data) {
        if(err) throw err;
        res.send(data);
    });
    
});

router.delete('/', function(req, res) {
    Candidato.deleteMany({}, function(err, data) {
        if (err) throw err;
        res.send(data);
    });
});

module.exports = router;