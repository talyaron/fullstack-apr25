async function main() {
  await renderMoviesList(await getMovies());
  try {
    // renderMoviesList(await getMovies());

    const form = document.getElementById("add-movie-form");
    if (!form) throw new Error("add-movie-form form element not found.");
    form.addEventListener("submit",await handelSubmit)
  } catch (error) {
    console.error("error in main controller: ", error);

  }
}
 main();
//control functions

async function handelSubmit(event:SubmitEvent){
    event.preventDefault()
    console.log("Form submited");
     if (!(event.target instanceof HTMLFormElement)) throw new Error("Event target is not a form");
    const formData = new FormData(event.target);
    const id = formData.get("")

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
