require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { parse} = require('csv-parse/sync');
const pool =require('../../config/db');

const filePath = path.join(__dirname, 'produk.csv');
const fileContent = fs.readFileSync(filePath, 'utf-8');

const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
}); 

const seed = async () => {
    let count = 0;

     for (const row of records) {
        const nama_produk = row['ProductName'];
        const harga = parseFloat(row['Price']);

        if (!nama_produk || isNaN(harga)) continue;
        if (count >= 50) break;
        
        await pool.query(
            `INSERT INTO produk (nama_produk, harga, stok, satuan, stok_minimum)
            VALUES ($1, $2, $3, $4, $5)`,
            [nama_produk, harga, 50, 'pcs', 10]
        );
        count++;
     }
     console.log(`berhasil masukin ${count} produk dari csv`);
     process.exit(0);
};

seed().catch((err) => {
    console.error('gagal seeding: ', err);
    process.exit(1);
});