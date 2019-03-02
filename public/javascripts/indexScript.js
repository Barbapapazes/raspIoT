var socket = io.connect('10.188.245.31:3000/');

/*socket.on('socketToMe', function(data) {
    console.log(data);

});*/

let checkbox = document.querySelector('#chk');

checkbox.addEventListener('click', function(event) {
    if (checkbox.checked) {
        socket.emit('click', true);
    } else {
        socket.emit('click', false);
    }
});

// wait a event from the server
socket.on('click', function(data) {
    checkbox.checked = data;
})

// start the page with the gread config of each button
socket.on('newConnection', function(data) {
    data = (JSON.parse(data))
    if (data.state !== null) {
        console.log('Check is: ' + data.state);
        checkbox.checked = data.state;
    }
})