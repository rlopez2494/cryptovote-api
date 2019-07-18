const mongoose = require('mongoose');
const assert = require('assert');
const Candidato = require('../models/Candidato').Candidato;


describe('Candidato Model Tests', function() {
    
    var newCandidato;

    it('Saves a record to the database', function(done) {
        
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

        newCandidato.save(function(err) {
            if(err) throw err;
            assert(!newCandidato.isNew);
            done()
        })

    });


});