const slajdoviContainer = document.querySelector('.slajdovi')
const naslovPitanje = document.querySelector('#nazivPitanja')
const pitanje = document.querySelector('#pitanje')
const odgovoriLijevo = document.querySelector('.odgovori-lijevo')
const odgovoriDesno = document.querySelector('.odgovori-desno')
const btnPrethodni = document.querySelector('#btn-prethodni')
const btnSljedeci = document.querySelector('#btn-sljedeci')

let pitanja = [
    {
        pitanje: "Koji je glavni grad Hrvatske?",
        brojOdgovora: generirajBroj()
    },
    {
        pitanje:"Koja je najveća tropska prašuma na svijetu?",
        brojOdgovora: generirajBroj()
    },
    {
        pitanje:"Koja je najveća pustinja na svijetu?",
        brojOdgovora: generirajBroj()
    },
    {
        pitanje:"Koji je glavni grad Italije?",
        brojOdgovora: generirajBroj()
    }
]

var dict = {}

//Dodavanje slajdova u html container
izmjesajListu()
slajdoviContainer.innerHTML = pitanja.map(function dodajSlajdove(element, index){
    return `<a id="slajd">${++index}</a>`
}).join('')


//Dohvacam sve kreirane slajdove i kreiram slušače
slajdovi = Array.from(document.querySelectorAll('#slajd'))
prethodniSlajd = 1
trenutniSlajd = 1
slajdovi.forEach(slajd=>{
    slajd.innerHTML == 1 ? slajd.style = "background: #424242;font-size: 2.8rem;transform: translateX(20%);" : ""
    slajd.addEventListener('click', e=>{
        promijeniPitanje(slajd)
    })
})
 //Prikaz prvog pitanja i odgovora

 prikaziPitanjeIOdgovore(1)

 //Kad kliknem na novi slajd, obrise se stajl sa gumba koji je slajda koji je bil prije njega
function obrisiStyleSaPrethodnogSlajda(prethodniSlajd){
    slajdovi.forEach(slajd=>{
        if(slajd.innerHTML == prethodniSlajd){
            slajd.style = ""
        }
    })
}

function promijeniPitanje(slajd){
    console.log("Prethodni slajd: " + prethodniSlajd)
    if(prethodniSlajd != slajd.innerHTML){
        trenutniSlajd = slajd.innerHTML
        console.log("Trenutni slajd: "+ trenutniSlajd)
        prikaziPitanjeIOdgovore(slajd.innerHTML)
        obrisiStyleSaPrethodnogSlajda(prethodniSlajd)
    }
    slajd.style = "background: #424242;font-size: 2.8rem;transform: translateX(20%);"
    prethodniSlajd = slajd.innerHTML
    
}

//Funkcija koja prikazuje pitanje i odgovore na njih
//TO DO nakon kaj se jemput generiraju odgovori ostavim ih kakvi jesu
function prikaziPitanjeIOdgovore(rbPitanja){
    odgovoriLijevo.innerHTML = ""
    odgovoriDesno.innerHTML = ""
    naslovPitanje.innerHTML = `<p id="nazivPitanja">Pitanje ${rbPitanja}</p>`
    pitanje.innerHTML = `<p id="pitanje">${pitanja[rbPitanja- 1].pitanje}</p>`
    for (let index = 0; index < pitanja[rbPitanja-1].brojOdgovora; index++) {
        if(index === 0 || index%2 === 0){
            odgovoriLijevo.innerHTML += `<a id="odgovor" class ="o-lijevo">${index + 1}</a>`
        }else{
            odgovoriDesno.innerHTML += `<a id="odgovor" class ="o-desno">${index + 1}</a>`
        }
    }
    rbPitanja == 1 ? btnPrethodni.style.visibility = 'hidden' : btnPrethodni.style.visibility = 'visible'
    rbPitanja == 4 ? btnSljedeci.style.visibility = 'hidden' : btnSljedeci.style.visibility = 'visible'

    KreirajSlusaceZaOdgovore()
    provjeriOdabraneOdgovore()
}

//Funkcija za dobivanje random broja
function generirajBroj(){
    min = Math.ceil(2);
    max = Math.floor(9);
    return Math.floor(Math.random() * (max - min) + min);
}

//Durstendelf algoritam O(n) za miješanje liste
function izmjesajListu(){
    for (let i = pitanja.length-1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = pitanja[i];
        pitanja[i] = pitanja[j];
        pitanja[j] = temp;
    }
}

//button sljedeci
btnSljedeci.addEventListener('click', e=>{
    let sljedeciSlajd = parseInt(trenutniSlajd) + 1;
    console.log("Sljedeci slajd: " + sljedeciSlajd)
    slajdovi.forEach(element => {
        if(element.innerHTML == sljedeciSlajd){
            promijeniPitanje(element)
        }
    });
})

//button prethodni
btnPrethodni.addEventListener('click', e=>{
    let prethodniSlajd = parseInt(trenutniSlajd) - 1;
    console.log("Rikverc slajd: " + prethodniSlajd)
    slajdovi.forEach(element => {
        if(element.innerHTML == prethodniSlajd){
            promijeniPitanje(element)
        }
    });
})

//dohvacam sve odgovore i kreiram slusaca za svaki odgovor
function KreirajSlusaceZaOdgovore(){
    listaOdgovora = Array.from(document.querySelectorAll("#odgovor"))
    listaOdgovora.forEach(odgovor=>{
        odgovor.addEventListener('click', e =>{
            dodajOdabraniOdgovor(odgovor)
        })
    })
}

//Funkcija dodaje odabrani odgovor u dictionary ako već ne postoji
function dodajOdabraniOdgovor(odgovor){
    dict[trenutniSlajd] == null ? dict[trenutniSlajd] = [] : null //ako jos nema odgovora za to pitanje, kreiram novu listu

    //Ako odgovor nije odabran
    if(dict[trenutniSlajd].find(element => element == odgovor.innerHTML) === undefined){
        //Provjera kolko je odgovora odabrano do sad
        console.log(dict[trenutniSlajd].length)
        if(dict[trenutniSlajd].length >= parseInt(trenutniSlajd)+2){
            console.log("Dosegnut maksimalni broj odgovora")
            //TO DO prikazi alert message
        }else{
            dict[trenutniSlajd].push(odgovor.innerHTML)
            odgovor.style = "background: rgba(228,155,15, 0.8)"
        }
        
    }else{
        //Ako vec postoji odgovor onda ga obrisem iz liste i promjenim style
        console.log("Odgovor vec postoji")
        index = dict[trenutniSlajd].indexOf(odgovor.innerHTML)
        dict[trenutniSlajd].splice(index,1)
        odgovor.style = "background: #673AB7"
    }
    console.log("Pitanje " + trenutniSlajd + " Odgovori "+  dict[trenutniSlajd])

}
 function provjeriOdabraneOdgovore(){
     if(dict[trenutniSlajd] != null){
        listaOdgovora.forEach(gumbOdgovora => {
            dict[trenutniSlajd].forEach(odabraniOdgovor => {
                gumbOdgovora.innerHTML == odabraniOdgovor ? gumbOdgovora.style = "background: rgba(228,155,15, 0.8)" : null;
            });
        });
    }
 }





