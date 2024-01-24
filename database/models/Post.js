const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    content: {type: String, required: true},
});//outdated version; cause of error

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;