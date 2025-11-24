# Todo App - Full Stack Application

Aplikasi Todo List berbasis web dengan React (Frontend) dan Express.js (Backend) menggunakan MySQL database.

## 📋 Fitur

- ✅ User Authentication (Login & Register)
- ✅ CRUD Todo (Create, Read, Update, Delete)
- ✅ Dark Mode & Light Mode
- ✅ Responsive Design
- ✅ Password Hashing untuk keamanan
- ✅ User-specific todos (setiap user hanya melihat todo miliknya)

## 🛠️ Requirements

- **XAMPP** (hanya untuk MySQL) atau **MySQL** standalone
- **Node.js** (v14 atau lebih tinggi)
- **npm** atau **yarn**

## 📦 Setup Project

### 1. Clone atau Download Project

```bash
# Jika menggunakan git
git clone <repository-url>
cd UAS_new-main
```

### 2. Setup Database

1. **Buka XAMPP Control Panel**
   - Start **Apache** dan **MySQL**

2. **Buka phpMyAdmin**
   - Akses: `http://localhost/phpmyadmin`

3. **Import Database**
   - Klik tab **"SQL"** atau **"Import"**
   - Jika menggunakan tab SQL: Copy-paste isi file `database.sql` yang ada di root project
   - Jika menggunakan tab Import: Pilih file `database.sql` dan klik **"Go"**
   - Database `todo_app` akan dibuat otomatis beserta tabel-tabelnya

   **Atau jalankan SQL berikut secara manual:**
   ```sql
   CREATE DATABASE IF NOT EXISTS todo_app;
   USE todo_app;

   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       username VARCHAR(50) UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   );

   CREATE TABLE todo (
       id INT AUTO_INCREMENT PRIMARY KEY,
       title VARCHAR(100) NOT NULL,
       description TEXT,
       start_date DATE NOT NULL,
       end_date DATE NOT NULL,
       completed BOOLEAN DEFAULT FALSE,
       user_id INT NOT NULL,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
       FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
   );
   ```

### 3. Setup Backend (Express.js)

1. **Masuk ke folder backend**
   ```bash
   cd todolist/backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Konfigurasi Database (Opsional)**
   - Copy file `.env.example` menjadi `.env`
   - Edit file `.env` jika perlu mengubah konfigurasi:
     ```env
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=
     DB_NAME=todo_app
     PORT=5000
     ```
   - Default sudah sesuai dengan XAMPP (password kosong)

4. **Test Backend API**
   - Pastikan MySQL sudah running di XAMPP
   - Jalankan server: `npm start`
   - Server akan berjalan di `http://localhost:5000`
   - Test dengan akses: `http://localhost:5000` (akan muncul pesan "Todo App API is running!")

### 4. Setup Frontend

1. **Masuk ke folder frontend**
   ```bash
   cd todolist/frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Konfigurasi API URL (Opsional)**
   - Jika path backend berbeda, edit file berikut:
   - `src/Login.jsx` - Line 3: `const API_URL = 'http://localhost/todolist/backend/api/auth.php';`
   - `src/App.jsx` - Line 10: `const API_URL = 'http://localhost/todolist/backend/api/todos.php';`

## 🚀 Menjalankan Aplikasi

### 1. Start Database (MySQL)

1. Buka **XAMPP Control Panel**
2. Start **MySQL** saja (tidak perlu Apache)
3. Pastikan MySQL berstatus **Running** (hijau)

### 2. Start Backend (Express.js)

1. **Buka terminal baru**
2. **Masuk ke folder backend**
   ```bash
   cd todolist/backend
   ```
3. **Jalankan server**
   ```bash
   npm start
   ```
   Atau untuk development dengan auto-reload:
   ```bash
   npm run dev
   ```
4. **Backend akan berjalan di:** `http://localhost:5000`

### 3. Start Frontend

1. **Buka terminal/command prompt**
2. **Masuk ke folder frontend**
   ```bash
   cd todolist/frontend
   ```
3. **Jalankan aplikasi**
   ```bash
   npm start
   ```
4. **Aplikasi akan otomatis terbuka di browser**
   - Default: `http://localhost:3000`
   - Jika port 3000 sudah digunakan, akan menggunakan port lain (3001, 3002, dll)

