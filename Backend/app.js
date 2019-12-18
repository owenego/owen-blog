const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(
  session({
      secret: 'custom_node_cookie',
      name: 'session_id',
      resave: true,
      saveUninitialized: true,
      cookie: { maxAge: 60 * 1000 * 30, httpOnly: true }, // expire after 30 min
  }),
);

require('./db/mongodb').connect();
require('./routes/index')(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //display error pages
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
