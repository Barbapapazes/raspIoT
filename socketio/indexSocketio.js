var fs = require('fs');
/*

NOON UTILISER UN FS READ FILE

*/
exports.click = function(data) {

    fs.readFile('socketio/dataInBuild.json', 'utf-8', function(err, content) {
        if (err) throw err;
        content = JSON.parse(content)
        content.bulbs[data.num].state = data.state
        fs.writeFile('socketio/dataInBuild.json', JSON.stringify(content, null, 2), 'utf-8', function(err) {
            if (err) throw err
        })
    })

    //content.bulbs[data.num].state = data.state <= le probleme de lecture/ecriture est ici


    // send the new state to all client
    this.broadcast.emit('click', data);
    //console.log(data)
    /**/
};