let body = document.querySelector('body')
let switchBtn = document.querySelector('.container__toggle-btn')

// Change the stat of the button and the theme of the page
switchBtn.addEventListener('click', switchTheme)

function switchTheme() {
    this.classList.toggle('active')
    body.classList.toggle('light')
    body.classList.toggle('dark')
}