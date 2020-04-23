// Test requests
const assert = require('assert')
const supertest = require('supertest')
const app = require('../../app')

// Mongoose requests
const User = require('../../models/User').User

describe.skip('Users controllers ', () => {

    let newUser

    beforeEach((done) => {
        newUser = new User({
            nombre: 'Robert Jose',
            apellido: 'Lopez Salazar',
            CIV: 5454748,
            cedula: 22924952,
            isAdmin: false,
            solvente: true,
            sesion: false,
        })

        newUser.save()
            .then((data) => {
                done()
            })
            .catch( err => {
                console.log(err)
            })

    });
    
    it('Creates a user', (done) => {

        supertest(app)
            .get('/users')
            .end((err, response) => {
                if(err) {
                    throw err
                }
                assert(response.body[0]._id === newUser._id.toString())
                done()
            })
        
    });

    xit('Read user by ID', (done) => {
        supertest(app)
            .get(`/users/${newUser._id.toString()}`)
            .end((err, response) => {
                if(err) {
                    throw err
                }
                assert(response.body._id === newUser._id.toString())
                done()
            })
    });

    it('Modifies a user by ID', (done) => {
        supertest(app)
            .put(`/users/${newUser._id.toString()}`)
            .send({ sesion: true })
            .end((err, response) => {
                if(err) {
                    throw err
                }
                User.findById(newUser._id.toString())
                    .then(user => {
                        assert(user.sesion === true)
                        done()
                    })
            })
    });

});