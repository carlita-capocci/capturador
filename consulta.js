 const base = require('./pelis.json');

 //  console.log(base.length);
 //  console.log(base[1].generos[0]);

 // console.log(base[0].puntaje);


 // Peliculas con puntaje mayor o igual a 7
 // const resultado= base.filter( objeto => {
 //     return objeto.puntaje >= 7
 // });

 // console.log(resultado.length);

 //  const arrGeneros = [];

 //  base.forEach(objPelicula => {
 //      objPelicula.generos.forEach(genero=>{
 //         arrGeneros.push(genero);   

 //     })
 //  });

 //console.log(arrGeneros);


 const gen = base.filter(arr => {
     return (arr.generos.includes("Horror") || arr.generos.includes("Mystery")) && arr.puntaje >= 7
 });

 console.log(gen);