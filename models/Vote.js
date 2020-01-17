const mongoose = require('mongoose')
const Schema = mongoose.Schema

const juntaDirectivaSchema = require('../models/schemas/juntaDirectiva')
const juntaDirectivaDeCentroSchema = require('../models/schemas/juntaDirectivaDeCentro')
const tribunalDisciplinarioSchema = require('../models/schemas/tribunalDisciplinario')

const voteSchema = new Schema({

    juntaDirectiva: {
        type: juntaDirectivaSchema,
        required: true
    },

    juntaDirectivaDeCentro: {
        type: juntaDirectivaDeCentroSchema,
        required: true
    },

    tribunalDisciplinario: {
        type: tribunalDisciplinarioSchema,
        required: true
    },

    fechaRegistro:{
        type: Date,
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
    
})

const Vote = mongoose.model('Voto', voteSchema);

module.exports = {Vote, voteSchema}