const API_KEY = "2196439ea3715408c47505d449755e88";

const genreMap = {
    action: 28,
    romance: 10749,
    comedy: 35,
    horror: 27,
    drama: 18,
    "sci-fi": 878,
    fantasy: 14,
    thriller: 53,
    animation: 16
};

const grid = document.querySelector(".grid");
const searchInput = document.getElementById("search");
const select = document.getElementById("options");

let genreIdMap = {}; // id → name of genres

// ================================
//  Search for the list 
// of genres on TMDb.
// ================================
async function fetchGenreList() {
    const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`);
    const data = await res.json();
    data.genres.forEach(g => {
        genreIdMap[g.id] = g.name;
    });
}

fetchGenreList();

// ================================
// Debounce to search bar
// ================================
let timeout;
searchInput.addEventListener("keyup", () => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
        const query = searchInput.value.trim();
        if (query.length < 2) return;

        fetchMoviesBySearch(query);
    }, 400);
});

// ================================
// Filter by gender
// ================================
select.addEventListener("change", () => {
    const genre = genreMap[select.value];

    if (searchInput.value.trim().length > 0) return;

    fetchMoviesByGenre(genre);
});

// ================================
// Search movies by title
// ================================
async function fetchMoviesBySearch(query) {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
    const data = await res.json();
    displayMovies(data.results);
}

// ================================
//  Search for movies by genre
// ================================
async function fetchMoviesByGenre(genreId) {
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
    const data = await res.json();
    displayMovies(data.results);
}

// ================================
// Find the actual duration of a film.
// ================================
async function fetchMovieDetails(id) {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`);
        const data = await res.json();
        return data.runtime; // duração em minutos
    } catch {
        return null;
    }
}

// ================================
// Looking for where to
//  watch the movie?
// ================================
async function fetchWatchProviders(movieId) {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${API_KEY}`);
        const data = await res.json();

        if (!data.results.PT) return [];
        const providers = data.results.PT.flatrate || [];
        return providers.map(p => p.provider_name);
    } catch {
        return [];
    }
}

// ================================
//   Show movies on the grid
// ================================
function displayMovies(movies) {
    grid.innerHTML = "";

    movies.forEach(async movie => {
        const image = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/media/icons/no-image.svg";
        const duration = await fetchMovieDetails(movie.id);
        const providers = await fetchWatchProviders(movie.id);
        const description = movie.overview && movie.overview.trim() !== "" ? movie.overview : "No description available.";
        const year = movie.release_date ? movie.release_date.slice(0, 4) : "N/A";

        const card = `
      <div class="card">
        <img class="cover" src="${image}" alt="">
        <div class="info">
          <h2 class="title">${movie.title} (${year})</h2>
          <div class="details">
            <span class="duration">Duration: ${duration ? duration + " min" : "N/A"}</span>
            <span class="gender">${movie.genre_ids.map(id => genreIdMap[id]).join(", ")}</span>
            <span class="providers">${providers.length ? providers.join(", ") : "N/A"}</span>
          </div>
          <p class="description">${description}</p>
        </div>
      </div>
    `;

        grid.innerHTML += card;
    });
}

fetchMoviesBySearch("a"); 