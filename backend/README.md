# Backend API - Express.js

Backend API untuk Todo App menggunakan Express.js dan MySQL.

## 🛠️ Requirements

- Node.js (v14 atau lebih tinggi)
- MySQL (XAMPP atau standalone)
- npm atau yarn

## 📦 Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Konfigurasi Database

1. Copy file `.env.example` menjadi `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit file `.env` sesuai dengan konfigurasi MySQL Anda:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=todo_app
   PORT=5000
   ```

### 3. Pastikan Database Sudah Dibuat

- Database `todo_app` harus sudah dibuat
- Import file `database.sql` dari root project ke phpMyAdmin

## 🚀 Menjalankan

### Development Mode (dengan auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

Server akan berjalan di: `http://localhost:5000`

## 📁 Struktur Project

```
backend/
├── config/
│   └── database.js      # Konfigurasi koneksi MySQL
├── routes/
│   ├── auth.js          # Routes untuk authentication
│   └── todos.js         # Routes untuk CRUD todos
├── server.js            # Entry point Express server
├── package.json         # Dependencies
├── .env                 # Environment variables (buat dari .env.example)
└── .env.example         # Contoh konfigurasi
```

## 🔌 API Endpoints

### Authentication

**POST** `/api/auth/register`
- Register user baru
- Body: `{ "username": "...", "password": "..." }`

**POST** `/api/auth/login`
- Login user
- Body: `{ "username": "...", "password": "..." }`

### Todos

**GET** `/api/todos?user_id={id}`
- Get all todos untuk user tertentu

**POST** `/api/todos`
- Create todo baru
- Body: `{ "title": "...", "description": "...", "start_date": "...", "end_date": "...", "user_id": 1 }`

**PUT** `/api/todos`
- Update todo
- Body: `{ "id": 1, "title": "...", "description": "...", "start_date": "...", "end_date": "...", "completed": false }`

**DELETE** `/api/todos?id={id}`
- Delete todo

## 🔒 Keamanan

- Password di-hash menggunakan **bcrypt** (10 rounds)
- Password asli tidak pernah disimpan di database
- CORS sudah dikonfigurasi untuk frontend

## 📝 Dependencies

- **express**: Web framework
- **mysql2**: MySQL client untuk Node.js
- **bcrypt**: Password hashing
- **cors**: CORS middleware
- **dotenv**: Environment variables

## 🐛 Troubleshooting

### Error: "Cannot connect to database"
- Pastikan MySQL sudah running
- Cek konfigurasi di file `.env`
- Pastikan database `todo_app` sudah dibuat

### Error: "Port 5000 already in use"
- Ubah PORT di file `.env` ke port lain (misal: 5001)
- Atau hentikan aplikasi yang menggunakan port 5000

### Error: "Module not found"
- Jalankan `npm install` lagi
- Hapus `node_modules` dan `package-lock.json`, lalu `npm install`
