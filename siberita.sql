-- ============================================================
-- DATABASE: siberita
-- Deskripsi: Database untuk website berita Siberita
-- Dibuat    : 2026-04-16
-- ============================================================

CREATE DATABASE IF NOT EXISTS `siberita`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `siberita`;

-- ------------------------------------------------------------
-- Tabel: penulis
-- Menyimpan data akun penulis / author berita
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `penulis` (
  `id`         INT(11)      NOT NULL AUTO_INCREMENT,
  `nama`       VARCHAR(100) NOT NULL,
  `email`      VARCHAR(150) NOT NULL UNIQUE,
  `password`   VARCHAR(255) NOT NULL,          -- disimpan dalam bentuk hash (bcrypt)
  `created_at` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Tabel: berita
-- Menyimpan data artikel berita beserta relasi ke penulis
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `berita` (
  `id`            INT(11)      NOT NULL AUTO_INCREMENT,
  `judul`         VARCHAR(255) NOT NULL,
  `isi_berita`    LONGTEXT     NOT NULL,
  `gambar_berita` VARCHAR(255)     NULL DEFAULT NULL,   -- path / URL gambar
  `id_penulis`    INT(11)      NOT NULL,
  `created_at`    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_berita_penulis`
    FOREIGN KEY (`id_penulis`)
    REFERENCES `penulis` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Contoh data dummy (opsional — hapus jika tidak diperlukan)
-- ------------------------------------------------------------

-- Insert penulis
INSERT INTO `penulis` (`nama`, `email`, `password`) VALUES
('Ahmad Fauzi',   'ahmad@siberita.com',  '$2b$10$examplehashedpassword1'),
('Siti Rahma',    'siti@siberita.com',   '$2b$10$examplehashedpassword2'),
('Budi Santoso',  'budi@siberita.com',   '$2b$10$examplehashedpassword3');

-- Insert berita
INSERT INTO `berita` (`judul`, `isi_berita`, `gambar_berita`, `id_penulis`) VALUES
(
  'Teknologi AI Semakin Canggih di Tahun 2026',
  '<p>Perkembangan <strong>kecerdasan buatan (AI)</strong> terus mengalami kemajuan pesat. Berbagai sektor mulai memanfaatkan teknologi ini untuk meningkatkan efisiensi kerja dan inovasi produk dalam kehidupan sehari-hari manusia.</p><p>Beberapa <em>contoh penerapannya</em> antara lain:</p><ul><li>Mobil tanpa awak (Autonomous vehicles)</li><li>Sistem deteksi penyakit canggih</li><li>Asisten digital pintar</li></ul>',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
  1
),
(
  'Ekonomi Digital Indonesia Tumbuh 25 Persen',
  '<p>Laporan terbaru menunjukkan bahwa ekonomi digital Indonesia tumbuh sebesar <strong>25 persen</strong> dibandingkan tahun sebelumnya. Pertumbuhan ini didorong oleh meningkatnya penetrasi internet dan e-commerce di bagian timur nusantara.</p>',
  'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800',
  2
),
(
  'Pentingnya Minimalisme di Era Modern',
  '<p>Hidup di dunia yang dipenuhi informasi dan barang membuat konsep <strong>minimalisme</strong> marak diminati. Mengurangi hal-hal yang tidak esensial dipercaya dapat:</p><ul><li>Menjernihkan pikiran setiap pagi</li><li>Fokus pada produktivitas ruang kerja</li><li>Menghemat pengeluaran bulanan yang impulsif</li></ul>',
  'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=800',
  3
),
(
  'Menjaga Kesehatan Mental Pekerja Kantoran',
  '<p>Fenomena <em>burnout</em> terus menghantui kelas pekerja. Perusahaan multinasional perlahan mulai menerapkan regulasi <strong>empat hari kerja sepekan</strong> dalam rangka mendukung Work-Life Balance global.</p>',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800',
  1
),
(
  'Pariwisata Bali Kembali Cetak Rekor Pengunjung',
  '<p>Lebih dari <strong>6 juta turis mancanegara</strong> memadati Bali di awal tahun 2026. Pemerintah daerah terus melakukan pembangunan <em>infrastruktur jalan bebas hambatan</em> guna menekan kemacetan di rute turis.</p>',
  'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=800',
  2
),
(
  'Eksplorasi Antariksa: Robot Baru Tiba di Mars',
  '<p>Kendaraan penjelajah terbaru milik badan antariksa internasional sukses mendarat secara mulus di kawah Jezero. <strong>Mereka sedang membongkar formasi bebatuan</strong> mencari tanda-tanda sisa dari kehidupan mikrobial kuno.</p>',
  'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&q=80&w=800',
  3
),
(
  'Tren Kopi Susu Gula Aren Bergeser?',
  '<p>Tahun ini, antusiasme konsumen kopi di ibu kota diklaim mulai bergeser dari minuman bersusu menuju olahan biji kopi manual brew (<em>V60 & Japanese Iced</em>) yang lebih menonjolkan <strong>profil rasa asli buah ceri kopi</strong>.</p>',
  'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=800',
  1
),
(
  'Investasi Tepat di Pasar Saham bagi Pemula',
  '<p>Dengan tersebarnya literasi keuangan ke ruang kelas, generasi zial semakin disarankan melakukan <strong>investasi saham DCA (Dollar Cost Averaging)</strong> pada lapis perusahaan ber-fundamental bagus seperti sektor pendanaan perbankan.</p>',
  'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800',
  2
),
(
  'Gaya Hidup Hijau: Mengurangi Jejak Emisi Karbon',
  '<p>Penduduk rural dan urban sepakat disarankan untuk memprioritaskan pemakaian <em>transportasi massal listrik berbasis rel</em> dan meminimalisir botol plastik tunggal secara agresif kedepannya.</p>',
  'https://images.unsplash.com/photo-1418065460487-3e41a6c8e1e4?auto=format&fit=crop&q=80&w=800',
  3
),
(
  'Perkembangan Pasar EV di Asia Tenggara',
  '<p>Kapasitas pabrik peleburan dan perakitan baterai mobil <strong>EV (Electric Vehicle)</strong> melonjak tajam seiring disebarkannya program subsidi pajak kendaraan ramah lingkungan yang dibagikan secara masif oleh aliansi regional.</p>',
  'https://images.unsplash.com/photo-1593941707882-a5bba14938cb?auto=format&fit=crop&q=80&w=800',
  1
);
