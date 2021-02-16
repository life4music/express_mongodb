const express = require('express');
const Quiz = require('../models/quiz');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  // sprawdzamy, czy głos już został oddany -> if show w widoku
  const show = !req.session.vote; // 0 lub 1

  // pobieranie odpowiedzi i weryfikowanie odp
  Quiz.find({}, (err, data) => {
    // suma głosów do obliczanie procentu
    let sum = 0;
    data.forEach(item => sum += item.vote);
    // przekazanie danych do widoku
    res.render('quiz', {title: 'Quiz', data, show, sum});
  });
});

router.post('/', (req, res) => {
  const id = req.body.quiz;

  Quiz.findOne({_id: id}, (err, data) => {
    // zapisujemy oddany głos
    data.vote = data.vote + 1;
    data.save((err) => {
      req.session.vote = 1;
      res.redirect('/quiz');
    });
  });
});

module.exports = router;