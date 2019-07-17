const mongoose = require('mongoose');
const votoSchema = require('./Voto').votoSchema;
const candidato = require('../models/Candidato');
const {candidatoSchema} = candidato;

//console.log("AQUI COMIENZA: ", candidatoSchema);

const eleccionSchema = new mongoose.Schema({
    fechaRegistro: Date,
    adminId: String,
    votos: [votoSchema],
    candidatos: [candidatoSchema],
    participacion: Number
})

const Eleccion = new mongoose.model('Eleccion', eleccionSchema);

module.exports = Eleccion; 