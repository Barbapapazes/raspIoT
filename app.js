var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var controlsRouter = require('./routes/controls'); //Import routes for controls panel

var app = express();

// add support for socket.io
var server = require('http').Server(app); // create the http server
var io = require('socket.io')(server); // set up websockets
var connection = require('./socketio/connection.js')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// use the socket.io
app.use(function(req, res, next) {
    res.io = io;
    req.io = io;
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/controls', controlsRouter); // Add controls routes to middleware chain

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


io.on('connection', connection.newConnection)

// exports app and server which will use in www
module.exports = { app: app, server: server, io: io };