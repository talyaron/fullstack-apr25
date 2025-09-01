interface Movies {
    id: string;
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
// main controller

async function render(){
    try {
        const movies = await getAllMovies();
        if (movies.length > 0) {
            renderMovieList(movies);
        }
    } catch (error) {
        console.error('Error occurred while rendering movies:', error);
    }

    const addMovieForm = document.getElementById("add-movie");
    if (!addMovieForm) throw new Error ("Form element not found")
    addMovieForm.addEventListener("submit", handleAddMovie)
}

render()


//controller

async function handleAddMovie(e:SubmitEvent){
    try {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (!form) throw new Error ('form not found');

    const formData = new FormData(form);

    const name = formData.get('name')
    const image = formData.get('image')
    const genre = formData.get('genre')
    const rating = formData.get('rating')

    console.log (name, image, genre, rating);

    const response = await fetch ("http://localhost:3000/movies/add-movie",{
        method : "post",
        headers :{"Content-Type" : "application/json"},
        body:JSON.stringify({name, image, genre, rating})
    })
    const data = await response.json()

    if (!response.ok){
        throw new Error ("Error"+ data.error)

    }
console.log(data)

render();

    } catch (error) {
        console.error('Error occurred while adding a movie:', error);
    }
}