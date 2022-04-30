const odgovori = JSON.parse(window.localStorage.getItem('odgovori'))
const odgovoriContainer = document.querySelector('.odgovori')


for (const [key,value] of Object.entries(odgovori)){
    console.log(key, value)
    odgovoriContainer.innerHTML += `<h2>Pitanje ${key}: ${value}<h2>`
}
