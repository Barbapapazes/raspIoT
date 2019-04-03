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

            console.log(req.body.nameinput)
            console.log(req.body.stateinput)
            res.render('add-devices', {
                title: 'RaspIoT',
                compagny: 'MULTI-PRISES',
                sucess: true,
                messages: "device correctly added"
            })
        }
    }


]

// Display the delete menu
exports.editConfig_delete_get = function(req, res) {
    res.send('not implemented')
}

// Handle the post request to delete device
exports.editConfig_delete_post = function(req, res) {
    res.send('not implemented')
}