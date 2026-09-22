const express = require('express');
const router = express.Router();
const laporanController = require('./laporan.controller');
const { verifyToken, isOwner } = require('../../middleware/authMiddleware');

router.get('/produk-terlaris', verifyToken, isOwner, laporanController.produkTerlaris);
router.get('/stok-menipis', verifyToken, isOwner, laporanController.stokMenipis);
router.get('/ringkasan', verifyToken, isOwner, laporanController.ringkasan);

module.exports = router;