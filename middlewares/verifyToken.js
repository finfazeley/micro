const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Get token from header
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).send('Access Denied');

    const token = authHeader.replace('Bearer ', '');

    try {
        // Verify token
        const verified = jwt.verify(token, 'YOUR_SECRET_KEY');
        req.user = verified.user;
        next();
    }
    catch (err) {
        res.status(400).send('Invalid Token');
    }
}