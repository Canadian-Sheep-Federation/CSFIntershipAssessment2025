import './style.css'
import { renderGrid } from './components/SheepGrid.js';
import { Sheep } from './entity/Sheep.js';
import { setupNewSheepForm } from './components/NewSheepForm.js';
import { setupGetSheepByIdForm } from './components/GetSheepByIdForm.js';
import { fetchAllSheep } from './api/GetAllSheep.js';
import { getSheepList, loadMockSheepData, setSheepList } from './data/SheepList.js';

// Main entry point for the frontend application.
// This script initializes the application, fetches sheep data from the backend,
// and sets up the UI components for displaying and adding sheep.
document.addEventListener("DOMContentLoaded", async () => {
  // loading text
  const gridContainer = document.getElementById("sheep-grid");
  if (gridContainer) {
    gridContainer.innerHTML = '<div class="text-center text-lg py-8">Loading sheep data...</div>';
  }
  try {
    const apiData = await fetchAllSheep();

    // loadMockSheepData(); // Uncomment to load mock data instead of use API

    // Convert plain objects into Sheep instances
    const sheepInstances = apiData.map(data => new Sheep(data));

    setSheepList(sheepInstances); // update state
    renderGrid(getSheepList());   // render to grid
  } catch (err) {
    console.error("Error loading sheep from backend:", err);
    
    // Show error message in grid container
    if (gridContainer) {
      gridContainer.innerHTML = '<div class="text-center text-red-600 py-8">Failed to load sheep data.</div>';
    }
  }

  setupNewSheepForm();
  setupGetSheepByIdForm();
});
