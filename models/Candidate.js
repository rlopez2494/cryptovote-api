const mongoose = require('mongoose')

const Schema = mongoose.Schema

const candidateSchema = new Schema({
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    party: {
        type: Schema.Types.ObjectId,
        ref: 'Plate'
    },
    votes: [{
        type: Schema.Types.ObjectId,
        ref: 'Vote',
        default: []
    }]
})

const Candidate = mongoose.model('Candidate', candidateSchema)

module.exports = { Candidate, candidateSchema }