async function main() {
  try {
    await renderMoviesList(await getMovies());
    const form = document.getElementById("add-movie-form");
    if (!form) throw new Error("add-movie-form form element not found.");
    form.addEventListener("submit", await handleSubmit);
  } catch (error) {
    console.error("error in main controller: ", error);
  }
}
main();
//control functions

async function handleSubmit(event: SubmitEvent) {
  try {
    event.preventDefault();
    console.log("Form submited");
    if (!(event.target instanceof HTMLFormElement)) throw new Error("Event target is not a form");
    const formData = new FormData(event.target);
    const title = formData.get("movieTitle");
    const year = formData.get("movieYear");
    const genre = formData.get("movieGenre");
    const director = formData.get("movieDirector");
    const rating = 1;
    const poster = formData.get("moviePoster")

    console.log(title, year, genre, director, rating, poster);

    const response = await fetch("http://localhost:2000/movies/add-movie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, year, genre, director, rating, poster }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error("error fetching add-movie", (data.error));

    event.target.reset();
    main()
  } catch (error) {
    console.error("Error in handel submit fnuction: ", error);
  }
}

//services

interface Movie {
  title: string;
  year: number;
  genre: string[];
  director: string;
  rating: number;
  poster: string;
}


interface MoviesResponse {
  movies: Movie[];
  error?: string;
}

async function getMovies(): Promise<Movie[]> {
  try {
    const response = await fetch("http://localhost:2000/movies/get-movies-list");
    const data: MoviesResponse = (await response.json()) as MoviesResponse;
    if (!response.ok || data.error) throw new Error(data.error || "unknown error");
    return data.movies;
  } catch (error) {
    console.error("");
    return [];
  }
}
//view functions
async function renderMoviesList(movies: Movie[]) {
  const movieListEl = document.getElementById("movieList");
  if (!movieListEl) throw new Error();
  try {
    movieListEl.innerHTML = movies
      .map((m) => {
        return `
          <div class="movie-card">
            <div class="movie-poster" style="background-image: url(${m.poster});"></div>
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
