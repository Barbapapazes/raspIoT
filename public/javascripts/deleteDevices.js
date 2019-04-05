let trash = document.querySelectorAll('#trash')

trash.forEach(element => {
    element.addEventListener('click', function() {
        this.classList.toggle('selected')
    })
});