var socket = io.connect(location.host);

/*socket.on('socketToMe', function(data) {
    console.log(data);

});*/

let checkbox = document.querySelector('#chk');
let bulb = document.querySelector('.bulb__img')

checkbox.addEventListener('click', function(event) {
    if (checkbox.checked) {
        socket.emit('click', true);
        bulb.classList.add('light')
    } else {
        socket.emit('click', false);
        bulb.classList.remove('light')
    }
});

// wait a event from the server
socket.on('click', function(data) {
    checkbox.checked = data;
    if (checkbox.checked)
        bulb.classList.add('light')
    else
        bulb.classList.remove('light')
})

// start the page with the gread config of each button
socket.on('newConnection', function(data) {
    data = (JSON.parse(data))
    if (data.state !== null) {
        console.log('Check is: ' + data.state);
        checkbox.checked = data.state;
        if (data.state)
            bulb.classList.add('light')
    }
})