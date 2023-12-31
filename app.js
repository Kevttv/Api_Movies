let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () =>{
    if(pagina < 100){
        pagina += 1;
        cargarPelis();
    }
    

});

btnAnterior.addEventListener('click', () =>{
    if(pagina > 1){
        pagina -= 1;
        cargarPelis();
    }
    

});


const cargarPelis = async() =>{


    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=979247c5173204f557241eb7e3470086&language=es-MX&page=${pagina}`);

        // console.log(respuesta);

        //Si la respuesta es correcta
        if(respuesta.status===200){
            const datos = await respuesta.json();


            let peliculas = '';
            datos.results.forEach(pelicula => {
                peliculas += `
                    <div class="pelicula">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" > 
                        <h3>${pelicula.title}</h3> 
                    </div>`;
            });
            document.getElementById('contenedor').innerHTML = peliculas;

        }else if(respuesta.status===401){
            console.log('El ID de la pelicula esta mal');
        }else if(respuesta.status===404){
            console.log('No existe esta pelicula');
        }else{
            console.log('ERROR FATAL');
        }

    } catch (error) {
        console.log(error);
    }
    
}

cargarPelis();