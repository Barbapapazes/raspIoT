var fs = require('fs'); // import the json file to store the stat of the button

var content = require('./data.json')

exports.click = function(data) {
    console.log('check: ' + data);
    content.state = data;
    fs.writeFile('socketio/data.json', JSON.stringify(content, null, 2), 'utf-8', function(err) {
        if (err) throw err
    })
    this.broadcast.emit('click', data);
};

/*exports.disconnect = function(data) {
    console.log('Client disconnected...');
};*/