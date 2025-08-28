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