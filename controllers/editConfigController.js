let fs = require('fs')
const { body, check, oneOf, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display control panel
exports.index = function(req, res) {
    res.render('edit-config', { title: 'RaspIoT', compagny: 'MULTI-PRISES' });
}

// Display the add menu
exports.editConfig_add_get = function(req, res) {
    res.render('add-devices', { title: 'RaspIoT', compagny: 'MULTI-PRISES' });
}

// Handle the post request to add device
exports.editConfig_add_post = [
    // Validate that the name field is not empty.
    body('nameinput', 'Name required').isLength({ min: 1 }). /*withMessage('Must contain more than 1 letter').*/ trim(),

    // Sanitize (trim and escape) the name field.
    sanitizeBody('nameinput').trim().escape(),

    // Validate that the state field have a correct value.
    body('stateinput', 'Please define the state').isIn(['false', 'true']).withMessage('Please use predefined values'),

    // Sanitize (trim and escape) the state field.
    sanitizeBody('stateinput').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('add-devices', {
                title: 'RaspIoT',
                compagny: 'MULTI-PRISES',
                messages: errors.array()
            })
            return
        } else {
            // Data from form is valid.
            fs.readFile('socketio/dataInBuild.json', 'utf-8', function(err, content) {
                if (err) throw err;
                content = JSON.parse(content)
                content.bulbs[content.bulbs.length] = { name: req.body.nameinput, state: JSON.parse(req.body.stateinput) }
                console.log(content)
                fs.writeFile('socketio/dataInBuild.json', JSON.stringify(content, null, 2), 'utf-8', function(err) {
                    if (err) throw err
                })
                res.render('add-devices', {
                    title: 'RaspIoT',
                    compagny: 'MULTI-PRISES',
                    sucess: true,
                    messages: "device correctly added"
                })
            });

        }
    }


]

// Display the delete menu
exports.editConfig_delete_get = function(req, res) {
    fs.readFile('socketio/dataInBuild.json', 'utf-8', function(err, data) {
        if (err) throw err;
        res.render('delete-devices', {
            title: 'RaspIoT',
            compagny: 'MULTI-PRISES',
            bulbs: JSON.parse(data)
        })
    });

}

// Handle the post request to delete device
exports.editConfig_delete_post = function(req, res) {
    res.send('not implemented')
}