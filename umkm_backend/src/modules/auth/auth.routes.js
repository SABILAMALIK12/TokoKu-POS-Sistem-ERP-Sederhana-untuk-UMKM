const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const { authLimiter } = require('../../middleware/rateLimiter');

router.post('/register', authLimiter, authController.register);
router.post('/login', authLimiter, authController.login);
router.post('/google', authController.googleLogin); // OAuth nggak perlu limit seketat ini, karena verifikasi udah ditangani Google

module.exports = router;