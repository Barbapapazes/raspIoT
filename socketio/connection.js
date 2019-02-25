var socket = require('./index')

exports.newConnection = function(client) {
    console.log('Client connected...');

    client.on('click', socket.click);
    client.on('press', socket.press);
}