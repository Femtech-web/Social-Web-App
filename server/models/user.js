const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: String,
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minimum: 8,
    }
})

module.exports = mongoose.model('user', userSchema);