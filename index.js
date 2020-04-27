const fs= require('fs');


const fetch = require('node-fetch');
const cheerio = require('cheerio')
const pelis = [];

function leer(url) {
    return fetch(url).then((res) => res.text()).then((html) => cheerio.load(html));
}
function escribir(texto){
    fs.appendFile('./pelis.json', texto, (error)=>{
            if(error){
                console.log(error);
                
            }
    }
    )
};

function buscarPeliculas($) {
    const peliculas = $('.browse-movie-wrap');
    peliculas.each((idx, pelicula) => {
        let val;
        const generos = [];

        const nombre = $('.browse-movie-title', pelicula).text();
        const year = $('.browse-movie-year', pelicula).text();
        const url = $('.browse-movie-link', pelicula).attr('href');

        $('h4', pelicula).each((idx, h4) => {
            if ($(h4).attr('class')) {
                // busco el puntaje
                val = $(h4).text().slice(0, 1);
            } else {
                // busco los generos
                generos.push($(h4).text());
            }
        })
        const peli = {
            nombre: nombre,
            puntaje: parseInt(val),
            generos: generos,
            year: year,
            url: url

        }
        console.log(peli);
        escribir(JSON.stringify(peli)+',\n');
        pelis.push(peli);
    });
    return pelis;
}

function buscarNext($) {
    const lis = $('ul.tsc_pagination li');
    const ultimo = lis[lis.length - 1];
    const next = $('a', ultimo).text();

    if (next.includes('Next')) {
        return $('a', ultimo).attr('href');
    }
}


function buscarPelicula(url) {
    leer(url).then(($) => {
        buscarPeliculas($)
        const proxima = buscarNext($);

        if (proxima) {
            buscarPelicula('https://yts.mx' + proxima);
        }
    });
}

buscarPelicula('https://yts.mx/browse-movies');