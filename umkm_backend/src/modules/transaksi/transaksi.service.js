const { pool, findProdukById, kurangiStok, buatTransaksi, buatDetailTransaksi } = require('./transaksi.repository');

const prosesTransaksi = async ({ kasir_id, items, uang_diterima }) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    let total_bayar = 0;
    const detailItems = [];

    for (const item of items) {
      const produk = await findProdukById(client, item.produk_id);

      if (!produk) {
        const error = new Error(`Produk dengan id ${item.produk_id} tidak ditemukan`);
        error.statusCode = 404;
        throw error;
      }

      if (produk.stok < item.jumlah) {
        const error = new Error(`Stok ${produk.nama_produk} tidak cukup (sisa ${produk.stok})`);
        error.statusCode = 400;
        throw error;
      }

      const subtotal = produk.harga * item.jumlah;
      total_bayar += subtotal;

      detailItems.push({
        produk_id: produk.id,
        jumlah: item.jumlah,
        harga_satuan_saat_transaksi: produk.harga,
        subtotal,
      });
    }

    if (uang_diterima < total_bayar) {
      const error = new Error('Uang diterima kurang dari total bayar');
      error.statusCode = 400;
      throw error;
    }

    const kembalian = uang_diterima - total_bayar;
    const transaksi = await buatTransaksi(client, { kasir_id, total_bayar, uang_diterima, kembalian });

    for (const detail of detailItems) {
      await buatDetailTransaksi(client, { transaksi_id: transaksi.id, ...detail });
      await kurangiStok(client, detail.produk_id, detail.jumlah);
    }

    await client.query('COMMIT');
    return { transaksi, items: detailItems };

  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

module.exports = { prosesTransaksi };