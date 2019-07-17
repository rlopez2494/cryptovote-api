const mongoose = require('mongoose')
const dbConnect = require('../config/dbConnect');

//dbConnect();

const usuarioSchema = new mongoose.Schema({
    cedula: Number,
    nombre: String,
    apellido: String,
    fechaNacimiento: Date,
    sexo: String,
    password: String,
    correo: String,
    isAdmin: Boolean,
    imgUrl: String,
    puedeVotar: Boolean
})

usuarioSchema.methods.hablar = function () {
    var saludo = this.nombre ? 
    "mi nombre es" + this.nombre :
    "no tengo nombre";

    console.log(saludo);
}

const Usuario = mongoose.model('Usuario', usuarioSchema)

module.exports = Usuario;