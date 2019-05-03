var socket = require('./indexSocketio')
var fs = require('fs');

// add the module to listen change on files
let chokidar = require('chokidar')

exports.newConnection = function(client) {
    console.log('Client connected...')

    // send data to config the web page
    fs.readFile('socketio/data.json', 'utf-8', function(err, data) {
        if (err) throw err;
        client.emit('newConnection', data);
    });

    // initializes the watcher
    let watcher = chokidar.watch('socketio/data.json', {
        ignored: /(^|[\/\\])\../,
        persistent: true
    })

    // watch if data change and send data to the client
    watcher.on('change', (path, stats) => {
        setTimeout(() => {
            fs.readFile('socketio/data.json', 'utf-8', function(err, data) {
                if (err) throw err

                data = (JSON.parse(data))

                if (data.python) {
                    console.log('python script')

                    // emit an event to apply change on client
                    client.emit('python', data)

                    // reset the condition
                    data.python = false

                    // write the file to change the condition
                    fs.writeFile('socketio/data.json', JSON.stringify(data, null, 2), 'utf-8', function(err) {
                        if (err) throw err
                    })

                } else if (data.addDevices) {
                    console.log("device added")

                    data.addDevices = false

                    // write the file to change the condition
                    fs.writeFile('socketio/data.json', JSON.stringify(data, null, 2), 'utf-8', function(err) {
                        if (err) throw err
                    })

                    // set a timeout to be sure that the file is read from the view after it has been written
                    setTimeout(() => {
                        client.emit('addDevices')
                    }, 20)

                } else if (data.deleteDevices) {
                    console.log("device deleted")

                    data.deleteDevices = false

                    // write the file to change the condition
                    fs.writeFile('socketio/data.json', JSON.stringify(data, null, 2), 'utf-8', function(err) {
                        if (err) throw err
                    })

                    // set a timeout to be sure that the file is read from the view after it has been written
                    setTimeout(() => {
                        client.emit('deleteDevices')
                    }, 20)
                }
            })
        }, 20);
    })

    // listen 'click' event from client
    client.on('click', socket.click);

    // listen 'disconnect' event from client and close the listener from this client
    client.on('disconnect', function(data) {
        watcher.close()
        console.log('Client disconnected...');
    })
}