const mongoose = require('mongoose')
const Schema = mongoose.Schema;

disciplinaryCourtSchema = new Schema({
    president: {
        type: Schema.Types.ObjectId,
        ref: 'Candidate'
    },
    vicepresident: {
        type: Schema.Types.ObjectId,
        ref: 'Candidate'
    },
    generalSecretary: {
        type: Schema.Types.ObjectId,
        ref: 'Candidate'
    }
})


module.exports = disciplinaryCourtSchema