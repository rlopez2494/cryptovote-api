const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/cryptovote', {useNewUrlParser: true})

const usuarioSchema = new mongoose.Schema({
    cedula: String,
    nombre: String,
    apellido: String,
    fechaNacimiento: String,
    sexo: String,
    password: String,
    correo: String
})

usuarioSchema.methods.hablar = function () {
    var saludo = this.nombre ? 
    "mi nombre es" + this.nombre :
    "no tengo nombre";

    console.log(saludo)
}

const Usuario = mongoose.model('Usuario', usuarioSchema)

module.exports = Usuario