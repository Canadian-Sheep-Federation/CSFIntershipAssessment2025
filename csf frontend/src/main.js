import './style.css'
import { renderGrid } from './components/SheepGrid.js';
import { setupNewSheepForm } from './components/NewSheepForm.js';
import { setupGetSheepByIdForm } from './components/GetSheepByIdForm.js';
import { getSheepList, loadMockSheepData } from './data/SheepList.js';

document.addEventListener("DOMContentLoaded", () => {
  loadMockSheepData();
  renderGrid(getSheepList());
  setupNewSheepForm();
  setupGetSheepByIdForm();
});