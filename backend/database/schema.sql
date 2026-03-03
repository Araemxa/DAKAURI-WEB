-- ============================================
-- DAKAURI Website - PostgreSQL Database Schema
-- Berdasarkan Class Diagram UML
-- ============================================

-- Drop tables jika sudah ada (urutan sesuai dependensi)
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS articles CASCADE;
DROP TABLE IF EXISTS program_kerja CASCADE;
DROP TABLE IF EXISTS statistik CASCADE;
DROP TABLE IF EXISTS profil_organisasi CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ============================================
-- 1. TABEL USERS (Class: Pengguna, Admin, Pengunjung)
-- ============================================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firebase_uid VARCHAR(128) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    display_name VARCHAR(100),
    role VARCHAR(20) DEFAULT 'pengunjung' CHECK (role IN ('admin', 'pengunjung')),
    phone VARCHAR(20),
    address TEXT,
    photo_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 2. TABEL PROFIL ORGANISASI (Class: ProfilOrganisasi)
-- ============================================
CREATE TABLE profil_organisasi (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('visi', 'misi', 'sejarah', 'struktur', 'tentang')),
    image TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 3. TABEL PROGRAM KERJA (Class: ProgramKerja)
-- ============================================
CREATE TABLE program_kerja (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('konservasi', 'edukasi', 'sosial', 'riset', 'ekspedisi')),
    status VARCHAR(30) DEFAULT 'akan-datang' CHECK (status IN ('akan-datang', 'berlangsung', 'selesai')),
    start_date DATE,
    end_date DATE,
    location VARCHAR(255),
    image TEXT,
    participants INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 4. TABEL STATISTIK (Class: StatistikOrganisasi)
-- ============================================
CREATE TABLE statistik (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    value INTEGER NOT NULL DEFAULT 0,
    icon VARCHAR(50),
    description TEXT,
    year INTEGER,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 5. TABEL PRODUCTS (Class: Product, TokoMerchandise)
-- ============================================
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL CHECK (category IN ('pakaian', 'aksesoris', 'tas', 'stiker', 'lainnya')),
    price DECIMAL(12, 2) NOT NULL DEFAULT 0,
    stock INTEGER NOT NULL DEFAULT 0,
    image TEXT,
    images TEXT[], -- array gambar tambahan
    weight DECIMAL(8, 2), -- berat dalam gram
    is_active BOOLEAN DEFAULT TRUE,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 6. TABEL ARTICLES (Class: Blog, Artikel)
-- ============================================
CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('kegiatan', 'edukasi', 'tips', 'berita')),
    author VARCHAR(100) NOT NULL,
    image TEXT,
    read_time INTEGER DEFAULT 5,
    views INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 7. TABEL ORDERS (Class: PaymentSystem)
-- ============================================
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_id INTEGER REFERENCES users(id),
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20),
    shipping_address TEXT NOT NULL,
    total_amount DECIMAL(12, 2) NOT NULL DEFAULT 0,
    status VARCHAR(30) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
    payment_method VARCHAR(50),
    payment_status VARCHAR(30) DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'refunded')),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 8. TABEL ORDER ITEMS (Detail pesanan)
-- ============================================
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id),
    product_name VARCHAR(255) NOT NULL,
    product_price DECIMAL(12, 2) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    subtotal DECIMAL(12, 2) NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- INDEXES untuk optimasi query
-- ============================================
CREATE INDEX idx_users_firebase_uid ON users(firebase_uid);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

CREATE INDEX idx_profil_type ON profil_organisasi(type);
CREATE INDEX idx_profil_active ON profil_organisasi(is_active);

CREATE INDEX idx_program_category ON program_kerja(category);
CREATE INDEX idx_program_status ON program_kerja(status);
CREATE INDEX idx_program_active ON program_kerja(is_active);

CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_active ON products(is_active);

CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_published ON articles(is_published);
CREATE INDEX idx_articles_published_at ON articles(published_at);

CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_number ON orders(order_number);

CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_product ON order_items(product_id);

