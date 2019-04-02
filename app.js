var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

// add the module to listen the data file
let chokidar = require('chokidar')
let fs = require('fs')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var editConfigRouter = require('./routes/editConfig'); //Import routes for edit config

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
app.use('/stylesheets', sassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public/stylesheets'),
    indentedSyntax: false,
    // true = .sass and false = .scss
    outputStyle: 'compressed',
    sourceMap: true
}));

app.use(express.static(path.join(__dirname, 'public')));

// use the socket.io
app.use(function(req, res, next) {
    res.io = io;
    req.io = io;
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/edit-config', editConfigRouter); // Add controls routes to middleware chain

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

io.on('connection', connection.newConnection);




// exports app and server which will use in www
module.exports = { app: app, server: server, io: io };