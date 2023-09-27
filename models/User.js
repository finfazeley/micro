const mongoose = require('mongoose');

const UserserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
});

module.exports = mongoose.model('User', UserserSchema);
