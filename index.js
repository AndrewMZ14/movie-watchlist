//Element variables

const mainContent = document.getElementById('main-content')
const searchField = document.getElementById('search-field')
const searchBtn = document.getElementById('search-btn')
const watchList = []
let idSearchedMovies = []
//Event listeners
searchBtn.addEventListener('click', searchBtnLogic)
mainContent.addEventListener('click', function(e){

    //Checking which favourite button was clicked
    try{
        const targetBtn = e.target.closest("[data-id]")
        if(idSearchedMovies){
        let favourite = idSearchedMovies.filter(function(movie) {
            return movie.imdbID === targetBtn.dataset.id
        })

        if(!watchList.includes(favourite[0])){
            watchList.push(favourite[0])
        }
    }
    localStorage.setItem("watchList", JSON.stringify(watchList))
    }
    catch(error){

    }
    
})


//Functions
//Makes a request to the OMDB API to get an array of movies matching the search
async function searchBtnLogic(){
    let searchInput = searchField.value
    
    try{
        let promise = await fetch(`http://www.omdbapi.com/?apikey={your key}=${searchInput}`)
        let data = await promise.json()

        let searchResultArray = data.Search
        console.log(searchResultArray)

        let htmlString = await getHtmlString(searchResultArray)
        
        mainContent.innerHTML = htmlString
    }
    catch(error){
        console.error(error)
    }
}

//Find the specific movies by id and then generate an html string 
async function getHtmlString(searchResultArray){
    
    try{

        //Creating an array of promises and using Promise.all() to wait for them
        const promisesArray = searchResultArray.map(async (movie) =>{
        const promise = await fetch(`http://www.omdbapi.com/?apikey={your key}=${movie.imdbID}`)
        return await promise.json()
    })
    
    idSearchedMovies = await Promise.all(promisesArray)
    let htmlString = idSearchedMovies.map((movie) => {
                       
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
                        <button class="watchlist-btn" data-id="${movie.imdbID}"><i class="fa-solid fa-circle-plus" ></i></button>
                        <p class="btn-label">Watchlist</p></div>
                </div>

                <p class="plot">${movie.Plot}</p>
            </div>
        </div>   
            `
        }).join("")

        return htmlString
    }
    catch(error){
        let htmlString = `<div class="not-found-div">
        <p class="not-found-text">Could not find what you were looking for try something else.</p>
        </div>`
        console.error(error)
        return htmlString
    }

    
}

//Function for watch lsit button logic
function wacthListLogic(idSearchedMovies){
    idSearchedMovies.forEach(function() {
       
    })
}
