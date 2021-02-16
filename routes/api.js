// ustawienie endpointów API
const express = require('express');
const News = require('../models/news');
const router = express.Router();

/* pobieranie listy artykułów */
router.get('/', (req, res) => {
  const search = req.query.search || '';
  let sort = req.query.sort || -1;

  if(sort !== -1 || sort !== 1) {
    sort = -1;
  }

  const findNews = News
  .find({title: new RegExp(search.trim(), 'i')})  // wyszukiwanie
  .sort({created: sort}) // sortowanie 
  .select('_id title description'); // wybrane dane tylko pobieramy

  findNews.exec((err,data) => {
    res.json({data});
  });
});

/* pobieranie jednego artykułu */
router.get('/:id', (req, res) => {
  const id = req.params.id;
  
  const findNews = News.findById(id).select('_id title description');

  findNews.exec((err,data) => {
    res.json({data});
  });
});

module.exports = router;