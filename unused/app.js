const form = document.getElementById("feedback-form");
const responsesList = document.getElementById("responses-list");
const searchBtn = document.getElementById("search-btn");
const searchResults = document.getElementById("search-results");

// Your backend API base URL
const API_URL = "http://localhost:3000";

// Handle form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  const res = await fetch(`${API_URL}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  alert(`Feedback saved with ID: ${result.id}`);
  form.reset();
  fetchResponses();
});

// Fetch all feedback responses
async function fetchResponses() {
  const res = await fetch(`${API_URL}/`);
  const responses = await res.json();
  responsesList.innerHTML = "";
  responses.forEach(resp => {
    const li = document.createElement("li");
    li.textContent = `${resp.title} (${resp.rating}/5): ${resp.comment}`;
    responsesList.appendChild(li);
  });
}

// Public API search - using OMDB (https://www.omdbapi.com/)
searchBtn.addEventListener("click", async () => {
  const query = document.getElementById("search-query").value;
  const apiKey = "your_api_key"; // Replace with your OMDB key
  const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}`);
  const data = await res.json();
  searchResults.innerHTML = "";

  if (data.Search) {
    data.Search.forEach(movie => {
      const li = document.createElement("li");
      li.textContent = `${movie.Title} (${movie.Year})`;
      searchResults.appendChild(li);
    });
  } else {
    searchResults.innerHTML = "<li>No results found.</li>";
  }
});

// Initial fetch
fetchResponses();
