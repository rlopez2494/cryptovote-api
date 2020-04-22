//Express imports
const express = require('express');
let router = express.Router();
const testUsers = require('../test/test_data/fakeUsers');

// Sesion toolkit
const authenticate = require('../middleware/authenticate');


//Models imports
const { User } = require('../models/User');

//Routers

// GET request all
router.get('/', async (req, res) => {

    User.find({}, function(err, data) {
        if (err) throw err;
        res.send(data);
    })

    // testUsers.forEach(async(user) => {
    //     const newUser = new User({ ...user });
    //     await newUser.save()
    // })

    // res.send('epas')
});

// Login Users
router.post('/login', async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        
        res.send({ user, token });

    } catch (e) {
        return res.status(400).send();
    }
})


// // GET request by ID
// router.get('/:id', async(req, res) => {
//     const _id = req.params.id;

//     try {
//         const user = await User.findById(_id);
//         if(!user) {
//             return res.status(404).send();
//         }
//         res.send(user);

//     } catch (err) {
//         res.status(400).send(err);
//     }
// });

// GET User list By CIV
router.get('/list/:id', async(req, res) => {

    try {

        const users = await User.find({
            $where: `this.CIV.toString().match(${req.params.id})`
        }, '_id nombre apellido CIV');
    
        if(!(users.length > 0)) {
            return res.status(404).send({ status: 'not found' });
        }

        res.send(users);   

    } catch (error) {
        res.status(400).send(error);
    }

});

// GET User by CIV

router.get('/:CIV', async(req, res) => {

    try {
        const { CIV } = req.params;
        const user = await User.findOne({ CIV });
        if(!user) {
            return res.status(404).send({ error: 'User not found'});
        }
        res.send(user);

    } catch (error) {
        res.status(500).send(error);
    }
});

// PUT requests
router.put('/:id', async( req, res ) => {
    const _id = req.params.id;

    const updates = Object.keys(req.body);

    const allowedUpdates = [
        'isAdmin',
        'solvente',
        'sesion',
        'password',
        'email'
    ];

    const updateAllowed = updates.every((update) => allowedUpdates.includes(update));

    if(!updateAllowed) {
        return res.status(400).send({ error: 'Invalid Operation' });
    }

    try {
        const user = await User.findById(_id);

        if (!user) {
            return res.status(404).send();
        }

        updates.forEach((update) => {
            user[update] = req.body[update]
        });

        const savedUser = await user.save();

        res.send(savedUser);

    } catch (err) {
        res.status(400).send(err);
    }
});

//POST requests
router.post('/', async (req, res, next) => {
    const { email } = req.body;
    const newUser = User(req.body);

    try {

        const matchUsers = await User.find({ $or: [{email}] });

        if (matchUsers.length > 0) {
            return res.send('email registered');
        }

        await newUser.generateAuthToken();

        const user = await newUser.save();
    
        res.send(user);

    } catch (e) {
        res.status(400).send(e);
    }

});


//DELETE requests
router.delete('/', function (req, res, next) {
    User.find({}).deleteMany(function (err, data) {
        if (err) throw err;
        res.send(data);
        
    });
})

module.exports = router;
