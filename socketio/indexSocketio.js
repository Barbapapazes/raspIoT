var fs = require('fs'); // import the json file to store the stat of the button

var content = require('./dataInBuild.json')

exports.click = function(data) {
    //console.log('bulb n° ' + data.num + 'check: ' + data.state);
    content.bulbs[data.num].state = data.state
        //console.log(content)
    fs.writeFile('socketio/dataInBuild.json', JSON.stringify(content, null, 2), 'utf-8', function(err) {
        if (err) throw err
    })
    this.broadcast.emit('click', data);
};

/*exports.disconnect = function(data) {
    console.log('Client disconnected...');
};*/