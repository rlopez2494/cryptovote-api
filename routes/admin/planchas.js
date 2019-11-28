// Toolkit
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Modelos
const Plancha = require('../../models/Plancha').Plancha;
const Usuario = require('../../models/Usuario').Usuario;
const Eleccion = require('../../models/Eleccion'); 

// GET
router.get('/', function(req, res) {
    Plancha.find({}, function (err, data) {
        if (err) throw err;
        res.send(data);
    });
});

// POST
router.post('/', function(req, res) {
    const {juntaDirectiva} = req.body;

    // Array map para los distintos postulantes de 
    // cada organo

    const postulantes = Object.keys(juntaDirectiva).map(cargo => 
        mongoose.Types.ObjectId(juntaDirectiva[cargo]))
    
    Usuario.find({
        '_id': {
            // un array con los is especificos
            $in: postulantes
        }
    } , function(err, candidatoData) {
        
        Eleccion.findOne({}, function (err, eleccionData) {
            if (err) throw err;

            const dataCopy = {
                ...eleccionData['_doc']
            }

            for (organo in dataCopy) {
                if (typeof((dataCopy[organo]) === 'object') && (organo[0] !== "_")) {
                    Object.keys(dataCopy[organo]).forEach(cargo => {
                        // console.log(`${organo}` , dataCopy[organo][cargo]);
                        
                        // dataCopy[organo][cargo] = candidatoData.filter( cargo => 
                        //         cargo['_id'] == req.body[organo][cargo]
                        //     )[]


                        const asignacion = candidatoData.filter( candidato => 
                            candidato['_id'] == req.body[organo][cargo]
                        )[0]
                        
                        
                        if (asignacion) {

                            asignacionEleccion = (({ _id, nombre, CIV, apellido}) => 
                            ({ _id, nombre, CIV, apellido}))(asignacion)

                            asignacionEleccion.cantidadVotos = 0;

                            dataCopy[organo][cargo].push(asignacionEleccion); 

                            
                        }

                    })
                }
            
            }
            console.log(dataCopy)
            res.send(candidatoData)
        })


        if(err) throw err;
        
    })


    // newPlancha = new Plancha({
    //     ...req.body,
    //     fechaRegistro: "2010-12-12"
    // })

    // newPlancha.save(function(err, data) {
    //     if(err) throw err;
    //     res.send(data);
    // });
    
});

// DELETE
router.delete('/', function(req, res) {
    Plancha.deleteMany({}, function(err, data) {
        if (err) throw err;
        res.send(data);
    });
});

module.exports = router;