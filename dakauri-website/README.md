# DAKAURI Website

Website organisasi DAKAURI (Dewan Aktivis Kepedulian Lingkungan dan Kelestarian Alam Universitas) - sebuah organisasi pecinta alam yang fokus pada pelestarian lingkungan.

## 🌿 Fitur

### Halaman Publik
- **Home** - Landing page dengan hero section, statistik, fitur, dan CTA
- **Profil** - Informasi visi, misi, sejarah, dan struktur organisasi
- **Program Kerja** - Daftar program dan kegiatan dengan filter kategori
- **Statistik** - Data pencapaian organisasi dengan animasi counter dan timeline
- **Merchandise** - Toko merchandise dengan keranjang belanja
- **Blog** - Artikel dan berita terbaru
- **Cart** - Keranjang belanja untuk merchandise

### Admin Dashboard
- **Dashboard** - Overview statistik dan aktivitas terbaru
- **Kelola Profil** - CRUD informasi organisasi
- **Kelola Program Kerja** - CRUD program kegiatan
- **Kelola Merchandise** - CRUD produk merchandise
- **Kelola Statistik** - CRUD data statistik
- **Kelola Blog** - CRUD artikel blog

## 🛠️ Tech Stack

- **Frontend**: React.js + Vite
- **Styling**: Custom CSS dengan CSS Variables
- **Routing**: React Router DOM
- **State Management**: Context API (AuthContext, CartContext)
- **Authentication**: Firebase Authentication
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Notifications**: React Hot Toast

## 📦 Instalasi

1. Clone repository
```bash
git clone [repository-url]
cd dakauri-website
```

2. Install dependencies
```bash
npm install
```

3. Setup environment variables
```bash
cp .env.example .env
```

4. Edit `.env` dengan konfigurasi Firebase Anda:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

5. Jalankan development server
```bash
npm run dev
```

## 📁 Struktur Folder

```
src/
├── assets/           # Gambar, font, dan static files
├── components/
│   ├── common/       # Navbar, Footer, Loading
│   ├── auth/         # ProtectedRoute
│   └── admin/        # ManageContent component
├── config/
│   └── firebase.js   # Konfigurasi Firebase
├── contexts/
│   ├── AuthContext.jsx   # Authentication state
│   └── CartContext.jsx   # Shopping cart state
├── hooks/            # Custom hooks
├── pages/
│   ├── public/       # Halaman publik
│   └── admin/        # Halaman admin
├── services/
│   └── api.js        # Axios HTTP client
├── styles/
│   └── global.css    # CSS variables & global styles
├── utils/            # Helper functions
├── App.jsx           # Root component dengan routes
└── main.jsx          # Entry point
```

## 🎨 Brand Colors

- **Primary**: #2D5A27 (Green)
- **Primary Dark**: #1E3D1A
- **Secondary**: #F4A261 (Orange)
- **Accent**: #E76F51 (Coral)
- **Light Green**: #E8F5E3

## 🔐 Autentikasi

Website menggunakan Firebase Authentication. Untuk mengakses halaman admin:

1. Buat akun di Firebase Console
2. Setup Authentication dengan Email/Password
3. Set role admin via Firestore atau custom claims

## 🚀 Deployment

Build untuk production:
```bash
npm run build
```

Preview build:
```bash
npm run preview
```

## 📝 Backend API

Website ini membutuhkan backend API untuk fitur CRUD. Endpoint yang dibutuhkan:

- `GET/POST /api/profil` - Data profil organisasi
- `GET/POST/PUT/DELETE /api/program-kerja` - Program kerja
- `GET/POST/PUT/DELETE /api/statistik` - Data statistik
- `GET/POST/PUT/DELETE /api/merchandise` - Produk merchandise
- `GET/POST/PUT/DELETE /api/blog` - Artikel blog
- `POST /api/orders` - Pemesanan merchandise

## 📄 Lisensi

© 2024 DAKAURI. All rights reserved.
