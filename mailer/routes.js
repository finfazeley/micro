const express = require('express');
const router = express.Router();
const checkLogin = require('../src/middlewares/checkLogin');

const Sender = require('./send');

// post mail
router.post('/mail', checkLogin, Sender.postReset);

module.exports = router;