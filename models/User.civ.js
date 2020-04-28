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

civUserSchema.set('toObject', { getters: true });
civUserSchema.set('toJSON', { getters: true });

civUserSchema.virtual('candidate', {
    ref: 'Candidate',
    localField: '_id',
    foreignField: 'user'
});

const CIVUser = mongoose.model('CIVUser', civUserSchema);

module.exports = { CIVUser, civUserSchema };