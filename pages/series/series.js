const API_KEY = "2196439ea3715408c47505d449755e88";

const genreMap = {
    action: 10759,
    romance: 10749,
    comedy: 35,
    horror: 10759,
    drama: 18,
    "sci-fi": 10765,
    fantasy: 10765,
    thriller: 9648,
    animation: 16
};

const grid = document.querySelector(".grid");
const searchInput = document.getElementById("search");
const select = document.getElementById("options");

let genreIdMap = {};




// ================================
// Fetch genre list from TMDb
// ================================
async function fetchGenreList() {
    const res = await fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`);
    const data = await res.json();
    data.genres.forEach(g => {
        genreIdMap[g.id] = g.name;
    });
}
fetchGenreList();

// ================================
// Debounce search bar
// ================================
let timeout;
searchInput.addEventListener("input", () => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
        const query = searchInput.value.trim();
         if (query.length === 0) {
            fetchSeriesByYearPopular(2026); 
            return;
        }

        fetchSeriesBySearch(query);
    }, 300);
});

// ================================
// Filter by genre
// ================================
select.addEventListener("change", () => {
    const genreValue = select.value;
    if (!genreValue) {
        fetchSeriesByYearPopular(2026); 
        return;
    }

    const genre = genreMap[genreValue];

    if (searchInput.value.trim().length > 0) return;

    fetchSeriesByGenre(genre);
});

// ================================
// Search series by title
// ================================
async function fetchSeriesBySearch(query) {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
        const data = await res.json();
        displaySeries(data.results);
    } catch (err) {
        console.error("Erro ao buscar séries:", err);
    }
}

// ================================
// Search series by genre
// ================================
async function fetchSeriesByGenre(genreId) {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc`);
        const data = await res.json();
        displaySeries(data.results);
    } catch (err) {
        console.error("Erro ao buscar séries por gênero:", err);
    }
}

// ================================
// Popular series of 
// the year (tipo Oscar/2026)
// ================================
async function fetchSeriesByYearPopular(year) {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&first_air_date_year=${year}&sort_by=vote_average.desc&vote_count.gte=50`);
        const data = await res.json();
        displaySeries(data.results);
    } catch (err) {
        console.error("Erro ao buscar séries populares do ano:", err);
    }
}

// ================================
// Fetch series details (seasons)
// ================================
async function fetchSeriesDetails(id) {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`);
        const data = await res.json();
        return data.number_of_seasons || "N/A";
    } catch {
        return "N/A";
    }
}

// ================================
// Fetch watch providers
// ================================
async function fetchWatchProviders(tvId) {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/tv/${tvId}/watch/providers?api_key=${API_KEY}`);
        const data = await res.json();
        if (!data.results.PT) return [];
        const providers = data.results.PT.flatrate || [];
        return providers.map(p => p.provider_name);
    } catch {
        return [];
    }
}

// ================================
// Display series in grid
// ================================
function displaySeries(seriesList) {
    grid.innerHTML = "";

    if (!seriesList || seriesList.length === 0) {
        grid.innerHTML = "<p style='color:white'>No series found.</p>";
        return;
    }

    seriesList.forEach(async tv => {
        const image = tv.poster_path ? `https://image.tmdb.org/t/p/w500${tv.poster_path}` : "/assets/no-image.svg";
        const seasons = await fetchSeriesDetails(tv.id);
        const providers = await fetchWatchProviders(tv.id);
        const description = tv.overview && tv.overview.trim() !== "" ? tv.overview : "No description available.";
        const year = tv.first_air_date ? tv.first_air_date.slice(0, 4) : "N/A";

        const card = `
      <div class="card">
        <img class="cover" src="${image}" alt="" onerror="this.src='/assets/no-image.svg'">
        <div class="info">
          <h2 class="title">${tv.name} (${year})</h2>
          <div class="details">
            <span class="seasons">Seasons: ${seasons}</span>
            <span class="gender">${tv.genre_ids.map(id => genreIdMap[id]).join(", ")}</span>
            <span class="providers">${providers.length ? providers.join(", ") : "N/A"}</span>
          </div>
          <p class="description">${description}</p>
        </div>
      </div>
    `;

        grid.innerHTML += card;
    });
}

// ================================
// Homepage: Popular Series
// of the year 2026
// ================================
fetchSeriesByYearPopular(2026);