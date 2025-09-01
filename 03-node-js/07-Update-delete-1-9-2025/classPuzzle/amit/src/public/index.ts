// main controller
async function main() {
    try {
        const movies = await getAllMovies();
     
        if (movies.length > 0) {
            renderMoviesList(movies);
        }
    } catch (error) {
        console.error('Error occurred while fetching movies:', error);
    }
}


main();
// Add student form logic
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-movie-form') as HTMLFormElement | null;
    if (!form) return;
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const titleInput = document.getElementById('movie-title') as HTMLInputElement;
        const yearInput = document.getElementById('movie-year') as HTMLInputElement;
        const genreInput = document.getElementById('movie-genre') as HTMLInputElement;
        const ratingInput = document.getElementById('movie-rating') as HTMLInputElement;
        const posterInput = document.getElementById('movie-poster') as HTMLInputElement;
        const descriptionInput = document.getElementById('movie-description') as HTMLInputElement;
        const messageDiv = document.getElementById('form-message');

        if (!titleInput || !yearInput || !genreInput || !ratingInput || !posterInput || !descriptionInput || !messageDiv) return;

        const title = titleInput.value.trim();
        const year = parseInt(yearInput.value);
        const genre = genreInput.value.trim();
        const rating = parseInt(ratingInput.value);
        const poster = posterInput.value.trim();
        const description = descriptionInput.value.trim();
        if (!title || !genre || !poster || !description || isNaN(year) || isNaN(rating) || year > 2025) {
            messageDiv.textContent = 'Please fill all fields correctly.';
            messageDiv.style.color = '#b91c1c';
            return;
        }
        try {
            const res = await fetch('http://localhost:3000/movies/add-movie', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }, //I will send in a json format
                body: JSON.stringify({ title, year, genre, rating, poster, description }) //data in string format
            });
            const data = await res.json();
            if (res.ok) {
                messageDiv.textContent = 'Movie added!';
                messageDiv.style.color = '#256029';
                titleInput.value = '';
                yearInput.value = '';
                genreInput.value = '';
                ratingInput.value = '';
                posterInput.value = '';
                descriptionInput.value = '';
                // Refresh student list and count
                main();
            } else {
                const error = data.error || 'Failed to add movie.';
                messageDiv.textContent = error;
                messageDiv.style.color = '#b91c1c';
            }
        } catch (err) {
            messageDiv.textContent = 'Network/server error.';
            messageDiv.style.color = '#b91c1c';
        }
    });
});

//controllers

async function handleDeleteMovie(movieId: string) {
    try {
        console.log(movieId);

        if (!movieId) throw new Error('Invalid movie ID');

        // Call the API to delete the movie
        const res = await fetch(`http://localhost:3000/movies/delete-movie`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: movieId }) //data
        });

        const data = await res.json();

        console.log(data);

        if (res.ok) {
            console.log('Movie deleted successfully');
            main(); // Refresh the movie list
        } else {
            const data = await res.json();
            console.error('Failed to delete movie:', data.error);
        }
    } catch (error) {
        console.error('Error occurred while deleting movie:', error);
    }
}

async function handleRatingChange(id:string, newRating:string) {
    try {
        console.log(id, newRating);

        const res = await fetch('http://localhost:3000/movies/update-movie-rating', {
            method: 'PATCH', // put is used for updating the entire resource, and patch is used for updating partial resources
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, rating: newRating }) //data
        });

        const data = await res.json();

        console.log(data);

        if (res.ok) {
            console.log('Movie rating updated successfully');
          
        } else {
            console.error('Failed to update movie rating:', data.error);
        }
    } catch (error) {
        console.error('Error occurred while updating movie rating:', error);
    }
}

async function handleColorChange(id:string, newColor:string) {
    try {

        const res = await fetch('http://localhost:3000/movies/update-movie-color', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, color: newColor })
        });

        const data = await res.json();

        if (res.ok) {
            console.log('Movie color updated successfully');
            main();
        } else {
            console.error('Failed to update movie color:', data.error);
        }
    } catch (error) {
        console.error('Error occurred while updating movie color:', error);
    }
}

//services
interface Movie {
    id?: string;
    title: string;
    year: number;
    genre: string;
    rating: number;
    poster: string;
    description: string;
    color: string;
}

interface MoviesResponse {
    movies?: Movie[];
    error?: string;
}

async function getAllMovies(): Promise<Movie[]> {
    try {
        const response = await fetch('http://localhost:3000/movies/get-all-movies');

        const data: MoviesResponse = await response.json() as MoviesResponse;
      
        if (response.ok) {

            if (data.movies) {
                return data.movies;
            } else {
                throw new Error('No movie found');
            }
        } else {
            throw new Error(data.error || 'Unknown error');
        }
    } catch (error) {
        console.error('Error occurred while fetching movies:', error);
        return [];
    }
}

//view
function renderMoviesList(movies: Movie[]) {
    const listContainer = document.getElementById('list-of-movies');
    if (!listContainer) throw new Error('List container not found');

    // Clear existing content
    listContainer.innerHTML = '';

    // Render each movie
   const moviesHTML=  movies.map(movie => {
       return createMovieCardHTML(movie);
   }).join('');
 
   listContainer.innerHTML = moviesHTML;
}

function createMovieCardHTML(movie: Movie): string {
    const bg = movie.color || '#ffffff';
    return `
                <div class="movie-card" style="background-color: ${bg};">
                <h2>${movie.title}</h2>
                <img src="${movie.poster}" alt="${movie.title} poster" style="width:200px;height:auto;"/>
                <p>Year: ${movie.year}</p>
                <p>Genre: ${movie.genre}</p>
                <p>Rating: ${movie.rating}</p>
                <p>Description: ${movie.description}</p>
                <button class="delete-movie" onclick="handleDeleteMovie('${movie.id}')">Delete</button>
                <input type="range" min="0" max="5" step="1" value="${movie.rating}" onchange="handleRatingChange('${movie.id}', this.value)">
                <input type="color" value="${bg}" onchange="handleColorChange('${movie.id}', this.value)">
                </div>
            `;
}
