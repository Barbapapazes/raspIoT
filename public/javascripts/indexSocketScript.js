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
        let data = { num: this.dataset.num, state: undefined, id: this.dataset.id, type: this.dataset.type }
        if (this.checked) {
            data.state = true
            bulb.classList.add('light')
        } else {
            data.state = false
            bulb.classList.remove('light')
        }
        console.log(data)
        socket.emit('click', data)
    });
});

// selecte the range input
let rangeBulb = document.querySelectorAll('.rangeBulb')
console.log(rangeBulb)

rangeBulb.forEach(element => {
    element.addEventListener('click', function() {
        bulb = this.parentElement.firstElementChild
        bulb.style.color = `rgb(${106*this.value/100}, ${153*this.value/100}, ${85*this.value/100})`

        let data = { num: this.dataset.num, value: JSON.parse(this.value), id: this.dataset.id, type: this.dataset.type }
        socket.emit('click', data)
    })
});

var bulbs = document.querySelectorAll('.bulb__img')

// wait a event from the other client
socket.on('click', function(data) {
    console.log(data)
    let that = bulbs[data.num]
    if (data.type == 'relay') {
        that.parentElement.lastChild.checked = data.state
        if (that.parentElement.lastChild.checked = data.state)
            that.classList.add('light')
        else
            that.classList.remove('light')
    } else {
        that.parentElement.lastChild.value = data.value
        that.style.color = `rgb(${106*data.value/100}, ${153*data.value/100}, ${85*data.value/100})`
    }

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