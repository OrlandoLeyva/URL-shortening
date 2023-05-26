const API_BASE_URL = 'https://api.shrtco.de/v2/shorten'

// HTML ELEMENTS
const navbar = document.getElementById('navbar')
const menuIcon = document.getElementById('menu-icon')
const linkInput = document.getElementById('link-input')
const getShortLinkButton = document.getElementById('get-short-link-button')
const errorPlaceholder = document.getElementById('short-link-form-error')

menuIcon.addEventListener('click', toggleNavbar)

getShortLinkButton.addEventListener('click', shortLink)

async function shortLink(e){
    e.preventDefault()
    cleanErrorProperties()

    if (linkInput.value.trim() == '') {
        showError(0)
    } else {
        linkInput.classList.remove('error-state')
        errorPlaceholder.style.display = 'none'
        console.log(linkInput.value)
        // Getting link...
        
        const res = await fetch(`${API_BASE_URL}?url=${linkInput.value}`, {method: 'GET'})
        const result = await res.json()

        if (!result.ok) {
            showError(result.error_code)
        }
        
        console.log(result)
        linkInput.value = ''
    }
    // const link = 
}

const errors = {
    '0': 'Please insert a link',
    '2': 'This is not a valid URL',
    '3': ' Wait a second and try again',
    '10': 'The link you entered is a disallowed link'
}

function showError(errorCode){
    linkInput.classList.add('error-state')
    errorPlaceholder.style.display = 'block'
    const errorMessage = errors[errorCode] || 'Unknown error. please try a again'
    errorPlaceholder.innerText = errorMessage
}

function cleanErrorProperties(){
    linkInput.classList.remove('error-state')
    errorPlaceholder.style.display = 'none'
}

function toggleNavbar(e){
    console.log(navbar.display)
    navbar.classList.toggle('hidden')
}

