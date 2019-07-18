const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

const validateToken = require('../middleware/verifyToken');

//POST request
router.post('/', validateToken, function (req, res, next) {

    //Decoding data
    jwt.verify(req.token, 'secretKey', function (err, decodedData) {
        
        //AQUI SE SUPONE QUE SE REALIZAN LAS QUERIES QUE SE VEAN 
        //EN LA PAGINA PRINCIPAL DEL USUARIO

        if (err) {
            res.sendStatus(403);
        };
        res.send(decodedData);

    })
})

module.exports = router;