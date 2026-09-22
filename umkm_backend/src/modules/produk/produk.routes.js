const express = require('express');
const router = express.Router();
const produkController = require('./produk.controller');
const { verifyToken, isOwner } = require('../../middleware/authMiddleware');
const { validateProduk, handleValidation } = require('./produk.validator');

router.get('/', verifyToken, produkController.getAll);
router.get('/:id', verifyToken, produkController.getById);
router.post('/', verifyToken, isOwner, validateProduk, handleValidation, produkController.create);
router.put('/:id', verifyToken, isOwner, validateProduk, handleValidation, produkController.update);
router.delete('/:id', verifyToken, isOwner, produkController.remove);

module.exports = router;