const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    count: Number
});

module.exports = mongoose.model('user', UserSchema);