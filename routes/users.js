//Express imports
const express = require('express');
let router = express.Router();
const testUsers = require('../test/test_data/fakeUsers');

// Sesion toolkit
const authenticate = require('../middleware/authenticate');

//Models imports
const { User } = require('../models/User');

//Routers

// Get user profile
router.get('/me', authenticate, async( req, res ) => {
    res.send(req.user)
});

// User Log Out
router.get('/logout', authenticate, async(req, res) => {
    try {
        req.user.token = '';
        await req.user.save();

        res.send({ message: 'Logged out Successfully' })
    } catch (error) {
        res.status(500).send({ message: 'Server error' })
    }
})

//POST requests (SignUp User)
router.post('/', async (req, res, next) => {
    const { email } = req.body;
    const newUser = User(req.body);

    try {

        const matchUsers = await User.find({ $or: [{email}] });

        if (matchUsers.length > 0) {
            return res.status(400).send({ message: 'EMAIL_EXISTS' });
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
        await user.generateAuthToken();
        
        res.send(user);

    } catch (error) {
        return res.status(400).send({ message: "INVALID_CREDENTIALS"});
    }
})

// PUT requests
router.patch('/me', authenticate, async( req, res ) => {
    const _id = req.user._id;

    const updates = Object.keys(req.body);

    const allowedUpdates = [
        'name',
        'lastName',
        'email',
        'password'
    ];

    const updateAllowed = updates.every((update) => allowedUpdates.includes(update));

    if(!updateAllowed) {
        return res.status(400).send({ error: 'INVALID_OPERATION' });
    }

    try {

        updates.forEach((update) => {
            req.user[update] = req.body[update];
        });

        await req.user.save();

        res.send(req.user);

    } catch (err) {
        res.status(400).send(err);
    }
});

//DELETE requests
router.delete('/me', authenticate,  async(req, res) => {

    try {
        await req.user.remove();
        res.send(req.user);
    } catch (error) {
        res.status(400).send()
    }
})

module.exports = router;
