const produkRepository = require('./produk.repository');

const getAll = () => produkRepository.findAll();

const getById = async (id) => {
  const produk = await produkRepository.findById(id);
  if (!produk) {
    const error = new Error('Produk tidak ditemukan');
    error.statusCode = 404;
    throw error;
  }
  return produk;
};

const createProduk = (data) => produkRepository.create(data);

const updateProduk = async (id, data) => {
  await getById(id); // pastikan produk ada dulu, kalau nggak, otomatis throw 404
  return produkRepository.update(id, data);
};

const deleteProduk = async (id) => {
  await getById(id);
  return produkRepository.remove(id);
};

module.exports = { getAll, getById, createProduk, updateProduk, deleteProduk };