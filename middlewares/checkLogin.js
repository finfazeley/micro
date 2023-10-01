const jwt = require('jsonwebtoken');
const tokenBlacklist = require('./tokenBlackList');
const cookies = require('cookie-parser');

module.exports = (req, res, next) => {
    // Get token from cookie
    const token = req.cookies.token;
    // Check if token is in blacklist
    if (!token || tokenBlacklist.includes(token)) {next();return;}

    try {
        // Verify token
        const verified = jwt.verify(token, 'YOUR_SECRET_KEY');
        req.user = verified.userId;
        next();
    }
    catch (err) {
        next();
    }
}