const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const civSchema = new Schema({
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
});

const CIVUser = mongoose.model('CIVUser', civSchema);

module.exports = CIVUser;