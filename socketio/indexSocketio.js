var fs = require('fs')
let { PythonShell } = require('python-shell')

exports.click = function(data) {

    // send the new state to all client
    this.broadcast.emit('click', data);

    // id | state/value | emitter | types 
    if (data.type == 'relay')
        args = [data.id, (data.state == true ? "1" : "0"), "0", "0"]
    else if (data.type == 'pwm')
        args = [data.id, String(data.value), "0", "1"]
    else if (data.type == 'pwm-rgb') {
        args = [data.id, String(data.R < 100 ? (data.R == 0 ? "000" : "0" + data.R) : data.R) + String(data.G < 100 ? (data.G == 0 ? "000" : "0" + data.G) : data.G) + String(data.B < 100 ? (data.B == 0 ? "000" : "0" + data.B) : data.B), "0", "2"]
    }
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
        } else if (data.type == 'pwm') {
            content.bulbs[data.num].value = data.value
        } else if (data.type == 'pwm-rgb') {
            content.bulbs[data.num].R = data.R
            content.bulbs[data.num].G = data.G
            content.bulbs[data.num].B = data.B
        }

        fs.writeFile('socketio/data.json', JSON.stringify(content, null, 2), 'utf-8', function(err) {
            if (err) throw err
        })
    })
}