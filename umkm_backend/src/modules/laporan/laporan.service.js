const laporanRepository = require('./laporan.repository');

const getProdukTerlaris = (limit) => laporanRepository.produkTerlaris(limit);
const getStokMenipis = () => laporanRepository.stokMenipis();
const getRingkasan = () => laporanRepository.ringkasanPenjualan();

module.exports = {getProdukTerlaris, getStokMenipis, getRingkasan};