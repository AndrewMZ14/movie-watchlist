const mainContent = document.getElementById("main-content")
const watchList = JSON.parse(localStorage.getItem("watchList"))

//Display watch list if it exists
if(watchList){
    let htmlString = watchList.map((movie) => {
        return `
               <div class="movie-card">
            <img src="${movie.Poster}" alt="a poster of the movie ${movie.Title}" class="poster">
            <div class="movie-details">
                <div class="title-rating">
                    <h2>${movie.Title}</h2> <p><i class="fa-solid fa-star"></i> <span class="rating">${movie.imdbRating}</span></p>
                </div>

                <div class="duration-genre">
                    <p class="duration">${movie.Runtime}</p>
                    <p class="genre">${movie.Genre}</p>
                    <div class="watchlist-div">
                        <button class="watchlist-btn"><i class="fa-solid fa-circle-plus" data-id="${movie.imdbID}"></i></button>
                        <p class="btn-label">Watchlist</p></div>
                </div>

                <p class="plot">${movie.Plot}</p>
            </div>
        </div>  
       `
    }).join("")
    mainContent.innerHTML = htmlString
}


