const laporanService = require('./laporan.service');

const produkTerlaris = async(req, res, next) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const data = await laporanService.getProdukTerlaris(limit);
        res.json({data});
    }catch (err) {
        next (err);
    };
};

const stokMenipis = async (req, res, next) => {
    try {
        const data = await laporanService.getStokMenipis();
        res.json({data});
    }catch (err) {
        next (err);
    };
};

const ringkasan = async (req, res, next) => {
    try {
        const data = await laporanService.getProdukTerlaris();
        res.json({data});
    }catch (err) {
        next (err);
    };
};

module.exports = { produkTerlaris, stokMenipis, ringkasan};