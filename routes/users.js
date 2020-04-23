//Express imports
const express = require('express');
let router = express.Router();
const testUsers = require('../test/test_data/fakeUsers');

// Sesion toolkit
const authenticate = require('../middleware/authenticate');

//Models imports
const { User } = require('../models/User');

//Routers

//POST requests (Create User)
router.post('/', async (req, res, next) => {
    const { email } = req.body;
    const newUser = User(req.body);

    try {

        const matchUsers = await User.find({ $or: [{email}] });

        if (matchUsers.length > 0) {
            return res.status(400).send('email registered');
        }

        await newUser.generateAuthToken();

        const user = await newUser.save();
    
        res.send(user);

    } catch (e) {
        res.status(400).send(e);
    }

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

//DELETE requests
router.delete('/', async(req, res, next) => {

    try {
        const deleteUserResult = await User.deleteMany({})
        if (!deleteUserResult) {
            return res.status(404).send({ error: 'not found' })
        }
        res.send(deleteUserResult)
    } catch (error) {
        res.status(400).send()
    }
})

module.exports = router;
