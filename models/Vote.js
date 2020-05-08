const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const directiveBoardSchema = require('./schemas/directiveBoard');
const districtDirectiveBoardSchema = require('../models/schemas/districtDirectiveBoard');
const disciplinaryCourtSchema = require('../models/schemas/disciplinaryCourt');

const voteSchema = new Schema({

    directiveBoard: {
        type: directiveBoardSchema,
        required: true
    },

    districtDirectiveBoard: {
        type: districtDirectiveBoardSchema,
        required: true
    },

    disciplinaryCourt: {
        type: disciplinaryCourtSchema,
        required: true
    },

    registerDate:{
        type: Date,
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
    
})

const Vote = mongoose.model('Vote', voteSchema);

module.exports = { Vote, voteSchema }