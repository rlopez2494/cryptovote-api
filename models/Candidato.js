const mongoose = require('mongoose');
const partidoSchema = require('./Partido')


const candidatoSchema = new mongoose.Schema({
    userId: String,
    candidadVotos: Number,
    partidos: [partidoSchema],
    fechaRegistro: Date,
    eleccionId: String,
    adminId: String
})

const Candidato = mongoose.model('Candidato', candidatoSchema);

module.exports = {Candidato, candidatoSchema}