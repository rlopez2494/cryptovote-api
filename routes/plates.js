// Modelos
const { CIVUser } = require('../models/User.civ');
const { Candidate } = require('../models/Candidate');
const { Plate, plateSchema } = require('../models/Plate');

// Toolkit
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const deepPopulate = require('mongoose-deep-populate')(mongoose);
plateSchema.plugin(deepPopulate);

function getNameByValue(object, value) {
    return Object.keys(object).find( (key) => object[key] === value )
}


// CREATE
router.post('/', async(req, res) => {

    const { 
        directiveBoard, 
        disciplinaryCourt, 
        districtDirectiveBoard, 
        number 
    } = req.body;
    
    // Extraction of the different bodies in the plate/party from 'req.body'
    const plateBodies = {
        directiveBoard,
        disciplinaryCourt,
        districtDirectiveBoard
    }   

    // New plate/party instance 
    const newPlate = new Plate({ number });

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
        const mongoUsers = await CIVUser.find({ CIV: { $in: users } });
        
        Object.keys(plateBodies).forEach((body) => {
            const bodySeats = Object.keys(plateBodies[body])
            
            bodySeats.forEach( async( seat ) => {
                // Findind the user who belongs to a specific body in a specific seat
                const matchUser = mongoUsers
                    .find( (user) => 
                        (user.CIV === plateBodies[body][seat]))

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
                            .find(candidate => candidate.user.CIV === plateBodies[body][seat])
                        
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
        return res.status(400).send(err);
    }

})

// READ PLATES
router.get('/', async (req, res) => {
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
    
    try {
        const plates = await Plate.find({})
            .deepPopulate(populations);

        res.send(plates);

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
router.delete('/:id', async(req, res) => {
    const { id } = req.params;

    try {
        const plate = await Plate.findById(id);
        if(!plate) {
            return res.status(404).send({ error: 'not found' });
        }

        // Arrow function definition to extract the bodies from the plate
        const extractBodies = ({
            directiveBoard,
            districtDirectiveBoard,
            disciplinaryCourt
        }) => ([
            directiveBoard,
            districtDirectiveBoard,
            disciplinaryCourt
        ])

        // Arrow function definition to extract the ids of 
        // the candidates in every plate body
        const extractCandidatesIds = ({
            president,
            vicepresident,
            treasurer,
            generalSecretary
        }) => {
            const candidatesIds = []
            candidatesIds.push(
                president._id, 
                vicepresident._id, 
                generalSecretary._id
            )
            
            // Disciplinary Court doesnt have a treasurer
            if (treasurer !== undefined) {
                candidatesIds.push(treasurer._id)
            }
            
            return candidatesIds
        }
        
        // Extracting the array of bodies from the plate
        const plateBodies = extractBodies(plate);

        // Array initialization for all the candidates Ids
        let idsArray = [];

        // Extracting all the candidates ids from every plate body
        plateBodies.forEach((body) => {
            const bodyIds = extractCandidatesIds(body);
            idsArray.push(...bodyIds); 
        })

        await Candidate.deleteMany({ _id: idsArray });
        await Plate.findByIdAndRemove(id);
        
        res.send({ status: 'Plate deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(400).send({error: err.message});
    }

    // Plate.deleteMany({}, function(err, data) {
    //     if (err) throw err;
    //     res.send(data);
    // });
});

module.exports = router;