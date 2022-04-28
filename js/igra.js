const slajdoviContainer = document.querySelector('.slajdovi')
const naslovPitanje = document.querySelector('#nazivPitanja')
const pitanje = document.querySelector('#pitanje')
const odgovoriLijevo = document.querySelector('.odgovori-lijevo')
const odgovoriDesno = document.querySelector('.odgovori-desno')

let pitanja = [
    {
        pitanje: "Koji je glavni grad Hrvatske?"
    },
    {
        pitanje:"Koja je najveća tropska prašuma na svijetu?"
    },
    {
        pitanje:"Koja je najveća pustinja na svijetu?"
    },
    {
        pitanje:"Koji je glavni grad Italije?"
    }
]

//Dodavanje slajdova u html container
izmjesajListu()
slajdoviContainer.innerHTML = pitanja.map(function dodajSlajdove(element, index){
    return `<a id="slajd">${++index}</a>`
}).join('')

//Prikaz prvog pitanja i odgovora
prikaziPitanjeIOdgovore(1)


//Dohvacam sve kreirane slajdove i kreiram slušače
slajdovi = Array.from(document.querySelectorAll('#slajd'))
slajdovi.forEach(slajd=>{
    slajd.addEventListener('click', e=>{
        console.log(slajd.innerHTML)
        prikaziPitanjeIOdgovore(slajd.innerHTML)
    })
})

//Funkcija koja prikazuje pitanje i odgovore na njih
//TO DO nakon kaj se jemput generiraju odgovori ostavim ih kakvi jesu
function prikaziPitanjeIOdgovore(rbPitanja){
    odgovoriLijevo.innerHTML = ""
    odgovoriDesno.innerHTML = ""
    naslovPitanje.innerHTML = `<p id="pitanje">Pitanje ${rbPitanja}</p>`
    pitanje.innerHTML = `<p id="pitanje">${pitanja[rbPitanja- 1].pitanje}</p>`
    for (let index = 0; index < generirajBroj(); index++) {
        if(index === 0 || index%2 === 0){
            odgovoriLijevo.innerHTML += `<a id="odgovor" class ="o-lijevo">${index + 1}</a>`
        }else{
            odgovoriDesno.innerHTML += `<a id="odgovor" class ="o-desno">${index + 1}</a>`
        }
    }
}

//Funkcija za dobivanje random broja
function generirajBroj(){
    min = Math.ceil(2);
    max = Math.floor(10);
    return Math.floor(Math.random() * (max - min) + min);
}

//Durstendelf algoritam O(n) za miješanje liste
function izmjesajListu(){
    for (let i = pitanja.length-1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        console.log(j)
        var temp = pitanja[i];
        pitanja[i] = pitanja[j];
        pitanja[j] = temp;
    }
    console.log(pitanja)
}


