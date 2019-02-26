var socket = io('10.188.245.31:3000/');
socket.on('socketToMe', function(data) {
    console.log(data);

});
document.querySelector('#chk').addEventListener('click', function(event) {
    socket.emit('click', '');
});
document.querySelector('#press').addEventListener('click', function(event) {
    socket.emit('press', '');
});
socket.emit('connection', 'user');