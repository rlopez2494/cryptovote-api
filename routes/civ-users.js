const express = require('express');
let router = express.Router();

// Models
const { CIVUser } = require('../models/User.civ');

// Face CIV Users
const civUsers = require('../test/test_data/fakeUsers');

router.post('/', (req, res) => {
    civUsers.forEach((user) => {
        const newUser = CIVUser(user);
        newUser.save();
    })
    res.send({'message': {'status': 'civ users saved'}})
});

// GET User list By CIV
router.get('/list/:id', async(req, res) => {

    try {

        const users = await CIVUser.find({
            $where: `this.CIV.toString().match(${req.params.id})`
        }, '_id name lastName CIV');
    
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
        const user = await CIVUser.findOne({ CIV });
        if(!user) {
            return res.status(404).send({ error: 'User not found'});
        }
        res.send(user);

    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = router;
