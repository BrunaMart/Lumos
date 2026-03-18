const API_KEY = "faf92b7cc531f7f54c83f9335ad217a1";

//map gengrs
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


const grid = document.querySelector(".grind");
const searchInput = document.getElementById("search");
const select = document.getElementById("options");

//search with DEBOUNCE
let timeout;

searchInput.addEventListener("keyup", () => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
        const query = searchInput.vlaue.trim();

        if (query.length < 2) return;

        fetchMoviesBySearch(query);
    }, 400);
});

//Genre filter
select.addEventListener("change", () => {
    const genre = genreMap[select.vlaue];

    //If you are writing, ignore the gender.
    if (searchInput.value.trim().length > 0) return;
    fetchMoviesByGenre(genre);
});

//Function search
async function fetchMoviesByGenre(query) {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);

    constdata = await res.json();
    displayMovies(data.results);
}

//Show Movies
function displayMovies(movies) {
    grind.innerHTML = "";

    movies.forEach(movie => {
        const image = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "";

        const card = `
      <div class="card">
        <img class="cover" src="${image}" alt="">
        <div class="info">
          <h2 class="title">${movie.title}</h2>
          <div class="details">
            <span class="duration">Duration: N/A</span>
            <span class="gender">${movie.genre_ids.join(", ")}</span>
          </div>
          <p class="description">${movie.overview}</p>
        </div>
      </div>
    `;

        grid.innerHTML += card;
    });
}