const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
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
    password:{
        type: String,
        default: null
    },
    votes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            default: null
        }
    ]
});

module.exports = mongoose.model('User', userSchema);