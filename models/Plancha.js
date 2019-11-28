const mongoose = require('mongoose');
const usuarioSchema = require('../models/Usuario').usuarioSchema

const planchaSchema = new mongoose.Schema({
    numero: Number,

    juntaDirectiva: {
        presidente: usuarioSchema,
        vicepresidente: usuarioSchema,
        tesorero: usuarioSchema,
        secretarioGeneral: usuarioSchema
    },

    tribunalDisciplinario: {
        presidente: usuarioSchema,
        vicepresidente: usuarioSchema,
        secretarioGeneral: usuarioSchema
    },

    juntaDirectivaDeCentro: {
        presidente: usuarioSchema,
        vicepresidente: usuarioSchema,
        tesorero: usuarioSchema,
        secretarioGeneral: usuarioSchema
    },

})

const Plancha = mongoose.model('Plancha', planchaSchema);

module.exports = {Plancha, planchaSchema}