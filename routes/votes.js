const express = require('express');
const router = express.Router();
const { Vote, voteSchema } = require('../models/Vote');
const { Candidate } = require('../models/Candidate');
const { Plate } = require('../models/Plate');

// Library for nested populations
const mongoose = require('mongoose')
const deepPopulate = require('mongoose-deep-populate')(mongoose);
voteSchema.plugin(deepPopulate);

// Authorizarion middleware
const authenticate = require('../middleware/authenticate');

//POST REQUEST (Create vote)
router.post('/', authenticate, async(req, res) => {
    
    const { directiveBoard, districtDirectiveBoard, disciplinaryCourt } = req.body;

    const voteBodies = {
        directiveBoard,
        districtDirectiveBoard,
        disciplinaryCourt
    }

    let candidates = [];

    const id = req.user._id;

    Object.keys(voteBodies).forEach((body) => {
        Object.keys(voteBodies[body]).forEach((seat) => {
            candidates.push(voteBodies[body][seat])
        })
    })

    const newVote = new Vote({ user: id });

    try {
        
        const getCandidates = await Candidate.find({ _id: { $in: candidates }})

        Object.keys(voteBodies).forEach(body => {
            Object.keys(voteBodies[body]).forEach(seat => {
                
                if(!newVote[body]) { newVote[body] = {} }

                const candidateMatch = getCandidates
                    .find(candidate => candidate._id.toString() === voteBodies[body][seat])
                
                if(candidateMatch) {
                    newVote[body][seat] = candidateMatch._id;
                }           
                
            })
        })
        
        const savedVote = await newVote.save()
        
        getCandidates.forEach( candidate => {
            candidate.votes.push(savedVote)
        })

        Promise.all(getCandidates.map(candidate => candidate.save()))
            .then(() => { res.send(savedVote) })

    } catch (err) {
        res.status(400).send(err)
    }
});

router.get('/', authenticate, async(req, res) => {
    const userId = req.user._id;

    // Variables initialization for deep populations
    const bodies = ['directiveBoard', 'disciplinaryCourt', 'districtDirectiveBoard'];
    const seats = ['president', 'vicepresident', 'treasurer', 'generalSecretary'];
    const populations = [];

    bodies.forEach(body => {
        seats.forEach(seat => {
            if (!((body === 'disciplinaryCourt') && (seat === 'treasurer'))) {
                populations.push(`${body}.${seat}`);
            } 
        })
    })

    try {
        
        const votes = await Vote.find({ user: userId })
            .deepPopulate(populations);

        if(!(votes.length > 0)) {
            return res.status(404).send({ error: 'NOT_FOUND' });
        }

        res.send(votes);

    } catch (error) {
        res.status(400).send();
    }
})

router.get('/results', authenticate, async(req, res) => {



    // Variables initialization for deep populations
    const bodies = ['directiveBoard', 'disciplinaryCourt', 'districtDirectiveBoard'];
    const seats = ['president', 'vicepresident', 'treasurer', 'generalSecretary'];
    const populations = [];

    bodies.forEach(body => {
        seats.forEach(seat => {
            if (!((body === 'disciplinaryCourt') && (seat === 'treasurer'))) {
                populations.push(`${body}.${seat}.user`);
            } 
        })
    })

    const _id = req.user._id

    try {

        const votes = await Vote.find({ user: _id });
        
        if(!(votes.length > 0)) {
            return res.status(404).send({ error: 'VOTE_NOT_FOUND' });
        }

        const plates = await Plate.find({ owner: _id })
            .deepPopulate(populations);

        if(!(plates.length > 0)) {
            return res.status(404).send({ error: 'NOT_FOUND' });
        }

        let resultsObject;

        // Arrow function definition to extract the bodies from the plate
        const extractBodies = ({
            directiveBoard,
            districtDirectiveBoard,
            disciplinaryCourt
        }) => ({
            directiveBoard,
            districtDirectiveBoard,
            disciplinaryCourt
        })

        Object.keys(plates).forEach( plate => {

            const filteredPlate = extractBodies(plates[plate]);
            // console.log(Object.keys(filteredPlate))
            if (resultsObject === undefined) {

                resultsObject = { ...filteredPlate };

            } else {

                for (body in filteredPlate) {
                    const plateBodies = Object.getOwnPropertyNames(filteredPlate[body].toJSON());
                    plateBodies.forEach(seat => {
                        if (seat !== '_id') {
                            if (filteredPlate[body][seat].votes.length > resultsObject[body][seat].votes.length) {
                                resultsObject[body][seat] = filteredPlate[body][seat];
                            }
                        }
                        
                    })

                }

            }
            
        })

        res.send(resultsObject);
    } catch (error) {

        res.status(400).send(); 

    }
})


//Exports
module.exports = router;