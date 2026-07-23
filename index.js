//Element variables
const mainContent = document.getElementById('main-content')
const searchField = document.getElementById('search-field')
const searchBtn = document.getElementById('search-btn')

//Event listeners
searchBtn.addEventListener('click', searchBtnLogic)


//Functions
//Makes a request to the OMDB API to get an array of movies matching the search
async function searchBtnLogic(){
    let searchInput = searchField.value
    
    try{
        let promise = await fetch(`http://www.omdbapi.com/?apikey=8cb2b4e1&s=${searchInput}`)
        let data = await promise.json()

        let searchResultArray = data.Search
        console.log(searchResultArray)

        let htmlString = await getHtmlString(searchResultArray)
        
        console.log(htmlString)
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
        const promise = await fetch(`http://www.omdbapi.com/?apikey=8cb2b4e1&i=${movie.imdbID}`)
        return await promise.json()
    })
    
    const idSearchedMovies = await Promise.all(promisesArray)
    let htmlString = idSearchedMovies.map((movie) => {
            return `
               <div class="movie-card">
            <img src="${movie.Poster}" alt="a poster of the movie ${movie.Title}" class="poster">
            <div class="movie-details">
                <div class="title-rating">
                    <h2>${movie.Title}</h2> <p><i class="fa-solid fa-star"></i> <span class="rating">${movie.imdbRating}</span></p>
                </div>

                <div class="duration-genre">
                    <p class="duration">${movie.Runtime}<p>
                    <p class="genre">${movie.Genre}</p>
                    <div class="watchlist-div">
                        <button class="watchlist-btn"><i class="fa-solid fa-circle-plus"></i></button>
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
        console.error(error)
    }

    
}