import { submitSheep } from "../api/SubmitSheep.js";
import { Sheep } from "../entity/Sheep.js";
import { addSheep, getSheepList } from "../data/SheepList.js";
import { renderGrid } from "./SheepGrid.js";
import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete';

// Handles the form for adding new sheep, including location autocomplete and submission logic.
export function setupNewSheepForm() {
  const form = document.getElementById("new-sheep-form");

  // 1. Location autocomplete setup
  let selectedCoordinates = { latitude: null, longitude: null, formatted: null };
  // const preview = document.getElementById("location-preview");
    //import.meta.env.VITE_GEO_AUTO_COMPLETE_KEY
  const autocomplete = new GeocoderAutocomplete(

    document.getElementById("autocomplete"),
    import.meta.env.VITE_GEO_AUTO_COMPLETE_KEY, // ← replace with your actual Geoapify API key
    {
      placeholder: "Search location...",
      filter: { countrycode: ["us", "ca"] },
      lang: "en",
      limit: 3,
    }
  );

  autocomplete.on("select", (location) => {
    if (location && location.properties) {
      selectedCoordinates.latitude = location.properties.lat;
      selectedCoordinates.longitude = location.properties.lon;
      selectedCoordinates.formatted = location.properties.formatted

      // preview.textContent = `📍 ${location.properties.formatted} (${location.properties.lat}, ${location.properties.lon})`;
    }
  });

  autocomplete.on("suggestions", (suggestions) => {
    if (!suggestions || suggestions.length === 0) {
      selectedCoordinates = { latitude: null, longitude: null };
      // preview.textContent = "";
    }
  });

  // 2. Form submit logic
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    payload.age = Number(payload.age);
    payload.weightKg = Number(payload.weightKg);

    // Inject lat/lon from selected location
    if (!selectedCoordinates.latitude || !selectedCoordinates.longitude) {
      alert("Please select a location from the autocomplete suggestions.");
      return;
    }

    payload.latitude = selectedCoordinates.latitude;
    payload.longitude = selectedCoordinates.longitude;
    payload.location = selectedCoordinates.formatted;

    try {
      const result = await submitSheep(payload); // POST to backend

      const newSheep = new Sheep({ ...payload });
      addSheep(newSheep); // Add to local state
      renderGrid(getSheepList()); // Re-render the datagrid
      const toast = document.getElementById("toast");
      toast.textContent = `Sheep added with ID ${result.id}`;
      toast.classList.remove("hidden");

      // Auto-hide after 2 seconds
      setTimeout(() => toast.classList.add("hidden"), 3000);
      form.reset();
      // preview.textContent = "";
      selectedCoordinates = { latitude: null, longitude: null };
      document.getElementById("add-modal").classList.add("hidden");
    } catch (err) {
      console.error(err);
      alert("Failed to add sheep");
    }
  });
}