## 📁 Struktur Project

```
UAS_new-main/
├── database.sql                 # File SQL untuk import database
├── README.md                    # Dokumentasi ini
   └── todolist/
    ├── backend/
    │   ├── config/
    │   │   └── database.js      # Konfigurasi koneksi database
    │   ├── routes/
    │   │   ├── auth.js          # Routes untuk login & register
    │   │   └── todos.js         # Routes untuk CRUD todos
    │   ├── server.js            # Entry point Express server
    │   ├── package.json         # Dependencies
    │   ├── .env.example         # Contoh konfigurasi environment
    │   └── .gitignore           # Git ignore file
    └── frontend/
        ├── public/              # Static files
        ├── src/                 # Source code React
        │   ├── App.jsx          # Main component
        │   ├── Login.jsx        # Login component
        │   ├── TodoForm.jsx     # Form untuk add/edit todo
        │   ├── TodoList.jsx     # List todos
        │   └── ...
        ├── package.json         # Dependencies
        └── ...
```

## 🔌 API Endpoints

### Authentication (`/api/auth`)

**POST** `/api/auth/register` - Register user baru
```json
{
  "username": "your_username",
  "password": "your_password"
}
```

**POST** `/api/auth/login` - Login user
```json
{
  "username": "your_username",
  "password": "your_password"
}
```

### Todos (`/api/todos`)

- **GET** `/api/todos?user_id={id}` - Get all todos untuk user tertentu
- **POST** `/api/todos` - Create todo
  ```json
  {
    "title": "Todo title",
    "description": "Todo description",
    "start_date": "2024-01-01",
    "end_date": "2024-01-31",
    "user_id": 1
  }
  ```
- **PUT** `/api/todos` - Update todo
  ```json
  {
    "id": 1,
    "title": "Updated title",
    "description": "Updated description",
    "start_date": "2024-01-01",
    "end_date": "2024-01-31",
    "completed": false
  }
  ```
- **DELETE** `/api/todos?id={id}` - Delete todo

## 🐛 Troubleshooting

### Error: "Cannot connect to database"
- ✅ Pastikan MySQL di XAMPP sudah running
- ✅ Pastikan database `todo_app` sudah dibuat
- ✅ Cek konfigurasi di file `.env` di folder backend
- ✅ Pastikan username/password sesuai dengan MySQL Anda

### Error: "CORS policy" atau "Network Error"
- ✅ Pastikan backend Express.js sudah running (`npm start` di folder backend)
- ✅ Pastikan backend berjalan di port 5000
- ✅ Cek API URL di frontend: `http://localhost:5000/api/...`

### Error: "Module not found" saat npm start
- ✅ Pastikan sudah menjalankan `npm install` di folder backend
- ✅ Hapus folder `node_modules` dan `package-lock.json`, lalu jalankan `npm install` lagi

### Backend tidak bisa diakses
- ✅ Pastikan backend sudah running dengan `npm start`
- ✅ Test dengan akses: `http://localhost:5000` (harus muncul pesan "Todo App API is running!")
- ✅ Pastikan port 5000 tidak digunakan aplikasi lain
- ✅ Cek console untuk melihat error message

### Port sudah digunakan
- ✅ Jika port 3000 sudah digunakan, React akan otomatis menggunakan port lain
- ✅ Atau hentikan aplikasi yang menggunakan port tersebut
- ✅ Atau set port manual: `PORT=3001 npm start`

## 🔒 Keamanan

- Password disimpan dalam bentuk **hash** (bcrypt) di database
- Password asli **tidak pernah** disimpan di database
- Setiap user hanya bisa melihat dan mengelola todo miliknya sendiri

## 📝 Catatan

- Pastikan **MySQL** selalu running saat menggunakan aplikasi
- Pastikan **Backend Express.js** selalu running (`npm start` di folder backend)
- Data tersimpan di database MySQL, bukan di localStorage browser
- Logout akan menghapus session, tapi data tetap tersimpan di database
- Backend berjalan di port **5000** (bisa diubah di file `.env`)

## 👤 Author

Project UAS - Todo App Full Stack

---

**Selamat menggunakan aplikasi Todo List! 🎉**

