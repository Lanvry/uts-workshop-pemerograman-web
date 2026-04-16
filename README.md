# 📰 Siberita - Portal Berita Modern

Siberita adalah sebuah aplikasi _Web Content Management System_ (CMS) khusus portal berita yang di desain dengan konsep minimalis, elegan, dan profesional layaknya situs jurnalisme terkemuka. Aplikasi ini dibangun dengan framework **Node.js (Express.js)**, **EJS** untuk *templating engine*, dan **MySQL** sebagai *Database Management*.

Diperkaya dengan berbagai utilitas cerdas, Siberita memfasilitasi _Author_ yang berbeda-beda untuk mengatur publikasinya masing-masing dalam lingkungan yang terisolasi serta aman.

## ✨ Fitur Utama

### 1. 🔐 Autentikasi Super Aman
* **Pendaftaran Akun:** Proteksi password dengan mekanisme Hash B-Crypt (Halaman Registrasi).
* **Manajemen Sesi Pribadi:** Memanfaatkan _Express-Session_ untuk membuat ruang kerja (*Dashboard*) yang terisolasi/eksklusif bagi masing-masing jurnalis. Seseorang tidak dapat meretas URL laman Dasbor tanpa Login.
* **Dasbor "Karya Saya":** Setiap jurnalis (User) hanya dapat mengatur dan menilik Statistik Total dari Berita hasil karyanya sendiri.

### 2. 📝 Editor WYSIWYG Tingkat Lanjut (TinyMCE)
Para penulis dilarang keras mengetik secara konvensional semata!
Formulis artikel **Siberita** langsung ditenagai oleh _TinyMCE_, di mana Author leluasa merapikan paragraf yang memiliki:
* Kumpulan *List* *Bullet/Numbering*.
* Penekanan *Bold*, *Italic*, dan variasi *Align/Rata Tengah/Kanan*.
* Dukungan _Parsing_ tag-tag render HTML yang sempurna di halaman pembaca.

### 3. 🖼️ Cerdas Manajemen Gambar (Radio-Input)
Penyimpanan fleksibel di mana satu formulir dapat menangani 2 skenario input sampul:
* **Upload Lokal (Multer):** Jurnalis bisa membuang/memilih foto dari *File Explorer* sistem operasinya; atau
* **URL Internet (Hot-link):** Langsung menempelkan link URL beresolusi tinggi tanpa harus mengurangi jatah _Disk Space_ Server. 

### 4. 👔 User Experiene (UX) / Antarmuka Portal Bintang Lima
Siberita menghadirkan lingkungan _Front-End_ dengan konsep *Monokrom* rapi:
* **Headline & Grid Homepage**: Kartu artikel melayang nan halus disertai Tipografi _Google Fonts_ *"Inter"*.
* **Lingkungan Baca Terfokus**: Halaman Baca Artikel tidak dilengkapi dengan aksesoris berlebihan, menggunakan latar belakang mata netral (`#fafafa`) dan jenis font serif premium *"Merriweather"*.

### 5. 🛡️ Proteksi Database (ER_DATA_TOO_LONG)
Stabilitas Aplikasi adalah kunci:
* Teks judul telah disaring _(Sub-String Backend)_ & _Max-Length Frontend_ untuk secara otomatis menolak dan memotong input gila bila seseorang dengan iseng mem-_paste_ isi *paragraph* ke dalam bidang *Judul Berita*.

---

## 🚀 Panduan Instalasi dan Deployment Local

### Syarat Instalasi Luring (Prerequisite):
1. **Node.js** ter-instal di sistem / komputer Anda.
2. Web Server Lokal seperti **XAMPP / Laragon** berjalan pada servis *Apache & MySQL*.

### Langkah Awal
1. **Atur Dependensi:**
   Buka Terminal / Command Prompt pada root (_Folder Utama Siberita_), kemudian ketik:
   ```bash
   npm install
   ```
2. **Impor Skema Database:**
   * Buka Panel [phpMyAdmin (http://localhost/phpmyadmin)](http://localhost/phpmyadmin/) Anda.
   * Buat pangkalan *Database* kosongan *(New)* dengan penamaan: `siberita` .
   * Masuk ke tab **Import** lalu unggah/eksekusi fail *Dump* berjudul `siberita.sql`. File dump tersebut juga sudah menyiapkan 10 Dummy Master Data (*Unsplash* HD & artikel jurnalis).

3. **Inisiasi Node:**
   Kembali kepada Terminal/Konsol Aplikasi Anda, hidupkan dengan sihir: 
   ```bash
   npm start
   ```

4. **Kunjungi Website Ciptaanmu! 🎉**
   Buka Browser Anda dan langsung mengetuk alamat Portal:
   * **`http://localhost:3000/`** ➡️ (Layar Publik/Pembaca)
   * **`http://localhost:3000/login`** ➡️ (Akses ke area Penulis/Dasbor Rahasia)

---
*Dikembangkan di Bengkel **Arjuna Lanang Adiwarsana / Lanvry*** 💻
