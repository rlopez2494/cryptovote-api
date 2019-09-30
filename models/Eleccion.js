const mongoose = require('mongoose');
const votoSchema = require('./Voto').votoSchema;

//console.log("AQUI COMIENZA: ", candidatoSchema);

const eleccionSchema = new mongoose.Schema({
    fechaRegistro: Date,
    adminId: String,
    votos: [votoSchema],
    candidatos: [],
    participacion: Number
})

const Eleccion = new mongoose.model('Eleccion', eleccionSchema);

module.exports = Eleccion; 