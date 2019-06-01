var socket = io.connect(location.host);

var chks = document.querySelectorAll('.chkBulb')
    // start the page with the gread config of each button
socket.on('newConnection', function(data) {
    data = (JSON.parse(data))

    let i = 0
    chks.forEach(chk => {
        // take the img
        bulb = chk.parentElement.firstElementChild
        chk.checked = data.bulbs[i++].state
        if (chk.checked)
            bulb.classList.add('light')
    });
})

chks.forEach(element => {
    element.addEventListener('click', function() {
        // take the image
        bulb = this.parentElement.firstElementChild
            // take the data (num) which is inside the HTML tag
        let data = { num: this.dataset.num, state: undefined, id: this.dataset.id }
        if (this.checked) {
            data.state = true
            bulb.classList.add('light')
        } else {
            data.state = false
            bulb.classList.remove('light')
        }
        socket.emit('click', data)
    });
});

var bulbs = document.querySelectorAll('.bulb__img')

// wait a event from the other client
socket.on('click', function(data) {
    chks[data.num].checked = data.state
    if (chks[data.num].checked)
        bulbs[data.num].classList.add('light')
    else
        bulbs[data.num].classList.remove('light')
})

// wait event from the server
socket.on('python', function(data) {
    let i = 0
    data.bulbs.forEach(element => {
        if (element.state) {
            bulbs[i].parentElement.lastChild.checked = true
            bulbs[i++].classList.add('light')
        } else {
            bulbs[i].parentElement.lastChild.checked = false
            bulbs[i++].classList.remove('light')
        }

    })
})

socket.on('addDevices', () => {
    window.location.reload()
})

socket.on('deleteDevices', () => {
    window.location.reload()
})