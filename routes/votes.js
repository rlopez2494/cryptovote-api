const express = require('express');
const router = express.Router();
const { Vote } = require('../models/Vote');
const { User } = require('../models/User');
const { Candidate } = require('../models/Candidate');

//POST REQUEST
router.post('/', async(req, res) => {
    
    const { directiveBoard, districtDirectiveBoard, disciplinaryCourt } = req.body

    const voteBodies = {
        directiveBoard,
        districtDirectiveBoard,
        disciplinaryCourt
    }

    let candidates = []

    Object.keys(voteBodies).forEach((body) => {
        Object.keys(voteBodies[body]).forEach((seat) => {
            candidates.push(voteBodies[body][seat])
        })
    })

    const newVote = new Vote({})
    
    try {
        
        const getCandidates = await Candidate.find({ _id: { $in: candidates }})
        
        Object.keys(voteBodies).forEach(body => {
            Object.keys(voteBodies[body]).forEach(seat => {
                
                const candidateMatch = getCandidates
                    .find(candidate => candidate._id.toString() === voteBodies[body][seat])
                
                if(!newVote[body]) { newVote[body] = {} }     
                newVote[body][seat] = {}
                newVote[body][seat] = candidateMatch               
                
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



//Exports
module.exports = router;