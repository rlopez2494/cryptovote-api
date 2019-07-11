const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://robert:XT1671.motog@tmcluster-ha3b6.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true})

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