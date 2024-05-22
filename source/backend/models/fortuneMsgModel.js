const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fortuneMsgSchema = new Schema({
    fortune_id: {
        type: String,
        unique: true
    },
    user_id: {
        type: String,
        required: true
    },
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

fortuneMsgSchema.pre('save', function(next) {
    if (!this.fortune_id) {
        this.fortune_id = this._id.toString();
    }
    next();
});
module.exports = mongoose.model('FortuneMsg', fortuneMsgSchema);
