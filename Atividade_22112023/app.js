var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require("dotenv-safe").config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var dadosRouter = require('./routes/dados');
var addCarRouter = require('./routes/addCar');
var deleteRouter = require('./routes/delete');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter)
app.use('/dados', dadosRouter)
app.use('/addCar', addCarRouter)
app.use('/delete', deleteRouter)

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


/*
app.post("/logout", (req, res, next) => {
  res.json({auth: false, token: null});
});*/

/*
const url = 'https://mauricio.inf.br/p6/api/list.php';
const token = 'ndNNcwskPHLFmbtcUZ6R';

fetch(url, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  },
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    // Manipule os dados recebidos aqui
    console.log(data);
  })
  .catch(error => {
    console.error('Erro na requisição:', error);
  });*/

module.exports = app;
