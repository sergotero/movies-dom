//Estado
let watchList = [];
let category = "Todos";
let search = "";


//Elementos comunes
//Buscador
const searchDOM = document.querySelector("input");
//Contenedor películas
const movieListDOM = document.getElementById("movie-list");
//Contenedor watchlist
const watchListDOM = document.getElementById("watchlist");
//Plantilla peli watchlist
const watchListTemplate = document.getElementById("movie-watchlist-template");
watchListTemplate.removeAttribute("id");
watchListTemplate.remove();
//Plantilla peli contendor
const filmTemplate = document.getElementById("movie-template");
filmTemplate.removeAttribute("id");
filmTemplate.remove();
//Total películas watchlist
const totalWL = document.getElementById("totalWL");
//Total tiempo watchlist
const totalWLTime = document.getElementById("totalWLTime");
//Estado vacío oculto
const emptyState = document.getElementById("empty-state");
//Resumen tiempo
const timeInfo = document.getElementById("resumen-tiempo");
//Botón limpiar WL
const cleanWL = document.querySelector(".fa-trash").closest("button");


render();



//Definición de funciones
function render() {
    addEventsListeners();
    renderFilms();
    renderWatchList();
}

function renderFilms(){
    //Evitamos que se dupliquen las películas
    movieListDOM.innerHTML = "";

    //Aquí se incluyen los filtros por categoría y por el input
    movies
    //Filtro para categorías
    .filter((movie) => movie.genres.includes(category) || category === "Todos")
    .filter((movie) => movie.title.toLowerCase().includes(search))
    //Bucle para clonar y añadir datos
    .forEach((movie) => {
        //Clonar la plantilla
        const filmDOM = filmTemplate.cloneNode();
        filmDOM.innerHTML = filmTemplate.innerHTML;

        //Añadir datos
        const image = filmDOM.querySelector("#film-poster");
        image.style.backgroundImage = `url("${movie.poster}")`;
        image.style.backgroundPosition = "center";
        image.style.backgroundSize = "cover";

        const icon = filmDOM.querySelector("i");
        icon.remove();

        const title = filmDOM.querySelector("h3");
        title.textContent = movie.title;

        const genre = filmDOM.querySelector("p:nth-of-type(1)");
        genre.textContent = movie.genres.join(", ");
        
        const description = filmDOM.querySelector("p:nth-of-type(2)");
        description.textContent = movie.description;

        const rating = filmDOM.querySelector("span:nth-of-type(1)");
        rating.innerHTML = `<i class="fas fa-star mr-1"></i>${movie.rating}`;

        const duration = filmDOM.querySelector("span:nth-of-type(2)");
        duration.textContent = movie.duration + " min";

        filmDOM.querySelector("button").addEventListener("click", () => {
            
            if(!watchList.includes(movie)) {
                
                watchList.push(movie);

                const watchedFilm = watchListTemplate.cloneNode();
                watchedFilm.innerHTML = watchListTemplate.innerHTML;

                const watchedTitle = watchedFilm.querySelector("h4");
                watchedTitle.textContent = title.textContent;
                
                const spans = watchedFilm.querySelectorAll("span");
                
                const watchedGenres = spans[0];
                watchedGenres.textContent = genre.textContent;
                
                const watchedDuration = spans[1];
                watchedDuration.textContent = duration.textContent;
                
                const watchedRating = spans[2];
                watchedRating.innerHTML = `<i class="fas fa-star mr-1"></i>${movie.rating}`;
                
                const crosses = watchedFilm.querySelectorAll(".fa-times");
                
                crosses.forEach((cross) => {
                    cross.addEventListener("click", () => {
                        watchedFilm.remove();
                        for (let i = 0; i < watchList.length; i++) {
                            const film = watchList[i].title;
                            if(film === watchedTitle.textContent) {
                                watchList.splice(i, 1);
                                break;
                            }
                        }
                        render();
                    });
                });

                watchListDOM.append(watchedFilm);
            }
            render();

        });
        
        //Añadir al DOM
        movieListDOM.appendChild(filmDOM);
    });
}

function renderWatchList(){
    if (watchList.length === 0) {
        emptyState.classList.toggle("hidden");
        timeInfo.classList.add("hidden");
    } else {
        timeInfo.classList.remove("hidden");
        emptyState.classList.add("hidden");
        totalWL.textContent = watchList.length;
        totalmins = watchList.reduce((mins, film) => mins += film.duration, 0);
        days = Math.floor(totalmins / 60 / 24)
        hours = Math.floor(totalmins / 60);
        mins = totalmins % 60;
        totalWLTime.textContent = days + "d " + hours + "h " + mins + "min";
    }
}



function addEventsListeners() {
    
    //Listeners para botones
    const buttons = document.querySelectorAll("#categories button");
    

    buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const btn = e.target;

            active = document.querySelectorAll(".active")[0];
            
            active.classList.remove("active");
            active.classList.add("inactive");
            btn.classList.toggle("inactive");
            btn.classList.toggle("active");
            category = btn.textContent.trim();
            render();
        });
    });

    searchDOM.addEventListener("input", (e) => {
        search = e.target.value.toLowerCase();
        renderFilms();
    })
    

    cleanWL.addEventListener("click", () => {
        watchListDOM.innerHTML = "";
        watchList = [];
        render();
    })
}