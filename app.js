var createError = require('http-errors'); //biblioteka do błędów http
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');  //do obługi ciasteczek
var logger = require('morgan'); //do zrzucania logów w trybie developerskim

var indexRouter = require('./routes/index');  // strona startowa
var newsRouter = require('./routes/news');
var quizRouter = require('./routes/quiz');
var adminRouter = require('./routes/admin');
const { compileClient } = require('pug');

var app = express();  // uruchamiamy server

// view engine setup
app.set('views', path.join(__dirname, 'views'));  // konfiguracja katalogu do szablonów w pug
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // do obsługi formularzy
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// funkcja pobiera z req adres strony i przekazuje do widoku
app.use(function(req, res, next) {
  // przekazujemy adres do zmiennej globalnej
  res.locals.path = req.path;
  // przechodzimy do kolejnego routingu
  next();
});

// deklaracja routingów
app.use('/', indexRouter);
app.use('/news', newsRouter);
app.use('/quiz', quizRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
