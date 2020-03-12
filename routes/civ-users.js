const express = require('express');
let router = express.Router();

// Models
const CIVUser = require('../models/User.civ');

// Face CIV Users
const civUsers = require('../test/test_data/fake-civ-users');

router.post('/', (req, res) => {
    civUsers.forEach((user) => {
        const newUser = CIVUser(user);
        newUser.save();
    })
    res.send({'message': {'status': 'civ users saved'}})
});

router.get('/:user', async (req, res) => {

    try {
        const userResult = req.params.user;
        const user = await CIVUser.findOne({ CIV: userResult });
        // console.log(user);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
})


module.exports = router;
