var fs = require('fs')
let { PythonShell } = require('python-shell')

exports.click = function(data) {

    console.log(data)
    let options = {
        mode: 'text',
        args: ['a']
    };

    PythonShell.run('./python/writeToArduino.py', null, function(err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        console.log('script done!');
    });

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