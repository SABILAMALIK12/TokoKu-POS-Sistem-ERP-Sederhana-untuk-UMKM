require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool ({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

pool.connect((err) => {
    if (err) {
        console.error('Koneksi database gagal', err.message);
        return;
    }
    console.log('koneksi berhasil terhubung');
})

module.exports = pool;