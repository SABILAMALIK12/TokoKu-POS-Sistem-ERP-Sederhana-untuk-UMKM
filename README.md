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