-- ============================================
-- FUNCTION: Auto update updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers untuk auto update updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_profil_updated_at BEFORE UPDATE ON profil_organisasi FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_program_updated_at BEFORE UPDATE ON program_kerja FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_statistik_updated_at BEFORE UPDATE ON statistik FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SEED DATA: Data awal
-- ============================================

-- Profil Organisasi
INSERT INTO profil_organisasi (title, content, type, sort_order, is_active) VALUES
('Visi DAKAURI', 'Menjadi organisasi pecinta alam terdepan dalam pelestarian lingkungan dan pemberdayaan generasi muda yang peduli terhadap kelestarian alam Indonesia.', 'visi', 1, TRUE),
('Misi 1', 'Menyelenggarakan kegiatan konservasi dan pelestarian alam secara berkelanjutan.', 'misi', 1, TRUE),
('Misi 2', 'Memberikan edukasi dan pelatihan tentang pentingnya menjaga lingkungan hidup.', 'misi', 2, TRUE),
('Misi 3', 'Membangun jejaring dan kolaborasi dengan komunitas pecinta alam lainnya.', 'misi', 3, TRUE),
('Misi 4', 'Menginspirasi generasi muda untuk aktif dalam kegiatan pelestarian alam.', 'misi', 4, TRUE),
('Sejarah DAKAURI', 'DAKAURI (Dewan Aktivis Kepedulian Lingkungan dan Kelestarian Alam Universitas) didirikan pada tahun 2005 oleh sekelompok mahasiswa yang memiliki kepedulian tinggi terhadap lingkungan. Bermula dari kegiatan penanaman pohon sederhana di area kampus, organisasi ini terus berkembang dan kini menjadi salah satu UKM pecinta alam paling aktif di universitas. Selama lebih dari 18 tahun, DAKAURI telah melaksanakan berbagai kegiatan konservasi, edukasi lingkungan, dan ekspedisi alam di seluruh Indonesia.', 'sejarah', 1, TRUE);

-- Statistik
INSERT INTO statistik (title, value, icon, description, year, sort_order, is_active) VALUES
('Pohon Ditanam', 15000, 'tree', 'Total pohon yang berhasil ditanam sejak 2005', 2024, 1, TRUE),
('Anggota Aktif', 350, 'users', 'Jumlah anggota aktif DAKAURI saat ini', 2024, 2, TRUE),
('Kegiatan Per Tahun', 48, 'calendar', 'Rata-rata kegiatan yang dilaksanakan per tahun', 2024, 3, TRUE),
('Penghargaan', 25, 'trophy', 'Total penghargaan yang diraih organisasi', 2024, 4, TRUE),
('Area Konservasi (Ha)', 500, 'map', 'Luas area konservasi yang dikelola', 2024, 5, TRUE);

-- Program Kerja
INSERT INTO program_kerja (title, description, category, status, start_date, end_date, location, participants, is_active) VALUES
('Penanaman 1000 Pohon', 'Kegiatan penanaman 1000 pohon di kawasan hutan kampus untuk menambah area hijau dan mengurangi emisi karbon. Melibatkan seluruh anggota dan masyarakat sekitar.', 'konservasi', 'selesai', '2024-01-15', '2024-01-15', 'Hutan Kampus', 200, TRUE),
('Workshop Daur Ulang Sampah', 'Pelatihan kreatif mengubah sampah plastik menjadi produk bernilai ekonomi tinggi bersama komunitas lokal dan UMKM sekitar kampus.', 'edukasi', 'selesai', '2024-02-10', '2024-02-12', 'Gedung Serbaguna', 75, TRUE),
('Gerakan Bebas Sampah Pantai', 'Kolaborasi dengan komunitas pecinta pantai untuk membersihkan dan melestarikan pantai selatan. Termasuk edukasi pengelolaan sampah pesisir.', 'konservasi', 'berlangsung', '2024-03-01', '2024-03-03', 'Pantai Selatan', 150, TRUE),
('Seminar Perubahan Iklim', 'Menghadirkan pakar lingkungan nasional untuk membahas dampak perubahan iklim dan solusi inovatif. Terbuka untuk umum.', 'edukasi', 'akan-datang', '2024-04-20', '2024-04-20', 'Aula Utama', 300, TRUE),
('Ekspedisi Gunung Slamet', 'Pendakian dan riset biodiversitas di kawasan Gunung Slamet. Dokumentasi flora dan fauna endemik.', 'ekspedisi', 'akan-datang', '2024-05-15', '2024-05-18', 'Gunung Slamet', 30, TRUE);

