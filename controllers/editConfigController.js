let fs = require('fs')
const { body, check, oneOf, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display control panel
exports.index = function(req, res) {
    res.render('edit-config', { title: 'RaspIoT', compagny: 'MULTI-PRISES' });
}


/*************
 * Controllers for add path
 *************/

// Display the add menu
exports.editConfig_add_get = function(req, res) {
    res.render('add-devices', { title: 'RaspIoT', compagny: 'MULTI-PRISES' });
}

// Handle the post request to add device
exports.editConfig_add_post = [
    // Validate that the name field is not empty.
    body('nameinput', 'Name required').isLength({ min: 1 }).trim(),

    // Sanitize (trim and escape) the name field.
    sanitizeBody('nameinput').trim().escape(),

    body('idinput', 'ID required').isLength({ min: 5 }).withMessage("Incorrect ID").trim(),

    // Sanitize (trim and escape) the name field.
    sanitizeBody('idinput').trim(),

    // Validate that the state field have a correct value.
    body('stateinput', 'Please define the state').isIn(['false', 'true']).withMessage('Please use predefined values'),

    // Sanitize (trim and escape) the state field.
    sanitizeBody('stateinput').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        let isInside
        fs.readFile('socketio/data.json', 'utf-8', function(err, file) {
            if (err) throw err

            file = JSON.parse(file)
            let tab = file.bulbs.map(val => {
                return val.name
            })
            for (let index = 0; index < tab.length; index++) {
                const element = tab[index];
                if (req.body.nameinput == element)
                    isInside = true
            }

            if (!errors.isEmpty() || isInside) {
                // There are errors. Render the form again with sanitized values/error messages.
                if (!errors.isEmpty()) {
                    res.render('add-devices', {
                        title: 'RaspIoT',
                        compagny: 'MULTI-PRISES',
                        messages: errors.array()
                    })
                    return
                } else {
                    res.render('add-devices', {
                        title: 'RaspIoT',
                        compagny: 'MULTI-PRISES',
                        messages: [{ msg: "Already Use !" }]
                    })
                    return
                }

            } else {
                // Data from form is valid.

                file.bulbs[file.bulbs.length] = {
                    name: req.body.nameinput,
                    id: req.body.idinput,
                    state: JSON.parse(req.body.stateinput)
                }

                // for the watcher in the index
                file.addDevices = true

                console.log(file)

                fs.writeFile('socketio/data.json', JSON.stringify(file, null, 2), 'utf-8', function(err) {
                    if (err) throw err
                })

                setTimeout(() => {
                    res.render('add-devices', {
                        title: 'RaspIoT',
                        compagny: 'MULTI-PRISES',
                        sucess: true,
                        messages: "device correctly added"
                    })
                }, 20)


            }
        })
    }
]

/*************
 * Controllers for delete path
 *************/
// Display the delete menu
exports.editConfig_delete_get = function(req, res) {
    fs.readFile('socketio/data.json', 'utf-8', function(err, data) {
        if (err) throw err

        res.render('delete-devices', {
            title: 'RaspIoT',
            compagny: 'MULTI-PRISES',
            bulbs: JSON.parse(data)
        })
    });
}

// Handle the post request to delete device
exports.editConfig_delete_post = [
    // Validate that the delete field exist.
    body('deleteinput').exists().withMessage('Please try again !'),

    // Sanitize (trim and escape) the delete field.
    sanitizeBody('deleteinput').trim().escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            fs.readFile('socketio/data.json', 'utf-8', function(err, data) {
                if (err) throw err

                res.render('delete-devices', {
                    title: 'RaspIoT',
                    compagny: 'MULTI-PRISES',
                    bulbs: JSON.parse(data),
                    messages: errors.array()
                })
            })
            return
        } else {
            // Data from form is valid.

            // Check if deleteinput is a array
            let remove = req.body.deleteinput
            if (remove.constructor !== Array)
                remove = [remove]
            console.log(remove)

            fs.readFile('socketio/data.json', 'utf-8', function(err, data) {
                if (err) throw err

                data = JSON.parse(data)

                // Delete all the selection, from deleteinput
                let i = 0
                remove.forEach(element => {
                    element -= i++
                        data.bulbs.splice(element, 1)
                })

                // for the watcher in the index
                data.deleteDevices = true

                console.log(data)

                fs.writeFile('socketio/data.json', JSON.stringify(data, null, 2), 'utf-8', function(err) {
                    if (err) throw err
                })

                setTimeout(() => {
                    res.render('delete-devices', {
                        title: 'RaspIoT',
                        compagny: 'MULTI-PRISES',
                        bulbs: data,
                        sucess: true,
                        messages: "Correctly removed"
                    })
                }, 20)
            })
        }
    }
]