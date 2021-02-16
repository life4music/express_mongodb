const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  // po przechwyceniu adresu strony głównej
  res.render('admin', { title: 'Admin' });
});

module.exports = router;