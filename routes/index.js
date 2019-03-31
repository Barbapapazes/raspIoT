var express = require('express');
var router = express.Router();
var fs = require('fs')
    //var io = require('../app').io;

/* GET home page. */
router.get('/', function(req, res, next) {
    //res.io.emit('socketToMe', 'Hello user');

    fs.readFile('socketio/dataInBuild.json', 'utf-8', function(err, data) {
        if (err) throw err;
        res.render('index', { title: 'RaspIoT', compagny: 'MULTI-PRISES', bulbs: JSON.parse(data) });
    });
});

module.exports = router;