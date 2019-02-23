var express = require('express');
var router = express.Router();
var io = require('../app').io;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.io.emit('socketToMe', 'Hello user');

    res.render('index', { title: 'RaspIoT', compagny: 'MULTI-PRISES' });
});

module.exports = router;