const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Department', categorySchema);