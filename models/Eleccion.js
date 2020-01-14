const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eleccionSchema = new Schema({
    planchas: [{
        type: Schema.Types.ObjectId,
        ref: 'Plancha',
        default: []
    }],
    fechaCreacion: {
        required: true,
        type: Date
    },
    admins: [{
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }],
    actualizadoDate: {
        type: Date,
        required: true
    }
})

const Eleccion = mongoose.model('Eleccion', eleccionSchema)

module.exports = Eleccion