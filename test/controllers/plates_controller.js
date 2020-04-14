// Test toolkit
const assert = require('assert');
const supertest = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');

// Mongoose toolkit
const { Plate } = require('../../models/Plate');
const { User } = require('../../models/User');

// Test data
const fakeUsers = require('../test_data/fakeUsers');
const testUsers = fakeUsers.slice(0, 18);
const testPlate = require('../test_data/fakePlate');

// Creators
const createPlate = require('../creators/plate_create');

describe('Plate/party request handling', () => {

    // Save users and a plate/party before test begins
    beforeEach((done) => { 
        let users = [];
        testUsers.forEach((user) => {
            const newUser = new User(user);
            users.push(newUser);
        })

        Promise.all( users.map( (user) => user.save() ) )
            .then((data) => {
                data.forEach( result => {
                    assert(typeof(result) === 'object')
                })
                createPlate(testPlate, app, done)
            })
            .catch(err => {
                throw err
            })
        
        
    });

    it('Finds all the plates/parties (GET request)', (done) => {  

        supertest(app)
            .get('/plates')
            .end((err, response) => {
                if(err) {
                    throw err
                }
                assert(response.body.length > 0)
                done()
            })  
    });

    it('Find a plate/party by its id (GET request)', (done) => {
        let _id

        Plate.find({})
            .then(plates => {
                _id = plates[0]._id.toString()
                supertest(app)
                    .get(`/plates/${_id}`)
                    .end((err, response) => {
                        const testId = response.body._id.toString()
                        assert(testId === _id)
                        done()
                    })
            })
    });
});
