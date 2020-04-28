const express = require('express');
let router = express.Router();

// Models
const { CIVUser } = require('../models/User.civ');

// Authorizarion middleware
const authenticate = require('../middleware/authenticate');

// The mockup civ users are stored manually in Mongo Atlas/ Robo 3T

// GET User list By CIV
router.get('/list/:id', authenticate, async(req, res) => {

    try {

        // Take search parameter and convert it to regular expression
        const regexSearch = new RegExp(req.params.id)

        const users = await CIVUser.aggregate([
            {$addFields: {stringCIV: {$toString: '$CIV' }} },
            {$match: {stringCIV: regexSearch}},
            // Lookup to populate the 'candidate' virtual property
            {$lookup: {
                from: 'candidates', 
                localField: '_id', 
                foreignField: 'user', 
                as: 'candidate'
            }}
        ]);
        
        if(!(users.length > 0)) {
            return res.status(404).send({ status: 'not found' });
        }

        const nonCandidatesUsers = users.filter(user => (user.candidate.length === 0));
        res.send(nonCandidatesUsers);   

    } catch (error) {
        res.status(400).send(error);
    }

});

// GET User by CIV

router.get('/:CIV', authenticate, async(req, res) => {

    try {
        const { CIV } = req.params;
        const user = await CIVUser.findOne({ CIV }).populate('candidate');

        if(!user) {
            return res.status(404).send({ error: 'User not found'});
        }

        res.send(user);

    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = router;
