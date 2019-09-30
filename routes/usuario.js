const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

const verifyToken = require('../middleware/verifyToken');

//POST request
router.post('/', verifyToken, function (req, res, next) {

    //Decoding data
    jwt.verify(req.token, 'secretKey', function (err, decodedData) {
        
        //AQUI SE REALIZAN LAS QUERIES QUE SE VEAN 
        //EN LA PAGINA PRINCIPAL DEL USUARIO

        if (err) {

            res.sendStatus(403);

        };

        res.send(decodedData);

    })
})

module.exports = router;