const pool = require ('../../config/db');

const findAll = async () => {
    const result = await pool.query('SELECT * FROM produk ORDER BY id');
    return result.rows;
};

const findById = async (id) => {
    const result = await pool.query('SELECT *FROM produk WHERE id = $1', [id]);
    return result.rows[0];
};

const create = async ({nama_produk, harga, stok, satuan, stok_minimum }) => {
    const result = await pool.query (
        `INSERT INTO produk (nama_produk, harga, stok, satuan, stok_minimum )
        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [nama_produk, harga, stok, satuan || 'pcs', stok_minimum || 5]
    );
    return result.rows[0];
};

const update = async (id, { nama_produk, harga, stok, satuan, stok_minimum }) => {
  const result = await pool.query(
    `UPDATE produk SET nama_produk = $1, harga = $2, stok = $3, satuan = $4, stok_minimum = $5
     WHERE id = $6 RETURNING *`,
    [nama_produk, harga, stok, satuan, stok_minimum, id]
  );
  return result.rows[0];
};

const remove = async (id) => {
    await pool.query('DELETE FROM produk WHERE id = $1', [id]);
};

module.exports = { findAll, findById, create, update, remove};