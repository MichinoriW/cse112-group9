const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fortuneCategorySchema = new Schema({
    category_id: {
        type: String,
        required: true,
        unique: true
    },
    category_name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('FortuneCategory', fortuneCategorySchema);
