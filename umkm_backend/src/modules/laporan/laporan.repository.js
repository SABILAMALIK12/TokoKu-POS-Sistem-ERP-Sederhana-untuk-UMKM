const pool = require('../../config/db');

const produkTerlaris = async(limit = 10) => {
    const result = await pool.query (
        `SELECT p.id, p.nama_produk, SUM(dt.jumlah) AS total_terjual
        FROM detail_transaksi dt
        JOIN produk p ON dt.produk_id = p.id
        GROUP BY p.id, p.nama_produk
        ORDER BY total_terjual DESC
        LIMIT $1`,
        [limit]
    );
    return result.rows;
};

const stokMenipis = async () => {
    const result = await pool.query (
        `SELECT id, nama_produk, stok, stok_minimum
        FROM produk
        WHERE stok <= stok_minimum
        ORDER BY stok ASC`
    );
    return result.rows
};

const ringkasanPenjualan = async () => {
    const result = await pool.query(
        `SELECT COUNT(*) AS total_transaksi, COALESCE(SUM(total_bayar), 0) AS total_pendapatan
        FROM transaksi `
    );
    return result.rows[0];
};

module.exports = { produkTerlaris, stokMenipis, ringkasanPenjualan};