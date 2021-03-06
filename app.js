var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('cookie-session');
var csrf = require('csurf');

var CJDNS = require('./cjdns');
var cjdns_config = require('./cjdns-config');

var routes = require('./routes/index');
var show = require('./routes/show');
var users = require('./routes/users');
var add_peer = require('./routes/add');
var delete_peer = require('./routes/delete');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    keys: [
        'foo' // TODO: read from config for secure keys
    ]
}));
app.use(csrf());

app.use(function(err, req, res, next) {
    if(err.code !== 'EBADCSRFTOKEN') return next(err);

    res.status(403);
    res.send('session has expired of form tampered with');
});

app.use('/', routes);
app.use('/users', users);
app.use('/show', show);
app.post('/add', add_peer);
app.post('/delete', delete_peer);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
