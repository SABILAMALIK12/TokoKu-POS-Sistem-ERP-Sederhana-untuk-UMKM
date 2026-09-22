const rateLimit = require('express-rate-limit');

const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 menit
    max: 100, //maksimal 100 request per IP dalam 15 menit
    message: {message: 'Terlalu banyak request, coba lagi beberapa menit lagi'},
    standardHeaders: true,
    legacyHeaders: false,
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: {message: 'Terlalu banyak percobaan login/register, coba lagi 15 menit  lagi'},
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = { generalLimiter, authLimiter};