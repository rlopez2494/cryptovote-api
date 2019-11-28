const express = require('express');
const router = express.Router();
const Eleccion = require('../../models/Eleccion')
const initEleccion = require('../../config/initElection')

router.get('/', function(req, res) {

    Eleccion.find({}, function(err, data) {

        if (err) throw err;
        res.send(data);

    });
});


router.post('/', function(req, res) {
    //Creating an "Eleccion" mongoose instance
    newEleccion = new Eleccion(initEleccion);

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