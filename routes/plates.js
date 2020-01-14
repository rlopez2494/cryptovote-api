// Toolkit
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const _ = require('underscore')

// Modelos
const User = require('../models/User').User
const Candidate = require('../models/Candidate').Candidate
const Plate = require('../models/Plate').Plate

function getNameByValue(object, value) {
    return Object.keys(object).find( (key) => object[key] === value )
}


// CREATE
router.post('/', async(req, res) => {

    const { juntaDirectiva, tribunalDisciplinario, juntaDirectivaDeCentro, numero } = req.body

    // Extraction of the different bodies in the plate/party from 'req.body'
    const plateBodies = {
        juntaDirectiva,
        tribunalDisciplinario,
        juntaDirectivaDeCentro
    }   

    // New plate/party instance 
    const newPlate = new Plate( { numero } )

    // Initial data for:
    // Array of users in the req.body
    let users = []

    // Array of saved candidates
    let candidates = []

    // Initialize for candidate instances/models
    let newCandidate

    // Extraction of users from the request
    Object.keys(plateBodies).forEach((body) => {
        const bodySeats = Object.keys(plateBodies[body])
        bodySeats.forEach(( seat ) => {
            users.push(plateBodies[body][seat])
        })
    })

    try {
        // Find all the users in req.body
        const mongoUsers = await User.find({ _id: { $in: users } })
        
        Object.keys(plateBodies).forEach((body) => {
            const bodySeats = Object.keys(plateBodies[body])
            
            bodySeats.forEach( async( seat ) => {
                // Findind the user who belongs to a specific body in a specific seat
                const matchUser = mongoUsers
                    .find( (user) => 
                        (user._id.toString() === plateBodies[body][seat]))

                // New Candidate instance
                newCandidate = new Candidate({
                    user: matchUser,
                    plate: newPlate
                })
                
                // Saving candidates and pushing the response data in an array 
                const candidate = await newCandidate.save()
                candidates.push(candidate)

            })
        })
        
        // IMPORTANT: setTimeout() placed as a fast fix to an
        // asyncronous bug im working on
        setTimeout(() => {


            // Loop to insert candidates in the seat and 
            // the body where each of then belongs as candidates
            Object.keys(plateBodies).forEach(body => {
                Object.keys(plateBodies[body]).forEach(seat => {
                    
                    const candidateMatch = candidates
                        .find(candidate => candidate.user._id.toString() === plateBodies[body][seat])
                    
                    if(!newPlate[body]) {
                
                        newPlate[body] = {}
                    }     

                    newPlate[body][seat] = {}
                    newPlate[body][seat] = candidateMatch               
                    
                })
            })

            // Saving the plate/party Model and send the data as response
            newPlate.save()
                .then(plate => {
                    return res.send(plate)
                })
                .catch(err => {
                    return res.send(err)
                })
        }, 6000);

    } catch (error) {
        return res.send(error)
    }

})

// READ PLATES
router.get('/', async (req, res) => {

    try {
        const plates = await Plate.find({})
        res.send(plates)

    } catch (err) {
        res.status(400).send(err)
    }
});

// READ plate by ID

router.get('/:id', async(req, res) => {
    const { id } = req.params

    try {
        const plate = await Plate.findById(id)

        if (!plate) {
            return res.status(404).send()
        }
        
        res.send(plate)

    } catch (err) {
        res.status(400).send(err)
    }
})
    

// DELETE
router.delete('/', function(req, res) {
    Plate.deleteMany({}, function(err, data) {
        if (err) throw err;
        res.send(data);
    });
});

module.exports = router;