var express = require("express");
var router = express.Router();
var isAuth = require("../middleware/isAuth");

const bcrypt = require("bcryptjs");
const Model_Users = require("../model/Model_Users");
const Model_Berita = require("../model/Model_Berita");

/* GET login page. */
router.get("/login", function (req, res, next) {
    if (req.session.isLoggedIn) {
        res.redirect("/dashboard");
    }
    res.render("auth/login", {
        title: "Login Data",
        messages: req.flash()
    });
});

/* POST login data. */
router.post("/loginSave", async function (req, res, next) {
    const { email, password } = req.body;
    try {
        let Data = await Model_Users.Login(email);
        if (Data.length > 0) {
            const user = Data[0];
            if (bcrypt.compareSync(password, user.password)) {
                console.log('login berhasil');
                delete user.password;
                req.session.user = user;
                req.session.isLoggedIn = true;
                res.redirect("/dashboard");
            } else {
                req.flash('error', 'Kombinasi email dan password salah!');
                res.redirect('/login');
            }
        } else {
            req.flash('error', 'Kombinasi email dan password salah!');
            res.redirect('/login');
        }
    } catch (err) {
        req.flash('error', 'Terjadi kesalahan sistem');
        res.redirect('/login');
    }
});

/* GET register page. */
router.get("/register", function (req, res, next) {
    if (req.session.isLoggedIn) {
        res.redirect("/dashboard");
    }
    res.render("auth/register", {
        title: "Register Data",
        messages: req.flash()
    });
});

/* POST register data. */
router.post("/registerSave", async function (req, res, next) {
    const { nama, email, password } = req.body;
    try {
        const hashPassword = bcrypt.hashSync(password, 10);
        await Model_Users.Register(nama, email, hashPassword);
        req.flash('success', 'Berhasil mendaftar! Silakan login.');
        res.redirect("/login");
    } catch (err) {
        req.flash('error', 'Gagal mendaftar, email mungkin sudah digunakan!');
        res.redirect('/register');
    }
});

/* GET logout. */
router.get('/logout', function (req, res, next) {
    req.session.destroy();
    res.redirect('/login');
});

/* GET dashboard. */
router.get('/dashboard', isAuth, async function (req, res, next) {
    try {
        const total = await Model_Berita.countAll(req.session.user.id);
        res.render('dashboard', {
            title: 'Dashboard Penulis',
            penulis: req.session.user,
            messages: req.flash(),
            total_berita: total
        });
    } catch(err) {
        res.render('dashboard', {
            title: 'Dashboard Penulis',
            penulis: req.session.user,
            messages: req.flash(),
            total_berita: 0
        });
    }
});

/* GET profile. */
router.get('/dashboard/profile', isAuth, function (req, res, next) {
    res.render('profile/index', {
        title: 'Profil Penulis',
        penulis: req.session.user,
        messages: req.flash()
    });
});

/* POST update profile. */
router.post('/dashboard/profile/update', isAuth, async function (req, res, next) {
    try {
        const { nama, email, password, konfirmasi_password } = req.body;
        const id_penulis = req.session.user.id;
        
        // Data dasar yang akan diupdate
        let dataToUpdate = { nama, email };

        // Validasi jika user mengisi password baru
        if (password) {
            if (password !== konfirmasi_password) {
                req.flash('error', 'Konfirmasi password baru tidak cocok.');
                return res.redirect('/dashboard/profile');
            }
            // Hash password baru sebelum masuk db
            dataToUpdate.password = bcrypt.hashSync(password, 10);
        }
        
        await Model_Users.UpdateProfile(id_penulis, dataToUpdate);
        
        // Update session lokal secara langsung agar UI navbar dsb langsung refresh namanya
        req.session.user.nama = nama;
        req.session.user.email = email;

        req.flash('success', 'Berhasil memperbarui profil!');
        res.redirect('/dashboard/profile');
    } catch(err) {
        req.flash('error', 'Gagal memperbarui profil: Karena email mungkin sudah digunakan akun lain.');
        res.redirect('/dashboard/profile');
    }
});

module.exports = router;
