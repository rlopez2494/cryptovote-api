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
                 
                const { juntaDirectiva, juntaDirectivaDeCentro, tribunalDisciplinario } = testPlate
                const testPick = {
                    juntaDirectiva,
                    juntaDirectivaDeCentro,
                    tribunalDisciplinario
                }

                // Checks if all users are in their respective
                // seats and bodies as candidates

                Object.keys(testPick).forEach( body => {
                    Object.keys(testPlate[body]).forEach( seat => {
                        const _id = response.body[body][seat].user._id.toString()
                        assert(testPick[body][seat] === _id)
                    })
                })

                done()
            })
}