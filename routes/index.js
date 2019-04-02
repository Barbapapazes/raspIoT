var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController')
var fs = require('fs')
    //var io = require('../app').io;

/* GET home page. */
router.get('/', indexController.index);

module.exports = router;