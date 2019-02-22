var express = require('express');
var router = express.Router();

var controls_controller = require('../controllers/controlsController')

// GET the control panel
router.get('/', controls_controller.index);

module.exports = router;