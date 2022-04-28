const slajdovi = document.getElementById('slajdovi')

let pitanja = [
    {
        pitanje: "Ovo je prvo pitanje"
    },
    {
        pitanje:"Ovo je drugo pitanje"
    },
    {
        pitanje:"Ovo je trece pitanje"
    },
    {
        pitanje:"Ovo je cetvrto pitanje"
    }
]

pitanja.forEach(function dodajSlajdove(element, index) {
    slajdovi.appendChild(`<a id="slajd">${index++}</a>`)
});

