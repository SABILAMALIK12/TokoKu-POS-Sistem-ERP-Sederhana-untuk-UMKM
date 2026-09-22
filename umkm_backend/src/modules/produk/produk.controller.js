const produkService = require('./produk.service');

    const getAll  = async(req, res, next) => {
        try{
            const data = await produkService.getAll();
            res.json({data});
        }catch (err) {
            next (err);
        }
    };

    const getById = async (req, res, next) => {
        try{
            const data = await produkService.getById(req.params.id);
            res.json({data });
        }catch(err){
            next(err);
        }
    };

    const create = async(req, res, next) => {
        try{
            const data = await produkService.createProduk(req.body);
            res.status(201).json({meesage: 'Produk berhasil ditambahkan', data});
        }catch (err) {
            next (err);
        }
    };

    const update = async (req, res, next) => {
        try {
            const data = await produkService.updateProduk(req.params.id, req.body);
            res.json({ message: 'Produk berhasil diperbarui', data });
        } catch (err) {
            next(err);
        }
    };

    const remove = async (req, res, next) => {
        try {
            await produkService.deleteProduk(req.params.id);
            res.json({ message: 'Produk berhasil dihapus' });
        } catch (err) {
            next(err);
        }
};

module.exports = { getAll, getById, create, update, remove };

