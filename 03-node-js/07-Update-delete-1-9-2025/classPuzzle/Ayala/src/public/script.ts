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
    const color = "$secondary-color"
    console.log(title, year, genre, director, rating, poster);

    const response = await fetch("http://localhost:2000/movies/add-movie", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, year, genre, director, rating, poster, color }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error("error fetching add-movie", (data.error));

    event.target.reset();
    main()
  } catch (error) {
    console.error("Error in handel submit fnuction: ", error);
  }
}

async function handelColorChange(event: Event, id: string) {
  try {
    if (!event.target) throw new Error("no color was catched");

    const color = (event.target as HTMLInputElement).value;
    if (!color) throw new Error("no color value");
    const res = await fetch('http://localhost:2000/movies/change-movie-color', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, color }) //data
    });

    const data = await res.json();

    console.log(data);

    if (res.ok) {
      console.log('Movie rating updated successfully');

    } else {
      console.error('Failed to update movie rating:', data.error);
    }
    main()

  } catch (error) {
    console.error(error);
  }
}

//services

interface Movie {
  id: string
  title: string;
  year: number;
  genre: string[];
  director: string;
  rating: number;
  poster: string;
  color: string;
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
          <div class="movie-card" style="background-color:${m.color} ;">
            <div class="movie-poster" style="background-image: url(${m.poster});"></div>
            <div class="movie-info">
              <h2>${m.title}</h2>
              <p>${m.genre}</p>
              <div class="rating">⭐ ${m.rating}</div>
              <input type="color" name="" id="color-button" onchange="handelColorChange(event, ${m.id})">
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
