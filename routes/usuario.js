const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken')

const validateToken = require('../middleware/verifyToken')

//POST request
router.post('/', validateToken, function (req, res, next) {

    //Decoding data
    jwt.verify(req.token, 'secretKey', function (err, decodedData) {
        
        if (err) {
            res.sendStatus(403)
        };
        res.send(decodedData);

    })
    
    //fake data
    const candidatos = [
        {
            nombre:"Robert Ramon", 
            cedula:"12345678", 
            publicKey:"29E6E338A461B90ACDC60B22B3C1F19E",
            key:1, 
        },
        {
            nombre:"Daniel Herrera", 
            cedula:"4452147", 
            publicKey:"68585D5A8BDE8A4FE1D4FE8D65525C3D",
            key:2, 
        },
        {
            nombre:"Fidel Castro", 
            cedula:"24587415", 
            publicKey:"CABE93E7AD2813B2009AAE33C3974878",
            key:3, 
        },
        {
            nombre:"Obama", 
            cedula:"5417856", 
            publicKey:"D14A388FB3FCAC0C246B7EC13E5F681E",
            key:4, 
        },
        {
            nombre:"tu hermana", 
            cedula:"24856321", 
            publicKey:"B111039759650009F8B09CBDB159E31D",
            key:5, 
        },
        {
            nombre:"tu mama", 
            cedula:"8547632", 
            publicKey:"929651365D3D07712A24C462F892F4E6",
            key:6, 
        }
    ];

    
    
})

module.exports = router;