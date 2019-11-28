// Express & Toolkit
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

// Routes imports
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const usuarioRouter = require('./routes/usuario');
const registroRouter = require('./routes/registro');
const planchasRouter = require('./routes/admin/planchas');
const eleccionesRouter = require('./routes/admin/elecciones');
const votosRouter = require('./routes/votos');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'jade');

//Middlewares
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/usuario', usuarioRouter);
app.use('/registro', registroRouter);
app.use('/planchas', planchasRouter);
app.use('/elecciones', eleccionesRouter);
app.use('/votos', votosRouter);

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

  res.json({
    error: {
      status: err.status,
      message: err.message
    }
  });

});

module.exports = app;
