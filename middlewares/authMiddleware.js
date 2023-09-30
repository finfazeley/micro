const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access Denied');
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified.user;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}
