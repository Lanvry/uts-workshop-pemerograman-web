module.exports = function(req, res, next) {
    if (req.session.isLoggedIn && req.session.user && req.session.user.email === 'wardilanang46@gmail.com') {
        next();
    } else {
        req.flash('error', 'Akses Ditolak: Anda tidak memiliki hak akses kapabilitas Administrator.');
        res.redirect('/dashboard');
    }
};
