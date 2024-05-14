const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fortuneMsgSchema = new Schema({
    category_id: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('FortuneMsg', fortuneMsgSchema);
