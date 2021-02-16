const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  // po przechwyceniu adresu strony głównej
  res.render('quiz', { title: 'Quiz' });
});

module.exports = router;