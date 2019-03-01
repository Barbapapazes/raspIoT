exports.click = function(data) {
    console.log('check: ' + data);
    this.broadcast.emit('click', data);
};

exports.disconnect = function(data) {
    console.log('Client disconnected...');
};