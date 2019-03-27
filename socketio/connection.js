var socket = require('./indexSocketio')
var fs = require('fs'); // import the json file to store the stat of the button

exports.newConnection = function(client) {
    console.log('Client connected...');
    // send data to config the web page with great data
    fs.readFile('socketio/data.json', 'utf-8', function(err, data) {
        if (err) throw err;
        client.emit('newConnection', data);
    });

    fs.watchFile('socketio/data.json', function(current, previous) {
        if (current.size != previous.size) {
            console.log('this change the file')
            fs.readFile('socketio/data.json', 'utf-8', function(err, data) {
                if (err) throw err;
                client.emit('click', data);
            });
        } else {
            console.log('size doesn\'t change')
        }
    });

    // Sockets for index.js
    client.on('click', socket.click);

    client.on('disconnect', socket.disconnect)
}