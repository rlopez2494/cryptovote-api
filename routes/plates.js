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
                candidates.push(newCandidate)

            })
        })

        Promise.all( candidates.map( candidate => candidate.save() ) )
            .then(data => {

                Object.keys(plateBodies).forEach(body => {
                    Object.keys(plateBodies[body]).forEach(seat => {
                        
                        const candidateMatch = data
                            .find(candidate => candidate.user._id.toString() === plateBodies[body][seat])
                        
                        if(!newPlate[body]) {
                    
                            newPlate[body] = {}
                        }     
    
                        newPlate[body][seat] = {}
                        newPlate[body][seat] = candidateMatch               
                        
                    })
                })
                
                return newPlate.save()
            })
            .then( (data) => res.send(data) )
            .catch( (err) => res.status(500).send(err) ) 

    } catch (err) {
        return res.status(400).send(err)
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