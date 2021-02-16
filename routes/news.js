const express = require('express');
const News = require('../models/news');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  // pobieranie danych wyszukiwania
  const search = req.query.search || '';

  const findNews = News
  //pobranie aktykułów i wyszukiwanie po tytule
  .find({title: new RegExp(search.trim(), 'i')})  //trim zapewnia pomijanie spacji itd. przy wyszukiwaniu
  //sortowanie po dacie
  .sort({created:-1}) 

  findNews.exec((err,data) => {
    res.render('news', { title: 'News', data, search });
  })
});

module.exports = router;