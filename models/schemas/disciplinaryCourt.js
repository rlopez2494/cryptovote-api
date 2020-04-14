const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { candidateSchema } = require('../Candidate');

disciplinaryCourtSchema = new Schema({
    president: {
        type: candidateSchema,
        required: true
    },
    vicepresident: {
        type: candidateSchema,
        required: true
    },
    generalSecretary: {
        type: candidateSchema,
        required: true
    }
})


module.exports = disciplinaryCourtSchema