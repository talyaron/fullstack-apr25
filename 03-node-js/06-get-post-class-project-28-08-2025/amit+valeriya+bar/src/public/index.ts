type Movie = {
    title: string;
    year: number;
    genre: string;
    imageUrl: string;
};


async function getAllMovies() {
    try {
        const response = await fetch("http://localhost:3000/movies");

        const data: any = await response.json();

        if(response.ok) {
            if(data.movies && data.movies.length > 0) {
                return data.movies;
            }
            else{
                throw new Error("No movies found");
            }
        } else{
            throw new Error("Failed to fetch movies");
        }

    } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
}

async function getNumberOfMovies() {
    try {
        const response = await fetch("http://localhost:3000/movies/number-of-movies");

        const data: any = await response.json();

        if (response.ok) {
            return data.numberOfMovies;
        } else {
            throw new Error("Failed to fetch number of movies");
        }

    } catch (error) {
        console.error("Error fetching number of movies:", error);
        return 0;
    }
}

async function renderMoviestList(movie: Movie[]) {
    const listContainer = document.getElementById('list-of-movies');
    if (!listContainer) throw new Error('List container not found');

    //  const averages = await getAverageRating();

    listContainer.innerHTML = '';

    movie.forEach(movie => {
        // const avgObj = averages.find((a: any) => a.id === movie.id);
        // const avgText = avgObj ? avgObj.average.toFixed(2) : 'N/A';
        const movieElement = document.createElement('div');
        movieElement.className = 'movie';
        movieElement.innerHTML = `
        <img src="${movie.imageUrl}" alt="${movie.title}">
        <h2>${movie.title}</h2>
        <p>Year: ${movie.year}</p>
        <p>Genre: ${movie.genre}</p>
        <p>Average Rating: ${avgText}</p>
        `;
        listContainer.appendMovie(movieElement);
    });
}

async function main() {
    try {
        const moviesCount = await getNumberOfMovies();

        const moviesCountElement = document.getElementById('number-of-movies');
        if (!moviesCountElement) throw new Error('Movies count element not found');

        moviesCountElement.textContent = moviesCount.toString();

        const movies = await getAllMovies();
        if (movies.length < 0) throw new Error('No movies found');
        await renderMoviestList(movies);

    } catch (error) {
        console.error('Error occurred while fetching movies count:', error);
    }
}

main();

