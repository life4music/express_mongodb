const express = require('express');
const router = express.Router();
const login = 'admin';
const password = 'qazwsx';

/* GET home page. */
router.get('/', (req, res, next) => {
  // po przechwyceniu adresu strony głównej
  res.render('index', { title: 'Express' });
});

// GET do pokazania formularza
router.get('/login', (req, res) => {
  // po przechwyceniu adresu strony głównej
  res.render('login', { title: 'Logowanie' });
});

// POST do przechwycenia danych logowania
router.post('/login', (req, res) => {
  const body = req.body;

  if(body.login === login && body.password === password) {
    req.session.admin = 1;
    res.redirect('/admin');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
