const mongoose = require('mongoose');


const planchaSchema = new mongoose.Schema({
    numero: Number,

    juntaDirectiva: {
        presidente: String,
        vicepresidente: String,
        tesorero: String,
        secretarioGeneral: String
    },

    tribunalDisciplinario: {
        presidente: String,
        vicepresidente: String,
        secretarioGeneral: String
    },

    juntaDirectivaDeCentro: {
        presidente: String,
        vicepresidente: String,
        tesorero: String,
        secretarioGeneral: String
    },

    fechaRegistro:Date
})

const Plancha = mongoose.model('Plancha', planchaSchema);

module.exports = {Plancha, planchaSchema}