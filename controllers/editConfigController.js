// Display control panel
exports.index = function(req, res) {
    res.render('edit-config', { title: 'RaspIoT', compagny: 'MULTI-PRISES' });
}

// Display the add menu
exports.editConfig_add_get = function(req, res) {
    res.send('not implemented')
}

// Handle the post request to add device
exports.editConfig_add_post = function(req, res) {
    res.send('not implemented')
}