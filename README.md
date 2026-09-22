# TokoKy POS - Sistem ERP sederhana untuk UMKM

Backend web service untuk toko kelontong : manajemen produk & stok, transaksi penjualan otomatis, dan laporan analisis (produk terlaris, stok menipis)/ Dibangun dengan arsitektur modular dan mengikuti prinsip REST API.

## Tech Stack
- Node.js + Express.js
- PostgreSQL (pg)
- JWT + Google OAuth 2.0 untuk autentikasi
- bcrypt untuk hashing password
- express-validator untuk validasi input
- express-rate-limit untuk proteksi brute-force
- helmet + CORS untuk keamanan dasar
- Morgan untuk Logging

## Arsitektur

Proyek ini pakai **feature-based modular architecture** dengan pola **Controller-Service-Repository**:

src/
├── config/ # koneksi database
├── modules/
│ ├── auth/ # register, login, Google OAuth
│ ├── users/ # approval role user (owner only)
│ ├── produk/ # CRUD produk & stok
│ ├── transaksi/ # transaksi penjualan (dengan DB transaction & row locking)
│ └── laporan/ # analisis produk terlaris, stok menipis, ringkasan penjualan
├── middleware/ # auth, error handler, rate limiter
├── utils/
└── app.js



Setiap modul terdiri dari:
- `*.routes.js` — definisi endpoint
- `*.controller.js` — terima request, kirim response
- `*.service.js` — logic bisnis
- `*.repository.js` — query ke database
- `*.validator.js` — validasi input (khusus modul yang butuh)

## Desain Akses (Role-Based Access Control)

- **pending** — role default saat baru daftar (manual atau Google), belum bisa akses fitur apapun
- **kasir** — bisa membuat transaksi penjualan, melihat produk
- **owner** — akses penuh, termasuk kelola produk, approve role user baru, dan lihat laporan

User baru harus di-approve oleh owner (`PUT /api/v1/users/:id/role`) sebelum bisa menggunakan sistem — mencegah sembarang orang mendapat akses langsung.

## Fitur Utama

- **Autentikasi ganda**: login manual (email/password) dan Google OAuth 2.0
- **Transaksi aman dari race condition**: menggunakan PostgreSQL database transaction (`BEGIN/COMMIT/ROLLBACK`) dan row locking (`FOR UPDATE`) saat mengurangi stok, sehingga dua transaksi bersamaan tidak akan membuat stok minus
- **Rate limiting**: 5 percobaan/15 menit khusus endpoint login-register (cegah brute force), 100 request/15 menit untuk endpoint lain
- **Laporan otomatis**: produk terlaris, produk dengan stok menipis, ringkasan total pendapatan

## API Endpoints

| Method | Endpoint | Akses | Keterangan |
|--------|----------|-------|------------|
| POST | /api/v1/auth/register | Public | Registrasi akun (role awal: pending) |
| POST | /api/v1/auth/login | Public | Login manual |
| POST | /api/v1/auth/google | Public | Login dengan Google OAuth |
| GET | /api/v1/users/pending | Owner | Lihat user yang belum di-approve |
| PUT | /api/v1/users/:id/role | Owner | Ubah role user (pending → kasir/owner) |
| GET | /api/v1/produk | Login (semua role aktif) | Lihat semua produk |
| GET | /api/v1/produk/:id | Login | Detail satu produk |
| POST | /api/v1/produk | Owner | Tambah produk |
| PUT | /api/v1/produk/:id | Owner | Ubah produk |
| DELETE | /api/v1/produk/:id | Owner | Hapus produk |
| POST | /api/v1/transaksi | Login | Buat transaksi penjualan (otomatis kurangi stok) |
| GET | /api/v1/laporan/produk-terlaris | Owner | Ranking produk terlaris |
| GET | /api/v1/laporan/stok-menipis | Owner | Produk dengan stok ≤ stok minimum |
| GET | /api/v1/laporan/ringkasan | Owner | Total transaksi & pendapatan |

## Cara Menjalankan

1. Clone repo ini
2. Masuk ke folder `umkm_backend`, jalankan `npm install`
3. Buat database PostgreSQL baru, jalankan skrip SQL di `database/schema.sql`
4. Copy `.env.example` menjadi `.env`, sesuaikan konfigurasi database dan Google Client ID sendiri
5. (Opsional) jalankan `node database/seed/seedProduk.js` untuk isi data produk contoh
6. Jalankan `npm start`
7. Untuk mencoba fitur login, buka `umkm-frontend/index.html` lewat Live Server

## Data Contoh

Data produk di-seed dari dataset publik [BigBasket Products](https://www.kaggle.com/datasets/surajjha101/bigbasket-entire-product-list-28k-datapoints) di Kaggle, dipetakan ke skema database sendiri.