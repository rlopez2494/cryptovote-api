//Express imports
const express = require('express');
let router = express.Router();

// Sesion toolkit
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken');

//Models imports
const User = require('../models/User').User;

//Routers

//GET request all
router.get('/', function(req, res) {
    User.find({}, function(err, data) {
        if (err) throw err;
        res.send(data);
    })
})

// GET request by ID

router.get('/:id', async(req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);
        if(!user) {
            return res.status(404).send();
        }
        res.send(user);

    } catch (err) {
        res.status(400).send(err);
    }

})

// GET User List By CIV

router.get('/list/:id', async(req, res) => {
    
    try {

        const users = await User.find({
            $where: `this.CIV.toString().match(${req.params.id})`
        })
    
        if(!(users.length > 0)) {
            return res.status(404).send( { status: 'not found' } );
        }

        res.send(users);   

    } catch (error) {
        res.status(400).send(error);
    }
})

// PUT requests
router.put('/:id', async( req, res ) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = [
        'isAdmin',
        'solvente',
        'sesion',
        'password'
    ];
    const updateAllowed = updates.every((update) => allowedUpdates.includes(update));

    if(!updateAllowed) {
        return res.status(400).send({ error: 'Invalid Operation' });
    }

    try {
        const user = await User.findByIdAndUpdate(_id, req.body);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (err) {
        res.status(400).send(err);
    }
})

//POST requests
router.post('/', function (req, res, next) {

    const { cedula, CIV } = req.body;
    const newUser = User(req.body);

    User.find({
        $or: [
            {cedula},
            {CIV}
        ]
    }).then((data) => {
        if(data.length > 0) {
           return res.send('El User ya existe')
        }
        newUser.save().then(data => {
            res.send(data)
        }).catch(err => {
            res.send(err.name)
        })
    }).catch(err => { res.send(err.name)});

    newUser.hablar();

})

//POST request
router.post('/sesion', verifyToken, function (req, res, next) {

    //Decoding data
    jwt.verify(req.token, 'secretKey', function (err, decodedData) {
        
        //AQUI SE REALIZAN LAS QUERIES QUE SE VEAN 
        //EN LA PAGINA PRINCIPAL DEL User

        if (err) {

            res.sendStatus(403);

        };

        res.send(decodedData);

    })
})

//DELETE requests
router.delete('/', function (req, res, next) {
    User.find({}).deleteMany(function (err, data) {
        if (err) throw err;
        res.send(data);
        
    })
})

module.exports = router;
