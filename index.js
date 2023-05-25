const navbar = document.getElementById('navbar')
const menuIcon = document.getElementById('menu-icon')

menuIcon.addEventListener('click', toggleNavbar)

function toggleNavbar(e){
    console.log('toggling navbar')
    navbar.classList.toggle('hidden')
}