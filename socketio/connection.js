var socket = require('./indexSocketio')
var fs = require('fs'); // import the json file to store the stat of the button

// add the module to listen the data file
let chokidar = require('chokidar')
    /*let watcher = chokidar.watch('socketio/data.json', {
        ignored: /(^|[\/\\])\../,
        persistent: true
    })*/

exports.newConnection = function(client) {
    let watcher = chokidar.watch('socketio/data.json', {
        ignored: /(^|[\/\\])\../,
        persistent: true
    })
    console.log('Client connected...');
    // send data to config the web page with great data
    fs.readFile('socketio/dataInBuild.json', 'utf-8', function(err, data) {
        if (err) throw err;
        //console.log(data)
        client.emit('newConnection', data);
    });

    // Sockets for index.js
    client.on('click', socket.click);

    client.on('disconnect', function(data) {
        watcher.close()
        console.log('Client disconnected...');
    })

    // watch if the python change the data file || if the 433 receive a message

    let data

    watcher.on('change', (path, stats) => {
        console.log('watcher')
        fs.readFile('socketio/data.json', 'utf-8', function(err, data) {
            if (err) throw err;
            data = (JSON.parse(data))
            if (data.python) {
                client.emit('click', data.state)
                data.python = false
                fs.writeFile('socketio/data.json', JSON.stringify(data, null, 2), 'utf-8', function(err) {
                    if (err) throw err
                })
            } else {
                console.log('other change occured')
            }
        })
    })

}