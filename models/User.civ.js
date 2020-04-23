const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const civUserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    CIV: {
        type: Number,
        required: true,
        trim: true,
    }
});

const CIVUser = mongoose.model('CIVUser', civUserSchema);

module.exports = { CIVUser, civUserSchema };