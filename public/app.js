// public/app.js
// Handles UI interaction: search iTunes, display songs, submit and load feedback

const apiUrl = 'http://localhost:3000/form';

/**
 * Fetches songs from the iTunes API and displays results.
 */
async function searchSongs() {
  const query = document.getElementById('searchInput').value;
  const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=5`);
  const data = await res.json();
  showResults(data.results);
}

/**
 * Renders song search results and attaches a feedback form to each.
 */
function showResults(results) {
  const container = document.getElementById('results');
  container.innerHTML = '';

  results.forEach(song => {
    const div = document.createElement('div');
    div.className = 'song';

    div.innerHTML = `
      <img src="${song.artworkUrl100}" alt="Artwork">
      <p><strong>${song.trackName}</strong> by ${song.artistName}</p>
      <audio controls src="${song.previewUrl}"></audio><br>
      <input type="text" placeholder="Your name" id="name-${song.trackId}" />
      <input type="number" placeholder="Rating (1-5)" id="rating-${song.trackId}" min="1" max="5" />
      <input type="text" placeholder="Comment" id="comment-${song.trackId}" />
      <button onclick="submitFeedback('${song.trackId}')">Submit Feedback</button>
    `;

    container.appendChild(div);
  });
}

/**
 * Collects feedback for a song and sends it to the backend API.
 */
async function submitFeedback(trackId) {
  const username = document.getElementById(`name-${trackId}`).value;
  const rating = parseInt(document.getElementById(`rating-${trackId}`).value);
  const comment = document.getElementById(`comment-${trackId}`).value;

  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, trackId, rating, comment })
  });

  if (res.ok) {
    alert('Feedback submitted!');
    loadFeedback();
  } else {
    alert('Error submitting feedback');
  }
}

/**
 * Loads all feedback entries from the backend and displays them.
 */
async function loadFeedback() {
  const res = await fetch(apiUrl);
  const data = await res.json();

  const list = document.getElementById('feedbackList');
  list.innerHTML = '';

  data.forEach(entry => {
    const item = document.createElement('li');
    item.textContent = `${entry.username} rated ${entry.trackId} → ${entry.rating}/5: "${entry.comment}"`;
    list.appendChild(item);
  });
}

loadFeedback(); // load on page load
