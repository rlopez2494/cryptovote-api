const mongoose = require('mongoose');
const votoSchema = require('./Voto').votoSchema;
const usuarioSchema = require('./Usuario').usuarioSchema
//console.log("AQUI COMIENZA: ", candidatoSchema);

const eleccionSchema = new mongoose.Schema({
    juntaDirectiva: {
        presidente: [usuarioSchema],
        vicepresidente: [usuarioSchema],
        tesorero: [usuarioSchema],
        secretarioGeneral: [usuarioSchema],
        votoLista: [usuarioSchema]
    },

    tribunalDisciplinario: {
        presidente: [usuarioSchema],
        vicepresidente: [usuarioSchema],
        secretarioGeneral: [usuarioSchema],
        votoLista: [usuarioSchema]
    },

    juntaDirectivaDeCentro: {
        presidente: [usuarioSchema],
        vicepresidente: [usuarioSchema],
        tesorero: [usuarioSchema],
        secretarioGeneral: [usuarioSchema],
        votoLista: [usuarioSchema]
    },

    fechaRegistro:Date
})

const Eleccion = new mongoose.model('Eleccion', eleccionSchema);

module.exports = Eleccion; 