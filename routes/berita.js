var express = require('express');
var router = express.Router();
var isAuth = require('../middleware/isAuth');
const Model_Berita = require('../model/Model_Berita');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Konfigurasi Multer untuk upload gambar
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = './public/uploads/';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

/* GET list berita. */
router.get('/', isAuth, async function(req, res, next) {
  try {
    var data = await Model_Berita.getAll();
    res.render('berita/index', {
      title: 'Manajemen Berita',
      data: data,
      penulis: req.session.user,
      messages: req.flash()
    });
  } catch (err) {
    req.flash('error', 'Gagal memuat data berita.');
    res.render('berita/index', {
      title: 'Manajemen Berita',
      data: [],
      penulis: req.session.user,
      messages: req.flash()
    });
  }
});

/* GET create berita. */
router.get('/create', isAuth, function(req, res, next) {
    res.render('berita/create', {
        title: 'Tambah Berita Baru',
        penulis: req.session.user,
        messages: req.flash()
    });
});

/* POST create berita. */
router.post('/store', isAuth, upload.single('gambar_berita'), async function(req, res, next) {
    try {
        let { judul, isi_berita } = req.body;
        let data = {
            judul: judul,
            isi_berita: isi_berita,
            id_penulis: req.session.user.id
        };
        if(req.file) {
            data.gambar_berita = 'uploads/' + req.file.filename;
        }
        await Model_Berita.insert(data);
        req.flash('success', 'Berhasil menambahkan berita!');
        res.redirect('/dashboard/berita');
    } catch(err) {
        req.flash('error', 'Gagal menyimpan berita.');
        res.redirect('/dashboard/berita/create');
    }
});

/* GET edit berita. */
router.get('/edit/:id', isAuth, async function(req, res, next) {
    try {
        let id = req.params.id;
        let data = await Model_Berita.getById(id);
        if(data.length > 0) {
            res.render('berita/edit', {
                title: 'Edit Berita',
                berita: data[0],
                penulis: req.session.user,
                messages: req.flash()
            });
        } else {
            req.flash('error', 'Berita tidak ditemukan.');
            res.redirect('/dashboard/berita');
        }
    } catch (err) {
        req.flash('error', 'Terjadi kesalahan sistem.');
        res.redirect('/dashboard/berita');
    }
});

/* POST update berita. */
router.post('/update/:id', isAuth, upload.single('gambar_berita'), async function(req, res, next) {
    try {
        let id = req.params.id;
        let { judul, isi_berita } = req.body;
        let data = {
            judul: judul,
            isi_berita: isi_berita
        };
        
        if (req.file) {
            data.gambar_berita = 'uploads/' + req.file.filename;
        }
        
        await Model_Berita.update(id, data);
        req.flash('success', 'Berita berhasil diupdate!');
        res.redirect('/dashboard/berita');
    } catch(err) {
        req.flash('error', 'Gagal mengedit berita.');
        res.redirect('/dashboard/berita');
    }
});

/* GET delete (Action) berita. */
router.get('/delete/:id', isAuth, async function(req, res, next) {
    try {
        let id = req.params.id;
        await Model_Berita.delete(id);
        req.flash('success', 'Berita berhasil dihapus!');
        res.redirect('/dashboard/berita');
    } catch(err) {
        req.flash('error', 'Gagal menghapus berita.');
        res.redirect('/dashboard/berita');
    }
});

module.exports = router;
