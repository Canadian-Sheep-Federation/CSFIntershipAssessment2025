const BASE_URL = window.location.origin; // e.g. http://localhost:3000
document
  .getElementById("create-plan-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    // Grab form values
    const crop = document.getElementById("api-crop").value.trim();
    const city = document.getElementById("api-city").value.trim();
    const activity = document.getElementById("api-activity").value;
    const area = parseFloat(document.getElementById("api-area").value);
    const expected_yield = parseFloat(
      document.getElementById("api-expected-yield").value
    );
    const seed_type = document.getElementById("api-seed-type").value.trim();
    const notes = document.getElementById("api-notes").value.trim() || null;

    // Optionally manual temperature/condition
    const tempVal = document.getElementById("api-temp").value;
    const condVal = document.getElementById("api-condition").value.trim();
    let weather = null;
    if (tempVal && !isNaN(parseFloat(tempVal))) {
      weather = {
        temperature: parseFloat(tempVal),
        weather_descriptions: condVal ? [condVal] : [],
      };
    }

    const payload = {
      crop,
      city,
      activity,
      area,
      expected_yield,
      seed_type,
      notes,
      weather,
    };

    try {
      const res = await fetch(`${BASE_URL}/api`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `Status ${res.status}`);
      document.getElementById("create-plan-result").innerHTML =
        `<span style="color:green;">Created! New ID: ${data.id}</span>`;
      e.target.reset();
    } catch (err) {
      console.error("Error POST /api:", err);
      document.getElementById("create-plan-result").innerHTML =
        `<span style="color:red;">Error: ${err.message}</span>`;
    }
  });

// 2. GET A SINGLE PLAN BY ID (GET /api/:id)
document
  .getElementById("get-one-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("get-one-id").value.trim();
    if (!id) return;

    try {
      const res = await fetch(`${BASE_URL}/api/${encodeURIComponent(id)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `Status ${res.status}`);
      document.getElementById(
        "get-one-result"
      ).textContent = JSON.stringify(data, null, 2);
    } catch (err) {
      console.error("Error GET /api/:id:", err);
      document.getElementById(
        "get-one-result"
      ).textContent = `Error: ${err.message}`;
    }
  });

// 3. GET ALL PLANS (GET /api)
document.getElementById("get-all-btn").addEventListener("click", async () => {
  try {
    const res = await fetch(`${BASE_URL}/api`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || `Status ${res.status}`);
    document.getElementById(
      "get-all-result"
    ).textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    console.error("Error GET /api:", err);
    document.getElementById(
      "get-all-result"
    ).textContent = `Error: ${err.message}`;
  }
});
