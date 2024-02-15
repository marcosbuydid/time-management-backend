const { Schema, model } = require('mongoose');

const EventSchema = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }

});

module.exports = model('Event', EventSchema);