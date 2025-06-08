import './style.css'
import { renderGrid } from './components/SheepGrid.js';
import { Sheep } from './entity/Sheep.js';
import { setupNewSheepForm } from './components/NewSheepForm.js';
import { setupGetSheepByIdForm } from './components/GetSheepByIdForm.js';
import { fetchAllSheep } from './api/GetAllSheep.js';
import { getSheepList, loadMockSheepData, setSheepList } from './data/SheepList.js';

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const apiData = await fetchAllSheep();

    // Convert plain objects into Sheep instances
    const sheepInstances = apiData.map(data => new Sheep(data));

    setSheepList(sheepInstances); // update state
    renderGrid(getSheepList());   // render to grid
  } catch (err) {
    console.error("Error loading sheep from backend:", err);
    // fallback: maybe load mock data if desired
  }

  setupNewSheepForm();
  setupGetSheepByIdForm();
});
