const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userReadingSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    fortune_id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('UserReading', userReadingSchema);
