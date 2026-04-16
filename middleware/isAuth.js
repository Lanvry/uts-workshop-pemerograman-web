/**
 * Middleware: isAuth
 * Melindungi route yang memerlukan login.
 * Jika belum login, redirect ke halaman /login.
 */
function isAuth(req, res, next) {
    if (req.session && req.session.isLoggedIn) {
        return next();
    }
    req.flash('error', 'Silakan login terlebih dahulu.');
    res.redirect('/login');
}

module.exports = isAuth;