-- Products (Merchandise)
INSERT INTO products (name, description, category, price, stock, image, is_active) VALUES
('Kaos DAKAURI - Save The Forest', 'Kaos berbahan cotton combed 30s dengan desain eksklusif DAKAURI bertema pelestarian hutan. Tersedia ukuran S, M, L, XL.', 'pakaian', 120000, 50, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600', TRUE),
('Tumbler Eco Friendly 500ml', 'Tumbler stainless steel kapasitas 500ml dengan logo DAKAURI. Ramah lingkungan, mengurangi penggunaan plastik sekali pakai.', 'aksesoris', 85000, 30, 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600', TRUE),
('Tote Bag Canvas DAKAURI', 'Tote bag berbahan canvas tebal dengan print eco-friendly. Cocok untuk kuliah, belanja, dan kegiatan sehari-hari.', 'tas', 75000, 25, 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600', TRUE),
('Stiker Pack DAKAURI (10pcs)', 'Paket 10 stiker vinyl waterproof dengan desain alam dan lingkungan. Cocok untuk laptop, botol minum, dan gadget.', 'stiker', 25000, 100, 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=600', TRUE),
('Topi Bucket Hat DAKAURI', 'Bucket hat dengan bordir logo DAKAURI. Bahan katun premium, nyaman untuk kegiatan outdoor.', 'aksesoris', 65000, 40, 'https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=600', TRUE),
('Hoodie DAKAURI - Green Earth', 'Hoodie premium berbahan fleece dengan desain Green Earth. Hangat dan stylish untuk kegiatan alam.', 'pakaian', 250000, 20, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600', TRUE);

-- Articles (Blog)
INSERT INTO articles (title, excerpt, content, category, author, image, read_time, views, comments_count, is_published, published_at) VALUES
('Penanaman 1000 Pohon di Kawasan Hutan Kampus', 'Kegiatan penanaman 1000 pohon yang melibatkan seluruh anggota DAKAURI dan masyarakat sekitar kampus sebagai bentuk nyata kepedulian terhadap lingkungan.', 'Pada tanggal 15 Januari 2024, DAKAURI berhasil melaksanakan program Penanaman 1000 Pohon di kawasan hutan kampus. Kegiatan ini melibatkan 200 peserta yang terdiri dari anggota DAKAURI, mahasiswa, dosen, dan masyarakat sekitar. Pohon yang ditanam terdiri dari berbagai jenis seperti mahoni, jati, dan trembesi yang cocok dengan kondisi tanah di area kampus. Program ini merupakan bagian dari komitmen DAKAURI untuk meningkatkan area hijau kampus dan berkontribusi dalam upaya mengurangi emisi karbon.', 'kegiatan', 'Tim DAKAURI', 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600', 5, 245, 12, TRUE, '2024-01-20'),
('Workshop Daur Ulang Sampah Plastik', 'Pelatihan kreatif mengubah sampah plastik menjadi produk bernilai ekonomi tinggi bersama komunitas lokal.', 'DAKAURI mengadakan workshop daur ulang sampah plastik selama 3 hari pada tanggal 10-12 Februari 2024. Workshop ini mengajarkan peserta cara mengolah sampah plastik menjadi berbagai produk kreatif seperti tas, pot bunga, dan aksesoris. Kegiatan ini diikuti oleh 75 peserta dari kalangan mahasiswa dan masyarakat UMKM. Narasumber berasal dari komunitas zero waste dan pengrajin daur ulang profesional.', 'edukasi', 'Divisi Edukasi', 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600', 4, 180, 8, TRUE, '2024-02-15'),
('Gerakan Bebas Sampah di Pantai Selatan', 'DAKAURI berkolaborasi dengan komunitas pecinta pantai untuk membersihkan dan melestarikan keindahan pantai selatan.', 'Gerakan Bebas Sampah di Pantai Selatan berlangsung pada 1-3 Maret 2024 dengan melibatkan 150 relawan. Tim berhasil mengumpulkan lebih dari 2 ton sampah yang didominasi oleh plastik dan styrofoam. Selain pembersihan, kegiatan ini juga mencakup edukasi kepada wisatawan dan nelayan tentang pentingnya menjaga kebersihan pantai.', 'kegiatan', 'Divisi Konservasi', 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600', 6, 320, 15, TRUE, '2024-03-05'),
('Tips Mengurangi Jejak Karbon Sehari-hari', 'Langkah-langkah sederhana yang bisa dilakukan setiap orang untuk mengurangi jejak karbon dalam aktivitas sehari-hari.', '1. Gunakan transportasi umum atau bersepeda. 2. Kurangi konsumsi daging. 3. Hemat energi listrik di rumah. 4. Gunakan tas belanja sendiri. 5. Tanam pohon di halaman rumah. 6. Pilih produk lokal untuk mengurangi food miles. 7. Kurangi penggunaan AC. 8. Pisahkan dan olah sampah rumah tangga.', 'tips', 'Tim Riset', 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=600', 7, 450, 20, TRUE, '2024-01-10'),
('Penghargaan Green Campus Award 2023', 'DAKAURI meraih penghargaan bergengsi atas kontribusi dalam mewujudkan kampus ramah lingkungan.', 'DAKAURI berhasil meraih penghargaan Green Campus Award 2023 yang diselenggarakan oleh Kementerian Lingkungan Hidup dan Kehutanan. Penghargaan ini diberikan atas kontribusi organisasi dalam program penghijauan, pengelolaan sampah, dan edukasi lingkungan di lingkungan kampus. Penghargaan diserahkan langsung oleh Menteri LHK pada acara yang berlangsung di Jakarta.', 'berita', 'Admin DAKAURI', 'https://images.unsplash.com/photo-1569183091671-696402586b9c?w=600', 3, 520, 25, TRUE, '2023-12-20'),
('Seminar Perubahan Iklim dan Dampaknya', 'Menghadirkan pakar lingkungan nasional untuk membahas isu perubahan iklim dan solusi inovatifnya.', 'Seminar bertajuk "Perubahan Iklim: Tantangan dan Solusi untuk Generasi Muda" akan diselenggarakan pada 20 April 2024 di Aula Utama kampus. Acara ini menghadirkan Prof. Dr. Ahmad Sutrisno (Pakar Klimatologi), Dr. Maya Sari (Ahli Ekologi), dan Budi Prasetyo (Aktivis Lingkungan). Seminar terbuka untuk umum dengan kapasitas 300 peserta.', 'edukasi', 'Divisi Edukasi', 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=600', 8, 150, 10, TRUE, '2024-03-15');

-- ============================================
-- VIEW: Ringkasan Dashboard Admin
-- ============================================
CREATE OR REPLACE VIEW dashboard_summary AS
SELECT
    (SELECT COUNT(*) FROM users WHERE is_active = TRUE) AS total_users,
    (SELECT COUNT(*) FROM products WHERE is_active = TRUE) AS total_products,
    (SELECT COUNT(*) FROM articles WHERE is_published = TRUE) AS total_articles,
    (SELECT COUNT(*) FROM program_kerja WHERE is_active = TRUE) AS total_programs,
    (SELECT COUNT(*) FROM orders WHERE status != 'cancelled') AS total_orders,
    (SELECT COALESCE(SUM(total_amount), 0) FROM orders WHERE payment_status = 'paid') AS total_revenue;
