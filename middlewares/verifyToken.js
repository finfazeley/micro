const jwt = require('jsonwebtoken');
const tokenBlacklist = require('./tokenBlackList');
const cookies = require('cookie-parser');
require('dotenv').config();

module.exports = (req, res, next) => {
    // Get token from header
    //const authHeader = req.header('Authorization');
    //if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).send('Access Denied');
    //const token = authHeader.replace('Bearer ', '');
    const token = req.cookies.token;
    // Check if token is in blacklist
    if (tokenBlacklist.includes(token)) return res.status(401).send('Access Denied');

    try {
        // Verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified.userId;
        next();
    }
    catch (err) {
        res.status(400).send('Invalid Token');
    }
}