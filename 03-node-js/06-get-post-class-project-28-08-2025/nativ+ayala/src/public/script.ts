async function main() {
  await renderMoviesList(await getMovies());
}
main();
interface Movie {
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
    const response = await fetch(
      "http://localhost:2000/movies/get-movies-list"
    );
    const data: MoviesResponse = (await response.json()) as MoviesResponse;
    if (!response.ok || data.error)
      throw new Error(data.error || "unknown error");
    return data.movies;
  } catch (error) {
    console.error("");
    return [];
  }
}

async function renderMoviesList(movies: Movie[]) {
  const movieListEl = document.getElementById("movieList");
  if (!movieListEl) throw new Error();
  try {
    movieListEl.innerHTML = movies
      .map((m) => {
        return `
          <div class="movie-card">
            <div class="movie-info">
              <h2>${m.title}</h2>
              <p>${m.genre}</p>
              <div class="rating">⭐ ${m.rating}</div>
            </div>
          </div>
        `;
      })
      .join("");
  } catch (e) {
    console.error("Could not load movies", e);
    movieListEl.innerHTML = "<p>Could not load movies.</p>";
  }
}
