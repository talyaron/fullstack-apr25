interface Movies {
    id: number;
    name: string;
    rating: number;
    genre: string;
    image: string;
}


interface MovieResponse {
    movies?: Movies[];
    error?: string;
}

async function getAllMovies(): Promise<Movies[]> {
    try {
        const response = await fetch('http://localhost:3000/movies/get-all-movies');
        
        // Check if response is ok first, before parsing JSON
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: any = await response.json(); // Changed to 'any' for debugging

        

        
        // If data itself is an array of movies
        if (Array.isArray(data)) {
            console.log("Data is directly an array of length:", data.length);
            return data;
        }
        
        // Try different possible property names
        const movies = data.movies || data.data || data.results || data;
        
        if (movies && Array.isArray(movies) && movies.length > 0) {
            return movies;
        } else {
            console.warn('No movies found in any expected property');
            return [];
        }
        
    } catch (error) {
        console.error('Error occurred while fetching all movies:', error);
        return [];
    }
}




function renderMovieList(movie:Movies[]){
    console.log(movie)
    const movieList = document.getElementById('movie-list')
    if (!movieList) throw new Error ('movie container not found')

        movieList.innerHTML = '';

        movie.forEach(movie =>{
            const movieElement = document.createElement('div')
            movieElement.className = 'movie'
            movieElement.innerHTML = `
            <img src="${movie.image}" alt="${movie.name} Poster">
            <h2>${movie.name}</h2>
            <p>${movie.rating}</p>
            <p>${movie.genre}</p>
            `
            movieList.appendChild(movieElement);
        })

    }

async function render(){
    try {
        const movies = await getAllMovies();
        if (movies.length > 0) {
            renderMovieList(movies);
        }
    } catch (error) {
        console.error('Error occurred while rendering movies:', error);
    }
}

render()