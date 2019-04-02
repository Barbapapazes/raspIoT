var socket = require('./indexSocketio')
var fs = require('fs');

// add the module to listen change on files
let chokidar = require('chokidar')

exports.newConnection = function(client) {
    console.log('Client connected...');
    // send data to config the web page
    fs.readFile('socketio/dataInBuild.json', 'utf-8', function(err, data) {
        if (err) throw err;
        client.emit('newConnection', data);
    });

    // initializes the watcher
    let watcher = chokidar.watch('socketio/dataInBuild.json', {
        ignored: /(^|[\/\\])\../,
        persistent: true
    })

    // watch if data change and send data to the client
    watcher.on('change', (path, stats) => {
        //console.log('watcher on ' + path)
        fs.readFile('socketio/dataInBuild.json', 'utf-8', function(err, data) {
            if (err) throw err;
            data = (JSON.parse(data))
            if (data.python) {
                // emit an event to apply change on client
                client.emit('python', data)
                    // reset the condition
                data.python = false
                    // write the file to change the condition
                fs.writeFile('socketio/dataInBuild.json', JSON.stringify(data, null, 2), 'utf-8', function(err) {
                    if (err) throw err
                })
            } else {
                //console.log('nothing to send')
            }
        })
    })

    // listen 'click' event from client
    client.on('click', socket.click);

    // listen 'disconnect' event from client and close the listener form this client
    client.on('disconnect', function(data) {
        watcher.close()
        console.log('Client disconnected...');
    })
}