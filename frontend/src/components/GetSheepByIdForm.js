import { fetchSheepById } from "../api/FetchSheepById.js";

let map;        // Leaflet map instance
let marker;     // Single marker instance

// Function to set up the form for fetching sheep by ID and displaying it on a map
export function setupGetSheepByIdForm() {
  const form = document.getElementById("get-sheep-form");
  const resultDiv = document.getElementById("sheep-result");
  const mapContainer = document.getElementById("sheep-map");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = form.sheepId.value.trim();

    try {
      const sheep = await fetchSheepById(id);

      // Show sheep info
      resultDiv.innerHTML = `
        <strong>${sheep.name}</strong><br>
        Age: ${sheep.age}<br>
        Breed: ${sheep.breed}<br>
        Weight: ${sheep.weightKg} kg<br>
        Gender: ${sheep.gender}<br>
        Location: ${sheep.location || `(${sheep.latitude}, ${sheep.longitude})`}
      `;

      // Initialize or update map
      if (!map) {
        mapContainer.classList.remove("hidden");
        map = L.map("sheep-map").setView([sheep.latitude, sheep.longitude], 13);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '© OpenStreetMap contributors',
        }).addTo(map);
        marker = L.marker([sheep.latitude, sheep.longitude]).addTo(map);
      } else {
        map.setView([sheep.latitude, sheep.longitude], 13);
        marker.setLatLng([sheep.latitude, sheep.longitude]);
      }

    } catch (err) {
      console.error(err);
      resultDiv.textContent = "Sheep not found or error occurred.";
      mapContainer.classList.add("hidden");
      map.remove(); // Properly remove the Leaflet map instance
      map = null;
      marker = null;
      mapContainer.innerHTML = ""; // Clear map on error
    }
  });
}
