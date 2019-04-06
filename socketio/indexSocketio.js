var fs = require('fs');

exports.click = function(data) {

    // update the data file when a client click on a bulb
    fs.readFile('socketio/data.json', 'utf-8', function(err, content) {
        if (err) throw err

        content = JSON.parse(content)
        content.bulbs[data.num].state = data.state

        fs.writeFile('socketio/data.json', JSON.stringify(content, null, 2), 'utf-8', function(err) {
            if (err) throw err
        })
    })

    // send the new state to all client
    this.broadcast.emit('click', data);

};