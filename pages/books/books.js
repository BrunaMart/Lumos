const genreMap = {
  action: "action",
  romance: "romance",
  comedy: "comedy",
  horror: "horror",
  drama: "drama",
  "sci-fi": "science_fiction",
  fantasy: "fantasy",
  thriller: "thriller"
};

const grid = document.querySelector(".grid");
const searchInput = document.getElementById("search");
const select = document.getElementById("options");

let timeout;
let lastQuery = "";
let initialBooks = [];

// ================================
// Function to search for 
// books on the homepage.
// ================================
async function loadInitialBooks() {
  try {

    const popularQueries = ["harry potter", "dune", "lord of the rings", "game of thrones"];
    initialBooks = [];

    for (const q of popularQueries) {
      const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=5`);
      const data = await res.json();
      if (data.docs) initialBooks.push(...data.docs);
    }

    displayBooks(initialBooks);
  } catch (err) {
    console.error("Error loading initial books:", err);
    grid.innerHTML = "<p style='color:red'>Error loading initial books.</p>";
  }
}

// ================================
// Debounce: Search bar
// ================================
searchInput.addEventListener("input", () => {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    const query = searchInput.value.trim();

    if (!query) {
      displayBooks(initialBooks);
      return;
    }

    fetchBooksBySearch(query);
  }, 300);
});

// ================================
// Filter by genre
// ================================
select.addEventListener("change", () => {
  const genreValue = select.value;

  if (!genreValue) {
    displayBooks(initialBooks);
    return;
  }

  const genre = genreMap[genreValue];


  if (searchInput.value.trim().length > 0) return;

  fetchBooksByGenre(genre);
});

// ================================
// Search books by title
// ================================
async function fetchBooksBySearch(query) {
  if (query === lastQuery) return;
  lastQuery = query;

  try {
    const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=20`);
    const data = await res.json();
    displayBooks(data.docs || []);
  } catch (err) {
    console.error("Error searching for books:", err);
    grid.innerHTML = "<p style='color:red'>Error searching for books.</p>";
  }
}

// ================================
// Search books by genre
// ================================
async function fetchBooksByGenre(genre) {
  if (genre === lastQuery) return;
  lastQuery = genre;

  try {
    const res = await fetch(`https://openlibrary.org/subjects/${encodeURIComponent(genre)}.json?limit=20`);
    const data = await res.json();
    displayBooks(data.works || []);
  } catch (err) {
    console.error("Error searching by genre:", err);
    grid.innerHTML = "<p style='color:red'>Error searching by genre.</p>";
  }
}

// ================================
// Display books in the grid
// ================================
function displayBooks(books) {
  grid.innerHTML = "";

  if (!books || books.length === 0) {
    grid.innerHTML = "<p style='color:yellow'>No books found.</p>";
    return;
  }

  books.forEach(book => {

    const title = book.title || "No title";
    const author = book.author_name ? book.author_name.join(", ") : (book.authors ? book.authors.map(a => a.name).join(", ") : "Unknown");
    const year = book.first_publish_year || "N/A";
    const category = book.subject ? book.subject[0] : "Unknown";
    const description = book.description
      ? (typeof book.description === "string" ? book.description : book.description.value)
      : "No description available.";
    const shortDesc = description.length > 150 ? description.substring(0, 150) + "..." : description;

    // Cover
    const coverId = book.cover_i || (book.cover_id ? book.cover_id : null);
    const image = coverId
      ? `https://images.weserv.nl/?url=covers.openlibrary.org/b/id/${coverId}-L.jpg&w=300&h=450&fit=cover`
      : "/media/icons/no-image.svg";

    const card = `
      <div class="card">
        <img class="cover" src="${image}" alt="">
        <div class="info">
          <h2 class="title">${title} (${year})</h2>
          <div class="details">
            <span class="author">${author}</span>
            <span class="gender">${category}</span>
          </div>
          <p class="description">${shortDesc}</p>
        </div>
      </div>
    `;

    grid.innerHTML += card;
  });
}


loadInitialBooks();