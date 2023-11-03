const mongoose = require('mongoose');

const ContentSchema = new mongoose.Schema({
    title: String,
    category: String,
    userId: String,
    content: String,
});

module.exports = mongoose.model('content', ContentSchema);