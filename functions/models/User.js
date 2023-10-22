const mongoose = require('mongoose');

const UserserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    purchases: [Number],
});

module.exports = mongoose.model('User', UserserSchema);
