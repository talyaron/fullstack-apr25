<<<<<<< Updated upstream
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
        const response = await fetch("http://localhost:3000/movies-number-of-movies");

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

    listContainer.innerHTML = '';

    movie.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.className = 'movie';
        movieElement.innerHTML = `
        <img src="${movie.imageUrl}" alt="${movie.title}">
        <h2>${movie.title}</h2>
        <p>Year: ${movie.year}</p>
        <p>Genre: ${movie.genre}</p>
        `;
        listContainer.appendChild(movieElement);
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

=======
 class MovieApp {
    constructor() {
        this.movies = JSON.parse(localStorage.getItem('movies')) || [];
        this.movieSlotRatings = JSON.parse(localStorage.getItem('movieSlotRatings')) || {};
        this.currentRating = 0;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateMovieCount();
        this.renderMovies();
        this.setupFormRating();
        this.setupMovieSlotRatings();
    }

    setupEventListeners() {
        const form = document.getElementById('add-movie-form');
        form.addEventListener('submit', this.handleAddMovie.bind(this));
    }

    setupMovieSlotRatings() {
        const movieSlots = document.querySelectorAll('.movie-slot');

        movieSlots.forEach(slot => {
            const slotId = slot.dataset.slot;
            const ratingContainer = slot.querySelector('.star-rating__stars');
            const stars = ratingContainer.querySelectorAll('.star');
            const display = slot.querySelector('.star-rating__display');

            // Set initial rating from localStorage
            const savedRating = this.movieSlotRatings[slotId] || 0;
            ratingContainer.dataset.rating = savedRating;
            this.highlightStars(ratingContainer, savedRating);
            display.textContent = savedRating > 0 ?
                `${savedRating} star${savedRating !== 1 ? 's' : ''}` : 'Not rated';

            stars.forEach(star => {
                star.addEventListener('mouseover', (e) => {
                    const rating = parseInt(e.target.dataset.value);
                    this.highlightStars(ratingContainer, rating);
                    display.textContent = `${rating} star${rating !== 1 ? 's' : ''}`;
                });

                star.addEventListener('mouseout', () => {
                    const currentRating = this.movieSlotRatings[slotId] || 0;
                    this.highlightStars(ratingContainer, currentRating);
                    display.textContent = currentRating > 0 ?
                        `${currentRating} star${currentRating !== 1 ? 's' : ''}` : 'Not rated';
                });

                star.addEventListener('click', (e) => {
                    const newRating = parseInt(e.target.dataset.value);
                    this.movieSlotRatings[slotId] = newRating;
                    ratingContainer.dataset.rating = newRating;
                    this.highlightStars(ratingContainer, newRating);
                    display.textContent = `${newRating} star${newRating !== 1 ? 's' : ''}`;
                    this.saveMovieSlotRatings();
                });
            });
        });
    }

    saveMovieSlotRatings() {
        localStorage.setItem('movieSlotRatings', JSON.stringify(this.movieSlotRatings));
    }

    setupFormRating() {
        const formRating = document.querySelector('.form-star-rating .star-rating__stars');
        if (!formRating) return;

        const stars = formRating.querySelectorAll('.star');
        const display = document.querySelector('.form-star-rating .star-rating__display');

        stars.forEach(star => {
            star.addEventListener('mouseover', (e) => {
                const rating = parseInt(e.target.dataset.value);
                this.highlightStars(formRating, rating);
                display.textContent = `${rating} star${rating !== 1 ? 's' : ''}`;
            });

            star.addEventListener('mouseout', () => {
                this.highlightStars(formRating, this.currentRating);
                display.textContent = this.currentRating > 0 ?
                    `${this.currentRating} star${this.currentRating !== 1 ? 's' : ''}` : 'No rating';
            });

            star.addEventListener('click', (e) => {
                this.currentRating = parseInt(e.target.dataset.value);
                formRating.dataset.rating = this.currentRating;
                this.highlightStars(formRating, this.currentRating);
                display.textContent = `${this.currentRating} star${this.currentRating !== 1 ? 's' : ''}`;
            });
        });
    }

    highlightStars(container, rating) {
        const stars = container.querySelectorAll('.star');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('filled');
                star.classList.remove('hover');
            } else {
                star.classList.remove('filled', 'hover');
            }
        });
    }

    handleAddMovie(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        const movie = {
            id: Date.now(),
            title: formData.get('title'),
            year: parseInt(formData.get('year')),
            genre: formData.get('genre'),
            imageUrl: formData.get('imageUrl'),
            rating: this.currentRating
        };

        this.movies.push(movie);
        this.saveMovies();
        this.renderMovies();
        this.updateMovieCount();

        // Reset form
        e.target.reset();
        this.currentRating = 0;
        const formRating = document.querySelector('.form-star-rating .star-rating__stars');
        const display = document.querySelector('.form-star-rating .star-rating__display');
        if (formRating && display) {
            formRating.dataset.rating = 0;
            this.highlightStars(formRating, 0);
            display.textContent = 'No rating';
        }
    }

    setupMovieRating(movieElement, movieId) {
        const ratingContainer = movieElement.querySelector('.star-rating__stars');
        const stars = ratingContainer.querySelectorAll('.star');
        const display = movieElement.querySelector('.star-rating__display');
        const movie = this.movies.find(m => m.id === movieId);

        stars.forEach(star => {
            star.addEventListener('mouseover', (e) => {
                const rating = parseInt(e.target.dataset.value);
                this.highlightStars(ratingContainer, rating);
                display.textContent = `${rating} star${rating !== 1 ? 's' : ''}`;
            });

            star.addEventListener('mouseout', () => {
                this.highlightStars(ratingContainer, movie.rating);
                display.textContent = movie.rating > 0 ?
                    `${movie.rating} star${movie.rating !== 1 ? 's' : ''}` : 'Not rated';
            });

            star.addEventListener('click', (e) => {
                const newRating = parseInt(e.target.dataset.value);
                movie.rating = newRating;
                ratingContainer.dataset.rating = newRating;
                this.highlightStars(ratingContainer, newRating);
                display.textContent = `${newRating} star${newRating !== 1 ? 's' : ''}`;
                this.saveMovies();
            });
        });

        // Set initial rating
        this.highlightStars(ratingContainer, movie.rating);
        display.textContent = movie.rating > 0 ?
            `${movie.rating} star${movie.rating !== 1 ? 's' : ''}` : 'Not rated';
    }

    renderMovies() {
        const container = document.getElementById('list-of-movies');
        container.innerHTML = '';

        this.movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            movieCard.innerHTML = `
                <div class="movie-card__image">
                    <img src="${movie.imageUrl}" alt="${movie.title}" 
                         onerror="this.src='https://via.placeholder.com/300x400/1f1f1f/ffffff?text=${encodeURIComponent(movie.title)}'">
                </div>
                <div class="movie-card__content">
                    <div class="movie-card__header">
                        <div>
                            <h3 class="movie-card__title">${movie.title}</h3>
                            <p class="movie-card__year">${movie.year}</p>
                        </div>
                        <span class="movie-card__genre">${movie.genre}</span>
                    </div>
                    
                    <div class="star-rating">
                        <span class="star-rating__label">Rate:</span>
                        <div class="star-rating__stars" data-rating="${movie.rating}">
                            <span class="star" data-value="1">★</span>
                            <span class="star" data-value="2">★</span>
                            <span class="star" data-value="3">★</span>
                            <span class="star" data-value="4">★</span>
                            <span class="star" data-value="5">★</span>
                        </div>
                        <span class="star-rating__display"></span>
                    </div>
                    
                    <div class="movie-card__actions">
                        <button class="movie-card__button movie-card__button--watch">
                            🎬 Watch
                        </button>
                        <button class="movie-card__button movie-card__button--delete" 
                                onclick="movieApp.deleteMovie(${movie.id})">
                            🗑️ Delete
                        </button>
                    </div>
                </div>
            `;
            container.appendChild(movieCard);
            this.setupMovieRating(movieCard, movie.id);
        });
    }

    deleteMovie(id) {
        this.movies = this.movies.filter(movie => movie.id !== id);
        this.saveMovies();
        this.renderMovies();
        this.updateMovieCount();
    }

    updateMovieCount() {
        const countElement = document.getElementById('number-of-movies');
        countElement.textContent = this.movies.length;
    }

    saveMovies() {
        localStorage.setItem('movies', JSON.stringify(this.movies));
    }
}
   
>>>>>>> Stashed changes
