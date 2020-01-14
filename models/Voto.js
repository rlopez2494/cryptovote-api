const mongoose = require('mongoose')
const Schema = mongoose.Schema

const juntaDirectivaSchema = require('../models/schemas/juntaDirectiva')
const juntaDirectivaDeCentroSchema = require('../models/schemas/juntaDirectivaDeCentro')
const tribunalDisciplinarioSchema = require('../models/schemas/tribunalDisciplinario')

const votoSchema = new Schema({

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
        required: true
    },

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
    
})

const Voto = mongoose.model('Voto', votoSchema);

module.exports = {Voto, votoSchema}