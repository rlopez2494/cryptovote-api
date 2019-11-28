//Express imports
const express = require('express');
let router = express.Router();
var bcrypt = require('bcryptjs');

//Models imports
const Usuario = require('../models/Usuario').Usuario;

//Routers

//GET requests
router.get('/', function(req, res) {
    Usuario.find({}, function(err, data) {
        if (err) throw err;
        res.send(data);
    })
})

//POST requests
router.post('/', function (req, res, next) {

    // PENDIENTE: Validar peticion
    req.body.password = bcrypt.hashSync(req.body.password);   

    const newUsuario = Usuario(req.body);


    newUsuario.save(function (err, data) {
        if (err) throw err;    

        res.status(200).send(data);
    })

    newUsuario.hablar()

})

//DELETE requests
router.delete('/', function (req, res, next) {
    Usuario.find({}).deleteMany(function (err, data) {
        if (err) throw err
        res.send(data)
        
    })
})

module.exports = router;
