const supertest = require('supertest')
const assert = require('assert')

module.exports = function createPlate(testPlate, app, done) {
    supertest(app)
            .post('/plates')
            .send(testPlate)
            .end((err, response) => {
                if(err) {
                    throw err
                }
                 
                const { directiveBoard, districtDirectiveBoard, disciplinaryCourt } = testPlate;
                const testPick = {
                    directiveBoard,
                    districtDirectiveBoard,
                    disciplinaryCourt
                }
                
                // Checks if all users are in their respective
                // seats and bodies as candidates
                Object.keys(testPick).forEach( body => {
                    Object.keys(testPlate[body]).forEach( seat => {
                        const CIV = response.body[body][seat].user.CIV
                        assert(testPick[body][seat] === CIV)
                    })
                })

                done()
            })
}