//main contoller
async function main() {
    renderMoviesList(await getMovies())
}

//services

export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string[];
  director: string;
  rating: number;
}

interface MoviesResponse {
  movies: Movie[];
  error?: string;
}

async function getMovies(): Promise<Movie[]> {
  try {
    const response = await fetch("https://localhost:2000/movies/get-movies-list");
    const data: MoviesResponse = (await response.json()) as MoviesResponse;
    if (!response.ok || data.error) throw new Error(data.error || "unknown error");
    return data.movies;
  } catch (error) {
    console.error("");
    return []
  }
}

