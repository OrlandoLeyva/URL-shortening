const API_BASE_URL = 'https://api.shrtco.de/v2/shorten'

// HTML ELEMENTS
const navbar = document.getElementById('navbar')
const menuIcon = document.getElementById('menu-icon')
const linkInput = document.getElementById('link-input')
const getShortLinkButton = document.getElementById('get-short-link-button')
const errorPlaceholder = document.getElementById('short-link-form-error')

const resultsContainer = document.getElementById('result')

menuIcon.addEventListener('click', toggleNavbar)
getShortLinkButton.addEventListener('click', shortLink)
resultsContainer.addEventListener('click', copyLink)

let generatedShortLink;

async function shortLink(e){
    e.preventDefault()
    cleanErrorProperties()

    if (linkInput.value.trim() == '') {
        showError(0)
    } else {
        linkInput.classList.remove('error-state')
        errorPlaceholder.style.display = 'none'

        // Getting link...
        getShortLinkButton.setAttribute('disabled', 'true')
        getShortLinkButton.innerText = 'Getting results...'
        const res = await fetch(`${API_BASE_URL}?url=${linkInput.value}`, {method: 'GET'})
        const data = await res.json()
        getShortLinkButton.removeAttribute('disabled')
        getShortLinkButton.innerText = 'Shorten it!'

        if (!data.ok) {
            showError(data.error_code)
        } else {
            renderResults(data.result)
            resultsContainer.scrollIntoView({
                behavior: 'smooth'
            })
        }
        
        linkInput.value = ''
    }
    // const link = 
}

function renderResults(data) {
    generatedShortLink = data.short_link
    resultsContainer.style.backgroundColor = 'white'
    resultsContainer.innerHTML = `
        <p class="original-link" id="original-link">${data.original_link}</p>
        
        <a href="${data.short_link}" class="generated-short-link" id="generated-short-link">${data.short_link}</a>
        <button class="copy-link-button primary-button" id="copy-link-button">Copy</button>
    `
}

function copyLink(e){
    if (e.target.getAttribute('id') === 'copy-link-button'){
        navigator.clipboard.writeText(generatedShortLink)
        e.target.classList.add('copied')
        e.target.innerText = 'copied!'
    }
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
    navbar.classList.toggle('hidden')
}


