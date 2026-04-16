var express = require('express');
var router = express.Router();
const Model_Berita = require('../model/Model_Berita');

/* GET home page (Public Portal). */
router.get('/', async function(req, res, next) {
  try {
    let berita = await Model_Berita.getPublicAll();
    res.render('index', { 
      title: 'Siberita - Berita Terkini',
      berita: berita,
      isLoggedIn: req.session.isLoggedIn
    });
  } catch(err) {
    res.render('index', { title: 'Siberita', berita: [], isLoggedIn: false });
  }
});

/* GET Single Post. */
router.get('/baca/:id', async function(req, res, next) {
  try {
    let id = req.params.id;
    let data = await Model_Berita.getPublicById(id);
    if(data.length > 0) {
      res.render('baca', {
        title: data[0].judul + ' - Siberita',
        berita: data[0],
        isLoggedIn: req.session.isLoggedIn
      });
    } else {
      res.redirect('/');
    }
  } catch(err) {
    res.redirect('/');
  }
});

module.exports = router;
