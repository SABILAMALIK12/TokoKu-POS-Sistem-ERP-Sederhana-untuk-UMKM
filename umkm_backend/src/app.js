const rateLimit = require('express-rate-limit');
const { generalLimiter } = require('./middleware/rateLimiter');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const authRoutes = require('./modules/auth/auth.routes');
const produkRoutes = require('./modules/produk/produk.routes');
const transaksiRoutes = require('./modules/transaksi/transaksi.routes');
const errorHandler = require('./middleware/errorHandler');
const laporanRoutes = require('./modules/laporan/laporan.routes');
const usersRoutes = require('./modules/users/users.routes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('ERP UMKM backend jalan');
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/produk', produkRoutes);
app.use('/api/v1/transaksi', transaksiRoutes);
app.use('/api/v1/laporan', laporanRoutes);
app.use('/api/v1/users', usersRoutes);
app.use(errorHandler);

module.exports = app;