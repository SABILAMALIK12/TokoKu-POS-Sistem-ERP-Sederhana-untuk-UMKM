const express = require('express');
const router = express.Router();
const transaksiController = require('./transaksi.controller');
const { verifyToken } = require('../../middleware/authMiddleware');

router.post('/', verifyToken, transaksiController.create);

module.exports = router;