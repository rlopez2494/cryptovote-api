const mongoose = require('mongoose');
const Schema = mongoose.Schema

const directiveBoardSchema = 
    require('./schemas/directiveBoard')

const districtDirectiveBoardSchema = 
    require('../models/schemas/districtDirectiveBoard')

const disciplinaryCourtSchema = 
    require('../models/schemas/disciplinaryCourt')

const plateSchema = new Schema({
    number: {
        type: Number,
        required: true
    },
    
    votos: [{
        type: Schema.Types.ObjectId,
        ref: 'Vote',
        default: []
    }],

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

    owner: {
        type: Schema.Types.ObjectId,
        ref: 'CIVUser',
        required: true
    }

})

const Plate = mongoose.model('Plate', plateSchema);

module.exports = { Plate, plateSchema } 