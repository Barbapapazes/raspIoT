var express = require('express');
var router = express.Router();

var editConfig_controller = require('../controllers/editConfigController')

// GET request to the control panel to add or delete devices
router.get('/', editConfig_controller.index);

// GET request to add devices
router.get('/add', editConfig_controller.editConfig_add_get);

// POST request to add devices
router.post('/add', editConfig_controller.editConfig_add_post);

module.exports = router;