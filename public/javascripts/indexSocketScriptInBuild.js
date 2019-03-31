var socket = io.connect(location.host);

var bulbs = document.querySelectorAll('.bulb__img')
var chks = document.querySelectorAll('.chkBulb')

bulbs.forEach(element => {
    //console.log(element)
});

chks.forEach(element => {
    element.addEventListener('click', function(event) {
        bulb = this.parentElement.firstElementChild
            //console.log(this.dataset.num)
        let data = { num: this.dataset.num, state: undefined }
        if (this.checked) {
            //console.log(bulb)
            data.state = true
            socket.emit('click', data);
            bulb.classList.add('light')
        } else {
            //console.log(bulb)
            data.state = false
            socket.emit('click', data);
            bulb.classList.remove('light')
        }
    });
});

// start the page with the gread config of each button
socket.on('newConnection', function(data) {
    data = (JSON.parse(data))
        //console.log(data)
    let i = 0
    chks.forEach(chk => {
        bulb = chk.parentElement.firstElementChild
        chk.checked = data.bulbs[i].state
            //console.log(chk.checked)
        if (chk.checked)
            bulb.classList.add('light')
        i++
    });
    /*if (data.state !== null) {
        console.log('Check is: ' + data.state);
        checkbox.checked = data.state;
        if (data.state)
            bulb.classList.add('light')
    }*/
})

// wait a event from the server
socket.on('click', function(data) {
    chks[data.num].checked = data.state
    if (chks[data.num].checked)
        bulbs[data.num].classList.add('light')
    else
        bulbs[data.num].classList.remove('light')
})