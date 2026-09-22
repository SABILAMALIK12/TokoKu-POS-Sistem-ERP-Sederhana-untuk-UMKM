const {body, validatorResult, validationResult } = require('express-validator');

const validateProduk = [
    body('nama_produk').notEmpty().withMessage('Nama produk wajib diisi'),
    body('harga').isFloat({min: 0}).withMessage('Harga harus angka positif'),
    body('stok').isInt({min: 0}).withMessage('Stok harus angka bulat, minimal 0'),
];

const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({message: 'Validasi gagal', errors: errors.array });
    }
    next();
};

module.exports = {validateProduk, handleValidation};