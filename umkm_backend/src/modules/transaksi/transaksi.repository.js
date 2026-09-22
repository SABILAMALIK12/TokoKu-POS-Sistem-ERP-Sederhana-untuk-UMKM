const pool = require('../../config/db');

const findProdukById = async (client, id) => {
  const result = await client.query('SELECT * FROM produk WHERE id = $1 FOR UPDATE', [id]);
  return result.rows[0];
};

const kurangiStok = async (client, id, jumlah) => {
  await client.query('UPDATE produk SET stok = stok - $1 WHERE id = $2', [jumlah, id]);
};

const buatTransaksi = async (client, { kasir_id, total_bayar, uang_diterima, kembalian }) => {
  const result = await client.query(
    `INSERT INTO transaksi (kasir_id, total_bayar, uang_diterima, kembalian)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [kasir_id, total_bayar, uang_diterima, kembalian]
  );
  return result.rows[0];
};

const buatDetailTransaksi = async (client, { transaksi_id, produk_id, jumlah, harga_satuan_saat_transaksi, subtotal }) => {
  await client.query(
    `INSERT INTO detail_transaksi (transaksi_id, produk_id, jumlah, harga_satuan_saat_transaksi, subtotal)
     VALUES ($1, $2, $3, $4, $5)`,
    [transaksi_id, produk_id, jumlah, harga_satuan_saat_transaksi, subtotal]
  );
};

module.exports = { findProdukById, kurangiStok, buatTransaksi, buatDetailTransaksi, pool };