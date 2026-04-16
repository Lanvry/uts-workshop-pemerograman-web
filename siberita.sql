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
  'Perkembangan kecerdasan buatan (AI) terus mengalami kemajuan pesat. Berbagai sektor mulai memanfaatkan teknologi ini untuk meningkatkan efisiensi kerja dan inovasi produk...',
  'uploads/ai-teknologi.jpg',
  1
),
(
  'Ekonomi Digital Indonesia Tumbuh 25 Persen',
  'Laporan terbaru menunjukkan bahwa ekonomi digital Indonesia tumbuh sebesar 25 persen dibandingkan tahun sebelumnya. Pertumbuhan ini didorong oleh meningkatnya penetrasi internet...',
  'uploads/ekonomi-digital.jpg',
  2
),
(
  'Gempa Bumi Guncang Wilayah Jawa Timur',
  'Sebuah gempa bumi dengan magnitudo 5,4 mengguncang wilayah Jawa Timur pada pukul 07.30 WIB. Badan Meteorologi Klimatologi dan Geofisika (BMKG) melaporkan bahwa...',
  'uploads/gempa-jatim.jpg',
  3
);
