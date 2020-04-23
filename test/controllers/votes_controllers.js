// Test toolkit
const assert = require('assert')
const supertest = require('supertest')
const app = require('../../app')

// Mongoose toolkit
const Plate = require('../../models/Plate').Plate
const User = require('../../models/User').User
const Candidate = require('../../models/Candidate').Candidate

// Test data
const fakeUsers = require('../test_data/fakeUsers')
const testUsers = fakeUsers;
const testPlate = require('../test_data/fakePlate')
const testVote = require('../test_data/fakeVote')
const testCIVPlate = require('../test_data/fakeCIVPlate');

// Creators
const createPlate = require('../creators/plate_create')

describe('Vote request handling', () => {

    // Save users and a plate/party before test begins
    beforeEach((done) => { 
        let users = []
        testUsers.forEach((user) => {
            const newUser = new User(user)
            users.push(newUser)
        })

        Promise.all( users.map( (user) => user.save() ) )
            .then((data) => {
                data.forEach( result => {
                    assert(typeof(result) === 'object')
                })
                createPlate(testCIVPlate, app, done)
            })
            .catch(err => {
                throw err
            })
        
    });

    xit('makes nominal votes', async() => {

        let vote = {
            ...testVote
        }
        
        try {
            const users = await User.find({})
            const user = users[0]._id
            const candidates = await Candidate.find({})

            let count = 0
            
            Object.keys(vote).forEach((body) => {
                Object.keys(vote[body]).forEach((seat) => {
                    vote[body][seat] = candidates[count]._id
                    count++
                })
            })

            // vote.user = user

            supertest(app)
                .post('/votes')
                .send(vote)
                .end((err, response) => {
                    if(err) {
                        throw err
                    }

                    const voteRes = response.body

                    Object.keys(vote).forEach( body => {
                        Object.keys(vote[body]).forEach( seat => {
                            if ( seat !== '_bsontype' && seat !== 'id' ) {
                                const candidateMatch = voteRes.find( candidate => (candidate._id.toString() === vote[body][seat].toString()))
                                assert(candidateMatch)
                                assert(candidateMatch.votes.length > 0)
                            }
                            
                        }) 
                    })

                })

        } catch (err) {
            throw err
        }
        
        
    });
});
