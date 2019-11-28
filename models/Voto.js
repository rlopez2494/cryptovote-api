const mongoose = require('mongoose');

const votoSchema = new mongoose.Schema({

    juntaDirectiva: {
        presidente: String,
        vicepresidente: String,
        tesorero: String,
        secretarioGeneral: String,
        votoLista: String
    },

    tribunalDisciplinario: {
        presidente: String,
        vicepresidente: String,
        secretarioGeneral: String,
        votoLista: String
    },

    juntaDirectivaDeCentro: {
        presidente: String,
        vicepresidente: String,
        tesorero: String,
        secretarioGeneral: String,
        votoLista: String
    },

    fechaRegistro:Date
    
})

const Voto = mongoose.model('Voto', votoSchema);

module.exports = {Voto, votoSchema}