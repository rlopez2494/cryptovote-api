const mongoose = require('mongoose')
const dbConnect = require('../config/dbConnect');

//Connect to the database
dbConnect();

const usuarioSchema = new mongoose.Schema({
    nombre: String,
    CIV: Number,
    apellido: String,
    cedula: Number,
    password: String,
    correo: String,
    isAdmin: Boolean,
    imgUrl: String,
    puedeVotar: Boolean,
    plancha: Number,
    cantidadVotos: Number
})

usuarioSchema.methods.hablar = function () {
    var saludo = this.nombre ? 
    "mi nombre es" + this.nombre :
    "no tengo nombre";

    console.log(saludo);
}

const Usuario = mongoose.model('Usuario', usuarioSchema)

module.exports = {Usuario, usuarioSchema};