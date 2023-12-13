async function loadWord() {
    const url = 'https://random-word-api.herokuapp.com/word?number=1'
    try {
        const response = await fetch(url)
        const data = await response.json()

        return data
        
    } catch (error) {
        return `Unable to load from API - ${error}`
    }
}

async function displayWord() {
    const word = await loadWord()
    const wordRef = document.querySelector("#word")

    wordRef.textContent = word
}

displayWord()

window.addEventListener('load', () => {
    if('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').then(() => {
            console.log("Service Worker registered")
        }).catch(error => {
            console.log("An error occured", error)
        })
    }
})