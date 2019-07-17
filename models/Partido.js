const mongoose = require('mongoose');

const partidoSchema = new mongoose.Schema({
    nombre: String,
    fechaRegistro: Date,
    imgUrl: String,
    adminId: String
})

module.exports = partidoSchema