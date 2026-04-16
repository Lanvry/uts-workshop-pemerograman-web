var express = require('express');
var router = express.Router();
var isAuth = require('../middleware/isAuth');

/* GET list berita. */
router.get('/', isAuth, function(req, res, next) {
  res.render('berita/index', {
    title: 'Manajemen Berita',
    penulis: req.session.user,
    messages: req.flash()
  });
});

module.exports = router;
