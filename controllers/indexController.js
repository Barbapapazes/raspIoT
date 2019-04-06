var fs = require('fs')

// index of the site
exports.index = function(req, res, next) {
    //res.io.emit('socketToMe', 'Hello user');

    fs.readFile('socketio/dataInBuild.json', 'utf-8', function(err, data) {
        if (err) throw err;
        res.render('index', { title: 'RaspIoT', compagny: 'MULTI-PRISES', bulbs: JSON.parse(data) });
    });
}

// about of the site
exports.about = (req, res) => {
    res.send('about is not implemented')
}