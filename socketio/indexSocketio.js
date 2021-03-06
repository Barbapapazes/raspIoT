var fs = require('fs')
let { PythonShell } = require('python-shell')

exports.click = function(data) {

    // send the new state to all client
    this.broadcast.emit('click', data);

    // id | state/value | emitter | types 
    if (data.type == 'relay')
        args = [data.id, (data.state == true ? "1" : "0"), "0", "0"]
    else
        args = [data.id, String(data.value), "0", "1"]

    let options = {
        mode: 'text',
        args: args
    }
    console.log(options.args)


    PythonShell.run('./python/writeToArduino.py', options, function(err, results) {
        if (err) throw err;
        // results is an array consisting of messages collected during execution
        console.log('script done!');
    })


    // update the data file when a client click on a bulb
    fs.readFile('socketio/data.json', 'utf-8', function(err, content) {
        if (err) throw err

        content = JSON.parse(content)
        console.log(data)
        if (data.type == "relay") {
            content.bulbs[data.num].state = data.state
        } else {
            content.bulbs[data.num].value = data.value
        }

        fs.writeFile('socketio/data.json', JSON.stringify(content, null, 2), 'utf-8', function(err) {
            if (err) throw err
        })
    })
}