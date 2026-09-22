const transaksiService = require('./transaksi.service');

const create = async (req, res, next) => {
  try {
    const kasir_id = req.user.id;
    const { items, uang_diterima } = req.body;
    const result = await transaksiService.prosesTransaksi({ kasir_id, items, uang_diterima });
    res.status(201).json({ message: 'Transaksi berhasil', data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = { create };