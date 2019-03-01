var socket = io.connect('10.188.245.31:3000/');
//socket.emit('connection', '');

socket.on('socketToMe', function(data) {
    console.log(data);

});

let checkbox = document.querySelector('#chk');

checkbox.addEventListener('click', function(event) {
    if (checkbox.checked) {
        socket.emit('click', true);
    } else {
        socket.emit('click', false);
    }
});

socket.on('click', function(data) {
    checkbox.checked = data;
})