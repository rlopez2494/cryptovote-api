const mongoose = require('mongoose');
const Schema = mongoose.Schema

const juntaDirectivaSchema = 
    require('../models/schemas/juntaDirectiva')

const juntaDirectivaDeCentroSchema = 
    require('../models/schemas/juntaDirectivaDeCentro')

const tribunalDisciplinarioSchema = 
    require('../models/schemas/tribunalDisciplinario')

const plateSchema = new Schema({
    numero: {
        type: Number,
        required: true
    },
    
    votos: [{
        type: Schema.Types.ObjectId,
        ref: 'Vote',
        default: []
    }],

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

})

const Plate = mongoose.model('Plate', plateSchema);

module.exports = { Plate, plateSchema } 