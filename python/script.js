let { PythonShell } = require('python-shell');
let fs = require('fs');
let content = require('../socketio/data.json');

// receive a message in JSON mode
let pyshell = new PythonShell('python/script.py', { mode: 'json' });

pyshell.on('message', function(message) {
    content.state = message;
    fs.writeFile('socketio/data.json', JSON.stringify(content, null, 2), 'utf-8', function(err) {
        if (err) throw err
    })
})

module.exports = pyshell;