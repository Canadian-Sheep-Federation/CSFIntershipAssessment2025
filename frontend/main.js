// frontend/main.js
async function loadCatFact() {
    const factBox = document.getElementById('fact-box');
    factBox.textContent = 'Loading...';
  
    try {
      const res = await fetch(`https://meowfacts.herokuapp.com/`);
      const data = await res.json();
  
      if (!data || !Array.isArray(data.data) || data.data.length === 0) {
        throw new Error("Invalid response from Meowfacts API");
      }
  
      const fact = data.data[0];
      factBox.textContent = fact;
      document.getElementById('fact').value = fact;
    } catch (error) {
      console.error("Meowfacts API failed. Using fallback.");
      const fallback = "Cats can make over 100 different sounds, whereas dogs can only make about 10.";
      factBox.textContent = fallback;
      document.getElementById('fact').value = fallback;
    }
  }
  
  document.getElementById('feedback-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const feedback = {
      fact: document.getElementById('fact').value,
      rating: document.getElementById('rating').value,
      comment: document.getElementById('comment').value,
    };
  
    try {
      await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedback),
      });
  
      document.getElementById('feedback-form').reset();
      loadCatFact();
      loadFeedback();
    } catch (error) {
      alert('Failed to submit feedback.');
    }
  });
  
  async function loadFeedback() {
    try {
      const res = await fetch('/api');
      const data = await res.json();
      const list = document.getElementById('feedback-list');
      list.innerHTML = '';
  
      data.forEach(entry => {
        const li = document.createElement('li');
        li.classList.add('feedback-item'); 

        // Create elements for structured display
        const ratingSpan = document.createElement('span');
        ratingSpan.classList.add('feedback-rating');
        ratingSpan.textContent = `${entry.rating}/5`; 

        const factSpan = document.createElement('span');
        factSpan.classList.add('feedback-fact');
        factSpan.textContent = `"${entry.fact}"`;

        const commentSpan = document.createElement('span');
        commentSpan.classList.add('feedback-comment');
        commentSpan.textContent = entry.comment || 'No comment';

        // Append elements to the list item
        li.appendChild(ratingSpan);
        li.appendChild(factSpan);
        li.appendChild(document.createTextNode(' – ')); 
        li.appendChild(commentSpan);

        list.appendChild(li);
      });
    } catch (error) {
      console.error('Failed to load feedback.');
    }
  }
  
  loadCatFact();
  loadFeedback();