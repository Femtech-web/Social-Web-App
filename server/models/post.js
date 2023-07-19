const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: String,
    context: String,
    creator: String,
    name: String,
    tags: [String],
    selectedFile:  {
        type: [String],
        default: []
    },
    likes: {
        type: [String],
        default: []
    },
    comments: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date
    }
})

module.exports = mongoose.model('post', PostSchema)