const mongoose = require('mongoose')
const Schema = mongoose.Schema
const candidateSchema = require('../Candidate').candidateSchema

juntaDirectivaDeCentroSchema = new Schema({
    presidente: {
        type: candidateSchema,
        required: true
    },
    vicepresidente: {
        type: candidateSchema,
        required: true
    },
    tesorero: {
        type: candidateSchema,
        required: true
    },
    secretarioGeneral: {
        type: candidateSchema,
        required: true
    }
})


module.exports = juntaDirectivaDeCentroSchema