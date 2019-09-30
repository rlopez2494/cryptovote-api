const mongoose = require('mongoose');
const assert = require('assert');
const Plancha = require('../models/Plancha').Plancha;


describe('Candidato Model Tests', function() {
    
    var newCandidato;

    it('Saves a record to the database', function(done) {
        
        newPlancha = new Plancha({
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

        newPlancha.save(function(err) {
            if(err) throw err;
            assert(!newCandidato.isNew);
            done()
        })

    });


});