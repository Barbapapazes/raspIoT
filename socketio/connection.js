var socket = require('./indexSocketio')
var fs = require('fs'); // import the json file to store the stat of the button

exports.newConnection = function(client) {
    console.log('Client connected...');
    // send data to config the web page with great data
    fs.readFile('socketio/data.json', 'utf-8', function(err, data) {
        if (err) throw err;
        client.emit('newConnection', data);
    });

    /*let fsWait = false;
    fs.watch('socketio/data.json', 'utf-8', function(event, filename) {
        if (filename) {
            if (fsWait) return;
            fsWait = setTimeout(() => {
                fsWait = false;
            }, 100);
            console.log(filename + ' file Changed');
        }

        /*if (current.mtime != previous.mtime) {
            console.log(current.mtime)
            console.log(previous.mtime)
                fs.readFile('socketio/data.json', 'utf-8', function(err, data) {
                    if (err) throw err;
                    client.emit('click', data);
                });
        }
    });*/

    // Sockets for index.js
    client.on('click', socket.click);

    client.on('disconnect', socket.disconnect)
}