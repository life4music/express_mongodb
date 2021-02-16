const express = require('express');
const News = require('../models/news'); // importujemy model
const router = express.Router();


// do wejścia w zakładkę admin wymagane jest zalogowanie
router.all('*', (req, res, next) => {
  if(!req.session.admin) {
    res.redirect('login');
    return;
  }
  next();
});

/* GET home page. */
router.get('/', (req, res) => {
   //pobranie aktykułów
  News.find({}, (err, data) => {
    res.render('admin/index', { title: 'Admin', data });
  });
});

// przesyłamy formularz tworzenia newsów
router.get('/news/add', (req,res) => {
  res.render('admin/news_form', { title: 'Dodaj artykuł', body: {}, errors: {} });
});

// pobieramy dane z formularza
router.post('/news/add', (req,res) => {
  const body = req.body;
  // DODANIE DANYCH DO BAZY
  const newsData = new News(body);
  // walidacja danych
  const errors = newsData.validateSync();

  newsData.save((err) => {
    if(err) {
      res.render('admin/news_form', { title: 'Dodaj artykuł', errors, body });
      return;
    }
    res.redirect('/admin');
  });
});

// usuwanie postów
router.get('/news/delete/:id', (req, res) => {
  News.findByIdAndDelete(req.params.id, (err) => {
    res.redirect('/admin');
  });
});

module.exports = router;