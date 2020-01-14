const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    apellido: {
        type: String,
        required: true,
        trim: true,
    },
    CIV: {
        type: Number,
        required: true,
        trim: true,
    },
    cedula: {
        type: Number,
        required: true,
        trim: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
    solvente: {
        type: Boolean,
        default: false,
    },
    voto: {
        type: Schema.Types.ObjectId,
        ref: 'Voto'
    },
    sesion: {
        type: Boolean,
        default: false,
        required: true
    },
    password: {
        type: String,
    }
})

userSchema.methods.hablar = function () {
    var saludo = this.nombre ? 
    "mi nombre es" + this.nombre :
    "no tengo nombre";

    console.log(saludo);
}

const User = mongoose.model('User', userSchema)

module.exports = { User, userSchema }