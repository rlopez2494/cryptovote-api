const mongoose = require('mongoose');

const votoSchema = new mongoose.Schema({
    userId: String,
    candidatoId: String,
    partidoId: String,
    timeStamp: Date,
    eleccionId: String
})

const Voto = mongoose.model('Voto', votoSchema);

module.exports = {Voto, votoSchema}