var socket = require('./index')

exports.newConnection = function(client) {
    console.log('Client connected...');

    // Sockets for index.js
    client.on('click', socket.click);
    client.on('press', socket.press);
}