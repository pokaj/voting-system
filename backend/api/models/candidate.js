const mongoose = require('mongoose');

const candidateSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    votes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null
        }
    ]
});

module.exports = mongoose.model('Candidate', candidateSchema);