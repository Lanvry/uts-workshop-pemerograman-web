var express = require('express');
var router = express.Router();
var isAuth = require('../middleware/isAuth');
var isAdmin = require('../middleware/isAdmin');
const bcrypt = require('bcryptjs');
const Model_Users = require('../model/Model_Users');

// Semua rute di file ini membutuhkan otentikasi login DAN hak akses Admin
router.use(isAuth, isAdmin);

/* GET daftar penulis. */
router.get('/', async function(req, res, next) {
    try {
        var data = await Model_Users.getAll();
        res.render('penulis/index', {
            title: 'Manajemen Daftar Penulis',
            data: data,
            penulis: req.session.user,
            messages: req.flash()
        });
    } catch(err) {
        req.flash('error', 'Gagal memuat data penulis');
        res.redirect('/dashboard');
    }
});

/* GET create penulis */
router.get('/create', function(req, res, next) {
    res.render('penulis/create', {
        title: 'Tambah Penulis Baru',
        penulis: req.session.user,
        messages: req.flash()
    });
});

/* POST store penulis */
router.post('/store', async function(req, res, next) {
    try {
        const { nama, email, password } = req.body;
        const hashPassword = bcrypt.hashSync(password, 10);
        await Model_Users.Register(nama, email, hashPassword);
        req.flash('success', 'Berhasil menambahkan Penulis baru!');
        res.redirect('/dashboard/penulis');
    } catch(err) {
        req.flash('error', 'Gagal menyimpan, mungkin Email sudah terpakai.');
        res.redirect('/dashboard/penulis/create');
    }
});

/* GET edit penulis */
router.get('/edit/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        let data = await Model_Users.getById(id);
        if(data.length > 0) {
            res.render('penulis/edit', {
                title: 'Edit Data Penulis',
                target_penulis: data[0],
                penulis: req.session.user,
                messages: req.flash()
            });
        } else {
            req.flash('error', 'Penulis tidak ditemukan.');
            res.redirect('/dashboard/penulis');
        }
    } catch(err) {
        req.flash('error', 'Terjadi kesalahan sistem.');
        res.redirect('/dashboard/penulis');
    }
});

/* POST update penulis */
router.post('/update/:id', async function(req, res, next) {
    try {
        const id = req.params.id;
        const { nama, email, password } = req.body;
        let dataToUpdate = { nama, email };
        
        if (password && password.trim() !== "") {
            dataToUpdate.password = bcrypt.hashSync(password, 10);
        }
        
        await Model_Users.UpdateProfile(id, dataToUpdate);
        req.flash('success', 'Berhasil mengupdate data penulis!');
        res.redirect('/dashboard/penulis');
    } catch(err) {
        req.flash('error', 'Gagal merubah data. Email mungkin sudah dipakai.');
        res.redirect(`/dashboard/penulis/edit/${req.params.id}`);
    }
});

/* GET delete penulis */
router.get('/delete/:id', async function(req, res, next) {
    try {
        let id = req.params.id;
        // Pilihan keamanan: hindari delete diri sendiri
        if (id == req.session.user.id) {
            req.flash('error', 'Anda tidak dapat menghapus diri sendiri lewat panel ini!');
            return res.redirect('/dashboard/penulis');
        }
        await Model_Users.delete(id);
        req.flash('success', 'Berhasil menghapus Penulis sekaligus seluruh artikelnya.');
        res.redirect('/dashboard/penulis');
    } catch(err) {
        req.flash('error', 'Gagal menghapus penulis.');
        res.redirect('/dashboard/penulis');
    }
});

module.exports = router;
